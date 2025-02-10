package edu.cmol.web.api;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.List;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.StreamingOutput;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;

import edu.kumc.cmol.core.SampleInfo;
import edu.kumc.cmol.qci.QciDb;
import edu.kumc.cmol.qci.QueryCriteria;
import edu.kumc.cmol.qci.QueryRow;
import edu.kumc.cmol.qci.WS;

@Path("qci")
public class QCIResource extends BaseResource {

    private static int MAX_QUERY_ROWS = 4000;

    @GET
    @Produces("application/json")
    public Response get(
        @QueryParam("diagnoses") String diagnoses,
        @QueryParam("fromDate") String fromDate,
        @QueryParam("toDate") String toDate,
        @QueryParam("mrns") String mrns, 
        @QueryParam("genes") String genes, 
        @QueryParam("exon") String exon, 
        @QueryParam("tcChange") String tcChange, 
        @QueryParam("pcChange") String pcChange) throws Exception {
    
        // get response json
        String json = "{}";
        try {
    
            QueryCriteria criteria = new QueryCriteria();

            if (diagnoses.length() > 0) {
                int[] d = Arrays.stream(diagnoses.split(",")).mapToInt(Integer::parseInt).toArray();
                criteria.setDiagnoses(d);
            }

            criteria.setFromDate(fromDate);
            criteria.setToDate(toDate);
            criteria.setMrns(mrns);
            criteria.setGenes(genes);
            criteria.setExon(exon);
            criteria.setTranscriptChange(tcChange);
            criteria.setProteinChange(pcChange);

            List<QueryRow> rows = QciDb.getQueryRows(criteria);

            if (rows.size() > MAX_QUERY_ROWS) {

                StringWriter writer = new StringWriter();
                JsonGenerator generator = Json.createGenerator(writer);
                generator.writeStartObject();
                generator.write("code", -1);
                generator.write("message", "Query results exceed maximum of " + MAX_QUERY_ROWS + " rows. Please narrow your search criteria.");
                generator.writeEnd();
                generator.close();
                json = writer.toString();
            }
            else {

                StringWriter writer = new StringWriter();
                JsonGenerator generator = Json.createGenerator(writer);
                generator.writeStartObject();
                generator.write("code", "0");
                generator.writeKey("records");
                writeSearchRecordArray(generator, rows);
                generator.writeEnd();
                generator.close();
                json = writer.toString();
            }
        }
        catch (Exception e) {

            StringWriter writer = new StringWriter();
            JsonGenerator generator = Json.createGenerator(writer);
            generator.writeStartObject();
            generator.write("code", -1);

            String trace = ExceptionUtils.getStackTrace(e);
            if (e.getMessage() != null) {
                generator.write("message", e.getMessage() + System.lineSeparator() + trace);
            }
            else {
                generator.write("message", e.toString() + System.lineSeparator() + trace);
            }
            generator.writeEnd();
            generator.close();
            json = writer.toString();
        }

        // response
        ResponseBuilder builder = Response.ok(json);
        return builder.build();
    }

