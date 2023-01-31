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

import edu.kumc.cmol.ion.QueryCriteria;
import edu.kumc.cmol.ion.Reporter;
import edu.kumc.cmol.ion.Variant;

@Path("ion")
public class IonResource extends BaseResource {

    private static int MAX_QUERY_ROWS = 4000;

    @GET
    @Produces("application/json")
    public Response get(
        @QueryParam("sample") String sample
    ) throws Exception {
    
        // get response json
        String json = "{}";
        try {
   
            QueryCriteria criteria = new QueryCriteria();
            criteria.setSample(sample);            

            List<Variant> rows = Reporter.getVariants(criteria);

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
                generator.write("message", trace);
            }
            else {
                generator.write("string", trace);
            }
            generator.writeEnd();
            generator.close();
            json = writer.toString();
        }

        // response
        ResponseBuilder builder = Response.ok(json);
        return builder.build();
    }

    private void writeSearchRecordArray(JsonGenerator generator, List<Variant> rows) {

        generator.writeStartArray();
        for (int i = 0; i < rows.size(); i++) {

            Variant row = rows.get(i);

            generator.writeStartObject();
    
            generator.write("sample", row.getSample());
            generator.write("locus", row.getLocus());
            generator.write("genotype", row.getGenotype());
            generator.write("filter", row.getFilter());
            generator.write("ref", row.getRef());
            generator.write("genes", row.getGenes().replace("_", " "));
            generator.write("transcript", row.getTranscript());
            generator.write("coding", row.getCoding());
            generator.write("protein", row.getProtein());

            generator.writeEnd();
        }
        generator.writeEnd();
    }
}
