  
$(document).ready(function(){

    // *** form event handlers
    
    $("input[type=radio][name=searchBy]").change(function () {

        if (this.value === "1") {
            $("#dbId1Div").show();
            $("#pdbFile1Div").hide();
        }
        else {
            $("#dbId1Div").hide();
            $("#pdbFile1Div").show();
        }

    }); // end change
    
    // *** search

    $("#align").click(function () {

        // structure 2 id validation
        var searchBy = $("input[type=radio][name=searchBy]:checked").val();
        if (searchBy === "1") {

            var dbId1 = $.trim($("#dbId1").val());
            if (dbId1.length === 0) {
                alert("The 'Structure 1 Id' field is required.");
                return;
            }
            else if (dbId1.length < 5) { 
                alert("The 'Structure 1 Id' field must be at least 5 characters in length.");
                return;
            }
            else if (dbId1.length > 12) {
                alert("The 'Structure 1 Id' field must be no more than 12 characters in length.");
                return;
            }
        }
        
        // structure 2 id validation
        var dbId2 = $.trim($("#dbId2").val());
        if (dbId2.length === 0) {
            alert("The 'Structure 2 Id' field is required.");
            return;
        }
        else if (dbId2.length < 5) { 
            alert("The 'Structure 2 Id' field must be at least 5 characters in length.");
            return;
        }
        else if (dbId2.length > 12) {
            alert("The 'Structure 2 Id' field must be no more than 12 characters in length.");
            return;
        }
        
        if (searchBy === "2") {

            var selectedFiles = $("#pdbFile1").prop("files");
            if (selectedFiles.length > 0) {

                var reader = new FileReader();
                
                // fired after readAsText
                reader.onload = function () { 

                    // once we have read the file post the contents
                    var content = reader.result;
                    
                    $.post('api/search', content)            
                    .done(function (data) {
                        getRecords(parseInt(data)) 
                    });
                };

                if (selectedFiles[0].size > Math.pow(2,20)) {

                    var error = 'The upload file exceeds the file size limitation of 1 MB. Try removing all lines from the PDB file that do not start with ATOM or HETATM.';

                    $("#errorMessage").html(error);
                    $("#errorTable").show();
                }
                else {
                    reader.readAsText(selectedFiles[0]); 
                }
            }
        }
        else {

            getRecords("-1");
        } // end if

    }); // end click
}); // end jquery

var getRecords = function (uploadId) {
   
    $("table").hide(); 
    
    var params = getParams(uploadId);

    return $.getJSON('api/align?' + $.param(params))
    .done(function (data) {
       
        if (data.code === "0") {

            // build table head
            var thead = "";
            thead += "<th><span>align</span></th>";
            thead = "<tr>" + thead + "</tr>";

            // links
            var link1 = "<a href='/align_text.html?uploadId=" + data.uploadId +  "&dbId1=" + data.dbId1 + "&dbId2=" + data.dbId2 + "' target='_blank'>text</a>";
            var link2 = "<a href='/align_3d.html?uploadId=" + data.uploadId +  "&dbId1=" + data.dbId1 + "&dbId2=" + data.dbId2 + "' target='_blank'>3d</a>";
            var link3 = "<a href='/api/align_pdb?uploadId=" + data.uploadId +  "&dbId1=" + data.dbId1 + "&dbId2=" + data.dbId2 + "'>pdb</a>";

            // build table body
            var tbody = "";
            tbody += "<tr style='font-family:monospace'><td>" + link1 + "&nbsp;" + link2 + "&nbsp;" + link3 + "</td></tr>";
           
            // insert into DOM
            $("#dataTable thead").html(thead);
            $("#dataTable tbody").html(tbody);
            $("#dataTable").show();

        } // end success
        else {

            // show error message
            $("#errorMessage").html(data.message);
            $("#errorTable").show();

        } // end error
    }); // end done
}

var getParams = function (uploadId) {

    var searchBy = $("input[type=radio][name=searchBy]:checked").val();
    var dbId1 = $.trim($("#dbId1").val());
    var dbId2 = $.trim($("#dbId2").val());

    if (uploadId !== "-1") {
            
        var selectedFiles = $("#pdbFile1").prop("files");
        if (selectedFiles.length > 0) {
            dbId1 = selectedFiles[0].name;
        }
        else {
            dbId1 = "upload";
        }
    }

    var params = {
        sb: searchBy,
        dbId1: dbId1,
        dbId2: dbId2,
        uploadId: uploadId
    };

    return params;
}
