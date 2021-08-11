$(document).ready(function(){

    var uploadIdVal = Functions.getQueryVariable("uploadId");
    var dbId1Val = Functions.getQueryVariable("dbId1");
    var dbId2Val = Functions.getQueryVariable("dbId2");

    // get pdb alignment
    $.get('api/align_3d?' + $.param({
        uploadId: uploadIdVal,
        dbId1: dbId1Val,
        dbId2: dbId2Val
    }))
    .done(function (data) {

        $("#waitPanel").hide();

        if (data == "") {
            
            // show error message
            $("#errorMessage").html("An unexpected error occurred at the server.");
            $("#errorPanel").show();
        }
        else {

            $("#protein1").text(dbId1Val);
            $("#protein2").text(dbId2Val);
           
            // show alignment panel
            $("#alignmentPanel").show();

            // get molecule 
            var mol = ChemDoodle.readPDB(data);

            // create viewer
            var viewer = new ChemDoodle.TransformCanvas3D("alignmentCanvas", 800, 600);
            viewer.rotate3D = true;
            viewer.styles.macro_colorByChain = true;
            viewer.styles.proteins_ribbonCartoonize = true;

            // load molecule
            viewer.loadMolecule(mol);

            viewer.repaint();
        }
    }); // end done
}); // end jquery

