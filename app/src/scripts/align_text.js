
$(document).ready(function(){

    var uploadIdVal = Functions.getQueryVariable("uploadId");
    var dbId1Val = Functions.getQueryVariable("dbId1");
    var dbId2Val = Functions.getQueryVariable("dbId2");

    if (uploadIdVal === false || dbId1Val === false || dbId2Val === false) {
         
        // show error message
        $("#errorMessage").html("Invalid query parameters.");
        $("#errorTable").show();

        return;
    }

    $.getJSON('api/align_text?' + $.param({
        uploadId: uploadIdVal,
        dbId1: dbId1Val,
        dbId2: dbId2Val
    }))
    .done(function (data) {
        
        if (data.code === "0") {

            // show alignment
            $("#alignmentDiv pre").html(data.alignment);
            $("#alignmentDiv").show();
            
        }
        else {

            // show error message
            $("#errorMessage").html(data.message);
            $("#errorTable").show();
        }
    }); // end done
}); // end jquery

