
$(document).ready(function(){

    // *** export 

    $("#exportTable").click(function() { 

        Export.exportTableToCSV("data.csv");

    }); // end click

    // *** run

    $("#run").click(function () {
      
        $("#errorTable").hide();
        $("#emptyTable").hide();
        $("tableHeader").hide();
        $("#dataTableDiv").hide(); 
        $("#exportTable").hide();

        $("#waitTable").show();
        $("#run").prop("disabled", true);
        
        var params = getParams();

        return $.getJSON('api/ion/report?' + $.param(params))
        .done(function (data) {
            
            $("#waitTable").hide();
            $("#run").prop("disabled", false);

            if (data.code === "0") {
                if (data.records.length > 0) {

                    // get grid type
                    var gt = GridTypes.ion_cnv_stats;

                    // build table head
                    var thead = "";
                    $.each(gt.columns, function (i, column) {
                        if (column.nowrap) {
                            thead += "<th nowrap><span>" + column.header + "</span></th>";
                        }
                        else {
                            thead += "<th><span>" + column.header + "</span></th>";
                        }
                    });
                    thead = "<tr>" + thead + "</tr>";

                    // build table body
                    var tbody = "";
                    $.each(data.records, function (i, item) {
                        var tr = "";
                        $.each(gt.columns, function (j, column) {
                        
                            if (column.isNumeric) {
                                tr += "<td>" + Functions.scoreConverter(item[column.name]) + "</td>";
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
                    $("#tableHeader").show();
                    $("#dataTableDiv").show();
                    $("#exportTable").show();
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
    }); // end click

    // update the diagnosis selectbox
    $.getJSON('api/ion/sample_count')
        .done(function (data) {
            if (data.code === "0") {
                $("#sampleCount").html(data.sampleCount);
            } 
        }); // end done

}); // end jquery

var getParams = function () {

    var reportId = $.trim($("#reports").val())

    var params = {
        reportId : reportId
    };

    return params;
}
