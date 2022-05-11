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

import edu.kumc.qci.db.QueryCriteria;
import edu.kumc.qci.db.QueryRow;
import edu.kumc.qci.db.Reporter;

@Path("search")
public class SearchResource extends BaseResource {

    private static int MAX_QUERY_ROWS = 4000;

    @GET
    @Produces("application/json")
    public Response get(
        @QueryParam("fromDate") String fromDate,
        @QueryParam("toDate") String toDate,
        @QueryParam("mrns") String mrns, 
        @QueryParam("genes") String genes, 
        @QueryParam("tcChange") String tcChange, 
        @QueryParam("pcChange") String pcChange) throws Exception {
    
        // get response json
        String json = "{}";
        try {
    
            QueryCriteria criteria = new QueryCriteria();

            criteria.setFromDate(fromDate);
            criteria.setToDate(toDate);
            criteria.setMrns(mrns);
            criteria.setGenes(genes);
            criteria.setTranscriptChange(tcChange);
            criteria.setProteinChange(pcChange);

            List<QueryRow> rows = Reporter.getQueryRows(criteria);

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
            if (e.getMessage() != null) {
                generator.write("message", e.getMessage());
            }
            else {
                generator.write("message", e.toString());
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
        String lastReportId = "";

        generator.writeStartArray();
        for (int i = 0; i < rows.size(); i++) {

            QueryRow row = rows.get(i);

            generator.writeStartObject();
    
            String reportId = row.getReportId();
            if (!reportId.equals(lastReportId)) {
                n++;
            }
            generator.write("n", n);
            lastReportId = reportId;

            generator.write("mrn", row.getMrn());
            generator.write("testDate", row.getTestDate());
            generator.write("testCode", formatTestCode(row.getTestCode()));
            generator.write("diagnosis", row.getDiagnosis());
            generator.write("interpretation", row.getInterpretation().replace("_", " "));
            generator.write("physician", row.getPhysician());
            generator.write("gene", row.getGene());
            generator.write("alleleFraction", row.getAlleleFraction());
            generator.write("transcript", row.getTranscript());
            generator.write("transcriptChange", formatTranscriptChange(row.getTrasncriptChange(),20));
            generator.write("protein", row.getProtein());
            generator.write("proteinChange", row.getProteinChange());
            generator.write("assessment", row.getAssessment());

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
