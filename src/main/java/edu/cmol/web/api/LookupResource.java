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

import org.apache.commons.lang3.tuple.Pair;

import edu.kumc.ion.db.IonLookup;
import edu.kumc.qci.db.QciLookup;

@Path("lookup")
public class LookupResource extends BaseResource {

    @GET
    @Produces("application/json")
    public Response get(@QueryParam("lookupType") int lookupType) throws Exception {
        
        // get response json
        String json = "{}";
        try {

            List<Pair<String, String>> lookups = null;
            if (lookupType == 1) {
                lookups = QciLookup.getDiagnoses();
            }
            else {
                lookups = IonLookup.getSamples();
            }

            StringWriter writer = new StringWriter();
            JsonGenerator generator = Json.createGenerator(writer);
            generator.writeStartObject();
            generator.write("code", "0");
            generator.writeKey("records");
            writeLookupVals(generator, lookups);
            generator.writeEnd();
            generator.close();
            json = writer.toString();
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

    private void writeLookupVals(JsonGenerator generator, List<Pair<String, String>> vals) {

        generator.writeStartArray();
        for (int i = 0; i < vals.size(); i++) {
            generator.writeStartObject();
            generator.write("id", vals.get(i).getLeft());
            generator.write("descr", vals.get(i).getRight());
            generator.writeEnd();
        }
        generator.writeEnd();
    }
}
