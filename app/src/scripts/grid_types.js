
var GridTypes = {

    qci: {
        columns: [
            { column: 0, name: 'pdf', header: 'Report',
                hrefName: "accession", href: "api/qci/pdf?accession="
            },
            { column: 1, name: 'testDate', header: 'Test Date', nowrap: true },
            { column: 2, name: 'testCode', header: 'Panel' }, 
            { column: 3, name: 'physician', header: 'Physician' }, 
            { column: 4, name: 'accession', header: 'ACCN' },
            { column: 5, name: 'mrn', header: 'MRN', nowrap: true },
            { column: 6, name: 'diagnosis', header: 'Diagnosis' }, 
            { column: 7, name: 'interpretation', header: 'Interpretation' }, 
            { column: 8, name: 'gene', header: 'Gene',
                hrefName: "gene", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
            },
            { column: 9, name: 'alleleFraction', header: 'AF %', isNumeric : true, nowrap: true }, 
            { column: 10, name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/"
            },
            { column: 11, name: 'transcriptChange', header: 'Change', pre: true }, 
            { column: 12, name: 'transcriptExon', header: 'Exon' }, 
            { column: 13, name: 'protein', header: 'Protein',
                hrefName: "protein", href: "https://www.ncbi.nlm.nih.gov/protein/"
            },
            { column: 14, name: 'proteinChange', header: 'Change' }, 
            { column: 15, name: 'assessment', header: 'Assessment' }
        ],
        items: []
    },

    ion: {
        columns: [
            { column: 0, name: 'assay_folder', header: 'assay_folder' },
            { column: 1, name: 'cmol_id', header: 'cmol_id' },
            { column: 2, name: 'accession_id', header: 'accession_id' },
            { column: 3, name: 'locus', header: 'locus' },
            { column: 4, name: 'type', header: 'type' },
            { column: 5, name: 'subtype', header: 'subtype' },
            { column: 6, name: 'genotype', header: 'genotype' },
            { column: 7, name: 'filter', header: 'filter' },
            { column: 8, name: 'ref', header: 'ref' }, 
            { column: 9, name: 'genes', header: 'genes' }, 
            { column: 10, name: 'transcript', header: 'transcript' }, 
            { column: 11, name: 'coding', header: 'coding' }, 
            { column: 12, name: 'protein', header: 'protein' }, 
        ],
        items: []
    },
    
    gc: {
        columns: [
            { column: 0, name: 'checkbox', header: 'Select', 
                checkbox: true, checkId: 'accession'
            },
            { column: 1, name: 'notified', header: 'Notified', 
                check: true 
            },
            { column: 2, name: 'pdf', header: 'Report',
                hrefName: 'accession', href: 'api/qci/pdf?accession='
            },
            { column: 3, name: 'testDate', header: 'Test Date', nowrap: true },
            { column: 4, name: 'testCode', header: 'Panel' }, 
            { column: 5, name: 'physician', header: 'Physician' },
            { column: 6, name: 'accession', header: 'ACCN' },
            { column: 7, name: 'mrn', header: 'MRN', nowrap: true },
            { column: 8, name: 'age', header: 'Age' },
            { column: 9, name: 'tumorSite', header: 'Tumor Site' }, 
            { column: 10, name: 'diagnosis', header: 'Diagnosis' }, 
            { column: 11, name: 'interpretation', header: 'Interpretation' }, 
            { column: 12, name: 'genes', header: 'Variant Genes' }
        ],
        items: []
    },
}
