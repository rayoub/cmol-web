package edu.cmol.web.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

@Path("test")
public class TestResource extends BaseResource {

    @GET
    @Produces("application/json")
    public Response test() {

        ResponseBuilder builder = Response.ok("[1,2,3,4]");
        return builder.build();
    }

    @GET
    @Path("nested")
    @Produces("application/json")
    public Response nestedTest() {

        ResponseBuilder builder = Response.ok("[5,6,7,8]");
        return builder.build();
    }
}



