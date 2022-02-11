
var GridTypes = {

    QCI: {
        columns: [
            { column: 0, name: 'n', header: '#', nowrap: true },
            { column: 1, name: 'mrn', header: 'MRN', nowrap: true },
            { column: 2, name: 'testDate', header: 'Test Date', nowrap: true },
            { column: 3, name: 'testCode', header: 'Panel' }, 
            { column: 4, name: 'diagnosis', header: 'Diagnosis' }, 
            { column: 5, name: 'interpretation', header: 'Interpretation' }, 
            { column: 6, name: 'physician', header: 'Physician' }, 
            { column: 7, name: 'gene', header: 'Gene',
                hrefName: "gene", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
            },
            { column: 8, name: 'alleleFraction', header: 'Allele %', isNumeric : true, nowrap: true }, 
            { column: 9, name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/"
            },
            { column: 10, name: 'transcriptChange', header: 'Change', pre: true }, 
            { column: 11, name: 'protein', header: 'Protein',
                hrefName: "protein", href: "https://www.ncbi.nlm.nih.gov/protein/"
            },
            { column: 12, name: 'proteinChange', header: 'Change' }, 
            { column: 13, name: 'assessment', header: 'Assessment' }
        ],
        items: []
    },

    getGridType: function() {

        return this.QCI;
    }
}
