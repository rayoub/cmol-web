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

import edu.kumc.cmol.ion.CnvType;
import edu.kumc.cmol.ion.DownloadType;
import edu.kumc.cmol.ion.IonCnvStat;
import edu.kumc.cmol.ion.IonDb;
import edu.kumc.cmol.ion.QueryCriteria;
import edu.kumc.cmol.ion.QueryRow;

@Path("ion")
public class IonResource extends BaseResource {

    private static int MAX_QUERY_ROWS = 4000;

    @GET
    @Produces("application/json")
    public Response get(
        @QueryParam("downloadType") String downloadType,
        @QueryParam("fromDate") String fromDate,
        @QueryParam("toDate") String toDate,
        @QueryParam("cmol_id") String cmolId,
        @QueryParam("mrns") String mrns, 
        @QueryParam("genes") String genes,
        @QueryParam("tcChange") String tcChange, 
        @QueryParam("pcChange") String pcChange
    ) throws Exception {
    
        // get response json
        String json = "{}";
        try {
   
            QueryCriteria criteria = new QueryCriteria();
            criteria.setDownloadType(downloadType);
            criteria.setFromDate(fromDate);
            criteria.setToDate(toDate);
            criteria.setCmolId(cmolId);            
            criteria.setMrns(mrns);
            criteria.setGenes(genes);            
            criteria.setTranscriptChange(tcChange);
            criteria.setProteinChange(pcChange);

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

        generator.writeStartArray();
        for (int i = 0; i < rows.size(); i++) {

            QueryRow row = rows.get(i);

            generator.writeStartObject();
    
            generator.write("analysis_date", row.getAnalysisDate());
            generator.write("assay_folder", row.getAssayFolder());
            generator.write("cmol_id", row.getCmolId());
            generator.write("mrn", row.getMrn());
            generator.write("accession_id", row.getAccessionId());
            generator.write("locus", row.getLocus());
            generator.write("type", row.getType());
            generator.write("subtype", row.getSubtype());
            generator.write("genotype", row.getGenotype());
            generator.write("filter", row.getFilter());
            generator.write("ref", row.getRef());
            generator.write("normalized_alt", row.getNormalizedAlt());
            generator.write("coverage", row.getCoverage());
            generator.write("allele_coverage", row.getAlleleCoverage());
            generator.write("allele_ratio", row.getAlleleRatio());
            generator.write("allele_frequency", row.getAlleleFrequency());
            generator.write("genes", row.getGenes().replace("_", " "));
            generator.write("transcript", row.getTranscript());
            generator.write("location", row.getLocation());
            generator.write("function", row.getFunction());
            generator.write("exon", row.getExon());
            generator.write("coding", row.getCoding());
            generator.write("protein", row.getProtein());
            generator.write("copy_number", row.getCopyNumber());
            generator.write("copy_number_type", row.getCopyNumberType());
            generator.write("fold_diff", row.getFoldDiff());

            generator.writeEnd();
        }
        generator.writeEnd();
    }
    
    @GET
    @Path("sample_count")
    @Produces("application/json")
    public Response getSampleCount() throws Exception {
    
        // get response json
        String json = "{}";
        try {
  
            int sampleCount = IonDb.getSampleCount(DownloadType.SelectedVariants);

            StringWriter writer = new StringWriter();
            JsonGenerator generator = Json.createGenerator(writer);
            generator.writeStartObject();
            generator.write("code", "0");
            generator.write("sampleCount", sampleCount);
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
    
    @GET
    @Path("report")
    @Produces("application/json")
    public Response getReport(
        @QueryParam("reportId") int reportId,
        @QueryParam("cnvTypeId") int cnvTypeId
    ) throws Exception {
    
        // get response json
        String json = "{}";
        try {
 
            IonReport report = IonReport.fromId(reportId);

            if (report == IonReport.CnvStats) {
                List<IonCnvStat> stats = IonDb.getCnvStats(CnvType.fromId(cnvTypeId));

                StringWriter writer = new StringWriter();
                JsonGenerator generator = Json.createGenerator(writer);
                generator.writeStartObject();
                generator.write("code", "0");
                generator.writeKey("records");
                generator.writeStartArray();
                for (IonCnvStat stat : stats) {
                    generator.writeStartObject();
            
                    generator.write("gene", stat.getGene());
                    generator.write("sn", stat.getSn());
                    generator.write("gn", stat.getGn());
                    generator.write("gnPct", stat.getGnPct());
                    generator.write("minCn", stat.getMinCn());
                    generator.write("maxCn", stat.getMaxCn());
                    generator.write("avgCn", stat.getAvgCn());

                    generator.writeEnd();
                }
                generator.writeEnd();
                generator.writeEnd();
                generator.close();
                json = writer.toString();
            }
            else {

                StringWriter writer = new StringWriter();
                JsonGenerator generator = Json.createGenerator(writer);
                generator.writeStartObject();
                generator.write("code", -1);
                generator.write("message", "Undefined Report Id");
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
}
