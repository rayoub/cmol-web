
var GridTypes = {

    QCI: {
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#' },
            { column: 1, width: '6%', name: 'mrn', header: 'MRN' },
            { column: 2, width: '6%', name: 'accession', header: 'ACCN' },
            { column: 3, width: '6%', name: 'testDate', header: 'Test Date' },
            { column: 4, width: '8%', name: 'testCode', header: 'Panel' }, 
            { column: 5, width: '10%', name: 'diagnosis', header: 'Diagnosis' }, 
            { column: 6, width: '8%', name: 'interpretation', header: 'Interpretation' }, 
            { column: 7, width: '10%', name: 'physician', header: 'Physician' }, 
            { column: 8, width: '5%', name: 'gene', header: 'Gene',
                hrefName: "gene", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
            },
            { column: 9, width: '6%', name: 'alleleFraction', header: 'Allele %', isScore: true }, 
            { column: 10, width: '7%', name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/"
            },
            { column: 11, width: '5%', name: 'transcriptChange', header: 'Change' }, 
            { column: 12, width: '7%', name: 'protein', header: 'Protein',
                hrefName: "protein", href: "https://www.ncbi.nlm.nih.gov/protein/"
            },
            { column: 13, width: '5%', name: 'proteinChange', header: 'Change' }, 
            { column: 14, width: '7%', name: 'assessment', header: 'Assessment' }
        ],
        items: []
    },

    getGridType: function() {

        return this.QCI;
    }
}
