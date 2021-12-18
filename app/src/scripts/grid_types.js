
var GridTypes = {

    QCI: {
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#' },
            { column: 1, width: '7%', name: 'mrn', header: 'MRN' },
            { column: 2, width: '7%', name: 'accession', header: 'Accession #' },
            { column: 3, width: '7%', name: 'testDate', header: 'Test Date' },
            { column: 4, width: '7%', name: 'testCode', header: 'Test Code' }, 
            { column: 5, width: '7%', name: 'diagnosis', header: 'Diagnosis' }, 
            { column: 6, width: '7%', name: 'interpretation', header: 'Interpretation' }, 
            { column: 7, width: '7%', name: 'physician', header: 'Physician' }, 
            { column: 8, width: '5%', name: 'gene', header: 'Gene',
                hrefName: "gene", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
            },
            { column: 9, width: '7%', name: 'alleleFraction', header: 'Allele %', isScore: true }, 
            { column: 10, width: '7%', name: 'transcript', header: 'Transcript' }, 
            { column: 11, width: '7%', name: 'transcriptChange', header: 'Change' }, 
            { column: 12, width: '7%', name: 'protein', header: 'Protein' }, 
            { column: 13, width: '7%', name: 'proteinChange', header: 'Change' }, 
            { column: 14, width: '7%', name: 'assessment', header: 'Assessment' }
        ],
        items: []
    },

    getGridType: function() {

        return this.QCI;
    }
}
