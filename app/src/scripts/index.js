
$(document).ready(function(){

    // *** form event handlers

    // *** initialize form

    // *** export 
    $("#exportTable").click(function() { 

        Export.exportTableToCSV("data.csv");

    }); // end click

    // *** search

    $("#search").click(function () {
      
        $("#errorTable").hide();
        $("#emptyTable").hide();
        $("tableHeader").hide();
        $("#dataTableDiv").hide(); 
        $("#exportTable").hide();

        $("#waitTable").show();
        $("#search").prop("disabled", true);
        
        var params = getParams();

        return $.getJSON('api/search?' + $.param(params))
        .done(function (data) {
            
            $("#waitTable").hide();
            $("#search").prop("disabled", false);

            if (data.code === "0") {
                if (data.records.length > 0) {

                    // get grid type
                    var gt = GridTypes.getGridType();

                    // build table head
                    var thead = "";
                    $.each(gt.columns, function (i, column) {
                        if (column.hasOwnProperty("title")) {
                            thead += "<th nowrap width='" + column.width + "'><span title='" + column.title + "'>" + column.header + "<i class='my-tooltip fas fa-question-circle fa-xs'></i></span></th>";
                        }
                        else {
                            thead += "<th nowrap width='" + column.width + "'><span>" + column.header + "</span></th>";
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
}); // end jquery

var getParams = function () {

    var genes = $.trim($("#genes").val());
    var changeType = $("input[type=radio][name=changeType]:checked").val();
    var tcChange = $.trim($("#tcChange").val());
    var pcChange = $.trim($("#pcChange").val());

    var params = {
        genes: genes,
        changeType: changeType,
        tcChange: tcChange,
        pcChange: pcChange
    };

    return params;
}
