  
$(document).ready(function(){

    // *** form event handlers
    
    $("#dbType").change(function () {

        var ft;
        if ($("input[type=radio][name=searchBy]:checked").val() === "1") {
            ft = FilterTypes.getFilterType($("#dbType").val());
        }
        else {
            ft = FilterTypes.getUploadFilterType($("#dbType").val());
        }
        
        var options = "";
        $.each(ft, function (i, filter) {
            if (i === 0) {
                options += "<option value='" + filter.id + "' selected>" + filter.name + "</option>";
            }
            else {
                options += "<option value='" + filter.id + "'>" + filter.name + "</option>";
            }
        });
        $("#searchFilter").html(options);

    }); // end change

    $("input[type=radio][name=searchBy]").change(function () {

        if (this.value === "1") {
            $("#dbIdDiv").show();
            $("#pdbFileDiv").hide();
        }
        else {
            $("#dbIdDiv").hide();
            $("#pdbFileDiv").show();
        }

        // upload filter types also
        $("#dbType").change();

    }); // end change

    // *** initialize form
    
    $("#dbType").change();

    // *** export 
    $("#exportTable").click(function() { 

        Export.exportTableToCSV("data.csv");

    }); // end click

    // *** search

    $("#search").click(function () {

        var searchBy = $("input[type=radio][name=searchBy]:checked").val();

        if (searchBy === "1") {

            // structure id validation
            var dbId = $.trim($("#dbId").val());
            if (dbId.length === 0) {
                alert("The 'Structure Id' field is required.");
                return;
            }
            else if (dbId.length < 5) { 
                alert("The 'Structure Id' field must be at least 5 characters in length.");
                return;
            }
            else if (dbId.length > 12) {
                alert("The 'Structure Id' field must be no more than 12 characters in length.");
                return;
            }

            // search
            getRecords("-1");
        }
        else if (searchBy === "2") {

            var selectedFiles = $("#pdbFile").prop("files");
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

                if (selectedFiles[0].size > 10 * Math.pow(2,20)) {

                    var error = 'The upload file exceeds the file size limitation of 10 MB. Try removing all lines from the PDB file that do not start with ATOM or HETATM.';

                    $("#errorMessage").html(error);
                    $("#errorTable").show();
                }
                else {
                    reader.readAsText(selectedFiles[0]); 
                }
            }
        } // end if
    }); // end click
}); // end jquery

var getRecords = function (uploadId) {
   
    $("#exportTable").hide();
    $("table").hide(); 
    $("#waitTable").show();
    $("#search").prop("disabled", true);
    
    var params = getParams(uploadId);

    return $.getJSON('api/search?' + $.param(params))
    .done(function (data) {
        
        $("#waitTable").hide();
        $("#search").prop("disabled", false);

        if (data.code === "0") {
            if (data.records.length > 0) {

                // get grid type
                var gt = GridTypes.getGridType(params.dbType, params.st);

                // build table head
                var thead = "";
                $.each(gt.columns, function (i, column) {
                    if (column.hasOwnProperty("title")) {
                        thead += "<th nowrap width='" + column.width + "'><span title='" + column.title + "'>" + column.header + "<i class='my-tooltip fas fa-question-circle fa-xs'></i></span></th>";
                    }
                    else {
                        thead += "<th width='" + column.width + "'><span>" + column.header + "</span></th>";
                    }
                });
                thead = "<tr>" + thead + "</tr>";

                // build table body
                var tbody = "";
                $.each(data.records, function (i, item) {
                    var tr = "";
                    $.each(gt.columns, function (j, column) {
                       
                        if (column.isScore) {
                            tr += "<td>" + Functions.scoreConverter(item[column.name]) + "</td>";
                        }
                        else if (column.hasOwnProperty("href")) {
                            var link = "<a href='" + column.href + item[column.hrefName] + "' target='_blank'>" + item[column.name] + "</a>";
                            tr += "<td>" + link + "</td>";
                        }
                        else if (column.name === "align") {
                            var link1 = "<a href='/align_text.html?uploadId=" + data.uploadId +  "&dbId1=" + data.dbId + "&dbId2=" + item["dbId"] + "' target='_blank'>text</a>";
                            var link2 = "<a href='/align_3d.html?uploadId=" + data.uploadId +  "&dbId1=" + data.dbId + "&dbId2=" + item["dbId"] + "' target='_blank'>3d</a>";
                            var link3 = "<a href='/api/align_pdb?uploadId=" + data.uploadId +  "&dbId1=" + data.dbId + "&dbId2=" + item["dbId"] + "'>pdb</a>";
                            tr += "<td>" + link1 + "&nbsp;" + link2 + "&nbsp;" + link3 + "</td>";
                        }
                        else if (column.name === "st" && item["sl"] === true) {
                            tr += "<td>" + item[column.name] + "*</td>";
                        }
                        else {
                            tr += "<td>" + item[column.name] + "</td>";
                        }
                    });
                    
                    tbody += "<tr style='font-family:monospace'>" + tr + "</tr>";
                });
               
                // insert into DOM
                $("#dataTable thead").html(thead);
                $("#dataTable tbody").html(tbody);
                $("#exportTable").show();
                $("#dataTable").show();
                if (data.alt == true) {
                    $("#altTable").show();
                }
            }
            else {

                // show no records message
                $("#emptyTable").show();
            }

        } // end success
        else {

            // show error message
            $("#errorMessage").html(data.message);
            $("#errorTable").show();

        } // end error
    }); // end done
}

var getParams = function (uploadId) {

    var dbType = $("#dbType").val();
    var searchFilter = $("#searchFilter").val(); 
    var searchBy = $("input[type=radio][name=searchBy]:checked").val();
    var dbId = $.trim($("#dbId").val());
    var searchType = $("#searchType").val();
    var searchMode = $("input[type=radio][name=searchMode]:checked").val();
    var limit = $("#limit").val();

    if (uploadId !== "-1") {
            
        var selectedFiles = $("#pdbFile").prop("files");
        if (selectedFiles.length > 0) {
            dbId = selectedFiles[0].name;
        }
        else {
            dbId = "upload";
        }
    }

    var params = {
        dbType: dbType, 
        sf: searchFilter,
        sb: searchBy,
        dbId: dbId,
        uploadId: uploadId,
        st: searchType,
        sm: searchMode,
        limit: limit
    };

    return params;
}
