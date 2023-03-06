
$(document).ready(function(){

    // *** notifications
    
    $("#setAsNotifiedButton").click(function() { 

        // get checked 
        var valuesArray = $('input:checkbox:checked').map( function() {
            return this.id;
        }).get().join(",");

        // set checked
        return $.getJSON('api/gc/set?' + $.param({ accessions: valuesArray })).done(
            function(data) {

                // perhaps I should do something with the response
                $("#search").trigger("click"); 
            }
        );
    }); // end click
    
    $("#setAsNotNotifiedButton").click(function() { 

        // get checked 
        var valuesArray = $('input:checkbox:checked').map( function() {
            return this.id;
        }).get().join(",");

        // set checked
        return $.getJSON('api/gc/unset?' + $.param({ accessions: valuesArray })).done(
            function(data) {

                // perhaps I should do something with the response
                $("#search").trigger("click"); 
            }
        );
    }); // end click

    // *** search

    $("#search").click(function () {
      
        $("#errorTable").hide();
        $("#emptyTable").hide();
        $("tableHeader").hide();
        $("#dataTableDiv").hide(); 
        $("#buttonTable").hide();

        $("#waitTable").show();
        $("#search").prop("disabled", true);
        
        var params = getParams();
        return $.getJSON('api/gc?' + $.param(params)).done(doneWithGrid);
    }); // end click

}); // end jquery

var getParams = function () {

    var fromDate = $.trim($("#fromDate").val());
    var toDate = $.trim($("#toDate").val());

    var params = {
        fromDate: fromDate,
        toDate: toDate
    };

    return params;
}

var doneWithGrid = function(data) {
    
    $("#waitTable").hide();
    $("#search").prop("disabled", false);

    if (data.code === "0") {
        if (data.records.length > 0) {

            // get grid type
            var gt = GridTypes.gc;

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
                
                    if (column.hasOwnProperty("href")) {
                        var link = "<a href='" + column.href + item[column.hrefName] + "' target='_blank'>" + item[column.name] + "</a>";
                        tr += "<td>" + link + "</td>";
                    }
                    else if (column.check) {
                        if (item[column.name] == '1') {
                            tr += "<td><img src='scripts/check.svg'></td>";
                        }
                        else {
                            tr += "<td>&nbsp;</td>";
                        }
                    }
                    else if (column.checkbox) {
                        tr += "<td><input class='form-check-input' type='checkbox' id='" + item[column.checkId] + "'/></td>";
                    }
                    else if (column.nowrap) {
                        tr += "<td nowrap>" + item[column.name] + "</td>";
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
            $("#buttonTable").show();
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

    window.scrollTo(0,0);
}
