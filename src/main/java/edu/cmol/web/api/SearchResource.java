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

    private static int MAX_QUERY_ROWS = 2000;

    @GET
    @Produces("application/json")
    public Response get(
        @QueryParam("genes") String genes, 
        @QueryParam("changeType") int changeType,
        @QueryParam("tcChange") String tcChange, 
        @QueryParam("pcChange") String pcChange) throws Exception {
    
        // get response json
        String json = "{}";
        try {

            QueryCriteria criteria = new QueryCriteria();

            criteria.setGenes(genes);
            criteria.setChangeType(changeType);
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

        generator.writeStartArray();
        for (int i = 0; i < rows.size(); i++) {

            QueryRow row = rows.get(i);

            generator.writeStartObject();
       
            generator.write("n", i+1);
            generator.write("mrn", row.getMrn());
            generator.write("accession", row.getAccession());
            generator.write("testDate", row.getTestDate());
            generator.write("testCode", row.getTestCode().replace("NGS ", ""));
            generator.write("diagnosis", row.getDiagnosis());
            generator.write("interpretation", row.getInterpretation());
            generator.write("physician", row.getPhysician());
            generator.write("gene", row.getGene());
            generator.write("alleleFraction", row.getAlleleFraction());
            generator.write("transcript", row.getTranscript());
            generator.write("transcriptChange", row.getTrasncriptChange());
            generator.write("protein", row.getProtein());
            generator.write("proteinChange", row.getProteinChange());
            generator.write("assessment", row.getAssessment());

            generator.writeEnd();
        }
        generator.writeEnd();
    }
}
