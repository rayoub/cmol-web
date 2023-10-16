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

import edu.kumc.cmol.core.LookupType;
import edu.kumc.cmol.core.LookupVal;
import edu.kumc.cmol.qci.QciLookup;

@Path("lookup")
public class LookupResource extends BaseResource {

    @GET
    @Produces("application/json")
    public Response get(@QueryParam("lookupType") int lookupType) throws Exception {
        
        // get response json
        String json = "{}";
        try {

            List<LookupVal> vals = null;
            if (lookupType == LookupType.DIAGNOSES.getId()) {
                vals = QciLookup.getDiagnoses();
            }
            StringWriter writer = new StringWriter();
            JsonGenerator generator = Json.createGenerator(writer);
            generator.writeStartObject();
            generator.write("code", "0");
            generator.writeKey("records");
            if (vals != null) {
                writeLookupVals(generator, vals);
            }
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

    private void writeLookupVals(JsonGenerator generator, List<LookupVal> vals) {

        generator.writeStartArray();
        for (int i = 0; i < vals.size(); i++) {
            generator.writeStartObject();
            generator.write("id", vals.get(i).getId());
            generator.write("descr", vals.get(i).getDescr());
            generator.writeEnd();
        }
        generator.writeEnd();
    }
}
