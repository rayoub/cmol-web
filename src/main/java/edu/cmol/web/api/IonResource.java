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

import edu.kumc.cmol.ion.IonDb;
import edu.kumc.cmol.ion.QueryCriteria;
import edu.kumc.cmol.ion.QueryRow;

@Path("ion")
public class IonResource extends BaseResource {

    private static int MAX_QUERY_ROWS = 4000;

    @GET
    @Produces("application/json")
    public Response get(
        @QueryParam("cmol_id") String cmolId,
        @QueryParam("gene") String gene
    ) throws Exception {
    
        // get response json
        String json = "{}";
        try {
   
            QueryCriteria criteria = new QueryCriteria();
            criteria.setCmolId(cmolId);            
            criteria.setGene(gene);            

            List<QueryRow> rows = IonDb.getQueryRows(criteria);

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

    private void writeSearchRecordArray(JsonGenerator generator, List<QueryRow> rows) {

        generator.writeStartArray();
        for (int i = 0; i < rows.size(); i++) {

            QueryRow row = rows.get(i);

            generator.writeStartObject();
    
            generator.write("assay_folder", row.getAssayFolder());
            generator.write("cmol_id", row.getCmolId());
            generator.write("accession_id", row.getAccessionId());
            generator.write("locus", row.getLocus());
            generator.write("type", row.getType());
            generator.write("subtype", row.getSubtype());
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
