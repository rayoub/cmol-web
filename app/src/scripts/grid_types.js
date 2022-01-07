
var GridTypes = {

    QCI: {
        columns: [
            { column: 0, name: 'n', header: 'Report #', nowrap: true },
            { column: 1, name: 'testDate', header: 'Test Date', nowrap: true },
            { column: 2, name: 'testCode', header: 'Panel' }, 
            { column: 3, name: 'diagnosis', header: 'Diagnosis' }, 
            { column: 4, name: 'interpretation', header: 'Interpretation' }, 
            { column: 5, name: 'physician', header: 'Physician' }, 
            { column: 6, name: 'gene', header: 'Gene',
                hrefName: "gene", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
            },
            { column: 7, name: 'alleleFraction', header: 'Allele %', isNumeric : true, nowrap: true }, 
            { column: 8, name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/"
            },
            { column: 9, name: 'transcriptChange', header: 'Change' }, 
            { column: 10, name: 'protein', header: 'Protein',
                hrefName: "protein", href: "https://www.ncbi.nlm.nih.gov/protein/"
            },
            { column: 11, name: 'proteinChange', header: 'Change' }, 
            { column: 12, name: 'assessment', header: 'Assessment' }
        ],
        items: []
    },

    getGridType: function() {

        return this.QCI;
    }
}
