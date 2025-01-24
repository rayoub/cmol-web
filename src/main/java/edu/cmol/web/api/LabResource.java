package edu.cmol.web.api;

import java.io.StringWriter;
import java.util.List;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.exception.ExceptionUtils;

import edu.kumc.cmol.lab.LabDb;
import edu.kumc.cmol.lab.QueryCriteria;
import edu.kumc.cmol.lab.QueryRow;

@Path("lab")
public class LabResource extends BaseResource {

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
                String[] d = diagnoses.split(",");
                criteria.setDiagnoses(d);
            }

            criteria.setFromDate(fromDate);
            criteria.setToDate(toDate);
            criteria.setMrns(mrns);
            criteria.setGenes(genes);
            criteria.setExon(exon);
            criteria.setTranscriptChange(tcChange);
            criteria.setProteinChange(pcChange);

            List<QueryRow> rows = LabDb.getQueryRows(criteria);

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
        String lastCmolId = "";

        generator.writeStartArray();
        for (int i = 0; i < rows.size(); i++) {

            QueryRow row = rows.get(i);

            generator.writeStartObject();
    
            String cmolId = row.getCmolId();
            if (!cmolId.equals(lastCmolId)) {
                n++;
            }
            generator.write("n", n);
            lastCmolId = cmolId;

            generator.write("runId", row.getRunId());
            generator.write("cmolId", row.getCmolId());
            generator.write("mrn", row.getMrn());
            generator.write("accession", row.getAccession());
            generator.write("reportedDate", row.getReportedDate());
            generator.write("testCode", formatTestCode(row.getTestCode()));
            generator.write("sampleType", row.getSampleType());
            generator.write("diagnosis", row.getDiagnosis());
            generator.write("surgpathId", row.getSurgpathId());
            generator.write("archived", row.getArchived());
            generator.write("locus", row.getLocus());
            generator.write("gene", row.getGene());
            generator.write("alleleFraction", row.getAlleleFraction());
            generator.write("transcript", row.getTranscript());
            generator.write("transcriptChange", row.getTranscriptChange());
            generator.write("transcriptExon", row.getTranscriptExon());
            generator.write("proteinChange", row.getProteinChange());

            String assessment = row.getAssessment();
            if (assessment.equalsIgnoreCase("pathogenic")) {
                assessment = "Tier I: " + assessment;
            }
            else if (assessment.equalsIgnoreCase("likely pathogenic")) {
                assessment = "Tier II: " + assessment;
            }
            else if (assessment.equalsIgnoreCase("uncertain significance")) {
                assessment = "Tier III: " + assessment;
            }
            else {
                assessment = "Tier IV: " + assessment;
            }
            generator.write("assessment", assessment);
            generator.write("reported", row.getReported());

            generator.writeEnd();
        }
        generator.writeEnd();
    }

    public static String formatTestCode(String text) {

        return text.replace("NGS ", "").replace("Comprehensive", "Comp");
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
}