    private void writeSearchRecordArray(JsonGenerator generator, List<QueryRow> rows) {

        int n = 0;
        String lastSampleId = "";

        generator.writeStartArray();
        for (int i = 0; i < rows.size(); i++) {

            QueryRow row = rows.get(i);

            generator.writeStartObject();
    
            String sampleId = row.getSampleId();
            if (!sampleId.equals(lastSampleId)) {
                n++;
            }
            generator.write("n", n);
            lastSampleId = sampleId;

            generator.write("pdf", "pdf");
            generator.write("sample_id", row.getSampleId());
            generator.write("specimen_id", row.getSpecimenId());
            generator.write("mrn", row.getMrn());
            generator.write("testDate", row.getTestDate());
            generator.write("testCode", formatTestCode(row.getTestCode()));
            generator.write("diagnosis", row.getDiagnosis());
            generator.write("interpretation", row.getInterpretation().replace("_", " "));
            generator.write("physician", row.getPhysician());
            generator.write("locus", row.getLocus());
            generator.write("gene", row.getGene());
            generator.write("alleleFraction", row.getAlleleFraction());
            generator.write("transcript", row.getTranscript().trim());
            generator.write("transcriptChange", row.getTrasncriptChange().trim());
            if (row.getTranscriptExon() > -1) {
                generator.write("transcriptExon", row.getTranscriptExon());
            }
            else {
                generator.write("transcriptExon", "");
            }
            generator.write("protein", row.getProtein().trim());
            generator.write("proteinChange", row.getProteinChange().trim());

            String assessment = row.getAssessment();
            if (assessment.equalsIgnoreCase("pathogenic")) {
                assessment = "Tier I: Pathogenic";
            }
            else if (assessment.equalsIgnoreCase("likely pathogenic")) {
                assessment = "Tier II: Likely Pathogenic";
            }
            else if (assessment.equalsIgnoreCase("uncertain significance")) {
                assessment = "Tier III: Uncertain Significance";
            }
            else {
                assessment = "Tier IV: Benign and Likely Benign";
            }
            generator.write("assessment", assessment);

            generator.writeEnd();
        }
        generator.writeEnd();
    }

    public static String formatTestCode(String text) {

        String t = text;
        if (text.toLowerCase().contains("heme")) {
            t = "NGS Heme";
        }
        else if (text.toLowerCase().contains("common")) {
            t = "NGS Common";
        } 
        else if (text.toLowerCase().contains("comp")) {
            t = "NGS Comp";
        }
        return t;
    }

    public static String formatTranscriptChange(String text, int lineLength) {

        lineLength = Math.min(text.length(), lineLength);
        char[] textChars = text.toCharArray();
        int numberOfLines = (int)Math.ceil(text.length() / (double)lineLength);
        String[] lines = new String[numberOfLines];
        for (int i = 0; i < textChars.length; i++) {
            int index = i / lineLength;
            lines[index] = (lines[index] == null ? "" : lines[index]) + textChars[i];
        }
        return String.join("..." + System.lineSeparator(), lines);
    }
    
    @GET
    @Path("pdf")
    @Produces("application/pdf")
    public Response getPdf(@QueryParam("sample_id") String sampleId) throws Exception {
    
        String token = WS.getToken();
        InputStream inputPdf = WS.getPdf(token, sampleId); 
        
        StreamingOutput outputPdf = new StreamingOutput() {
            @Override
            public void write(OutputStream out) throws IOException {
                IOUtils.copy(inputPdf, out);
            }
        };

        ResponseBuilder builder = Response.ok((Object) outputPdf);
        builder.header("Content-Disposition","filename=\"" + sampleId + ".pdf\"");  

        return builder.build();
    }

    @GET
    @Path("sample_info")
    @Produces("application/json")
    public Response getSampleInfo() throws Exception {
    
        // get response json
        String json = "{}";
        try {
 
            SampleInfo info = QciDb.getSampleInfo();

            StringWriter writer = new StringWriter();
            JsonGenerator generator = Json.createGenerator(writer);
            generator.writeStartObject();
            generator.write("code", "0");
            generator.write("sn", info.getCount());
            generator.write("ls", info.getLatest());
            generator.writeEnd();
            generator.close();
            json = writer.toString();
        }
        catch (Exception e) {

            StringWriter writer = new StringWriter();
            JsonGenerator generator = Json.createGenerator(writer);
            generator.writeStartObject();
            generator.write("code", -1);

            String trace = ExceptionUtils.getStackTrace(e);
            if (e.getMessage() != null) {
                generator.write("message", e.getMessage() + System.lineSeparator() + trace);
            }
            else {
                generator.write("message", e.toString() + System.lineSeparator() + trace);
            }
            generator.writeEnd();
            generator.close();
            json = writer.toString();
        }

        // response
        ResponseBuilder builder = Response.ok(json);
        return builder.build();
    }
}
