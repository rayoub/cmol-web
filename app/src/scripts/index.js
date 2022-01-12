
$(document).ready(function(){

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
                            else if (column.hasOwnProperty("href")) {
                                var link = "<a href='" + column.href + item[column.hrefName] + "' target='_blank'>" + item[column.name] + "</a>";
                                tr += "<td>" + link + "</td>";
                            }
                            else if (column.nowrap) {
                                tr += "<td nowrap>" + item[column.name] + "</td>";
                            }
                            else if (column.pre) {
                                tr += "<td><pre style='font-family: monospace; font-size: 16px'>" + item[column.name] + "</pre></td>";
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
    
    // *** copy 
    $("#copy").click(function() { 
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        var params = getParams();
        dummy.value = "genes=" + params.genes + "\ntcChange=" + params.tcChange + "\npcChange=" + params.pcChange;
        alert(dummy.value);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }); // end click

}); // end jquery

var getParams = function () {

    var fromDate = $.trim($("#fromDate").val());
    var toDate = $.trim($("#toDate").val());
    var genes = $.trim($("#genes").val());
    var tcChange = $.trim($("#tcChange").val());
    var pcChange = $.trim($("#pcChange").val());

    var params = {
        fromDate: fromDate,
        toDate: toDate,
        genes: genes,
        tcChange: tcChange,
        pcChange: pcChange
    };

    return params;
}
