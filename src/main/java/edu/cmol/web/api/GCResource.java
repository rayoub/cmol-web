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

import edu.kumc.cmol.gc.Db;
import edu.kumc.cmol.gc.GCReferral;

@Path("gc")
public class GCResource extends BaseResource {

    @GET
    @Produces("application/json")
    public Response get(
        @QueryParam("fromDate") String fromDate,
        @QueryParam("toDate") String toDate) throws Exception {
    
        // get response json
        String json = "{}";
        try {
    
            List<GCReferral> rows = Db.getGCReferrals(fromDate, toDate);

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

    private void writeSearchRecordArray(JsonGenerator generator, List<GCReferral> refs) {

        generator.writeStartArray();
        for (int i = 0; i < refs.size(); i++) {

            GCReferral ref = refs.get(i);

            generator.writeStartObject();
    
            generator.write("pdf", "pdf");
            generator.write("mrn", ref.getMrn());
            generator.write("accession", ref.getAccession());
            generator.write("age", ref.getAge());
            generator.write("testDate", ref.getTestDate());
            generator.write("testCode", formatTestCode(ref.getTestCode()));
            generator.write("tumorSite", ref.getTumorSite());
            generator.write("diagnosis", ref.getDiagnosis());
            generator.write("interpretation", ref.getInterpretation().replace("_", " "));
            generator.write("physician", ref.getPhysician());
            generator.write("genes", ref.getGenes());

            generator.writeEnd();
        }
        generator.writeEnd();
    }
    
    public static String formatTestCode(String text) {

        return text.replace("NGS ", "").replace("Comprehensive", "Comp");
    }
}
