
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
            { column: 8, name: 'locus', header: 'Locus' },
            { column: 9, name: 'gene', header: 'Gene',
                hrefName: "gene", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
            },
            { column: 10, name: 'alleleFraction', header: 'AF %', isNumeric : true, nowrap: true }, 
            { column: 11, name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/"
            },
            { column: 12, name: 'transcriptChange', header: 'Change', pre: true }, 
            { column: 13, name: 'transcriptExon', header: 'Exon' }, 
            { column: 14, name: 'protein', header: 'Protein',
                hrefName: "protein", href: "https://www.ncbi.nlm.nih.gov/protein/"
            },
            { column: 15, name: 'proteinChange', header: 'Change' }, 
            { column: 16, name: 'assessment', header: 'Assessment' }
        ],
        items: []
    },

    ion: {
        columns: [
            { column: 0, name: 'analysis_date', header: 'Analysis Date', nowrap: true },
            { column: 1, name: 'assay_folder', header: 'Assay' },
            { column: 2, name: 'cmol_id', header: 'CMOL ID', nowrap: true },
            { column: 3, name: 'accession_id', header: 'ACCN' },
            { column: 4, name: 'mrn', header: 'MRN' },
            { column: 5, name: 'locus', header: 'Locus' },
            { column: 6, name: 'type', header: 'Type' },
            { column: 7, name: 'genes', header: 'Genes',
                hrefName: "genes", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" },
            { column: 8, name: 'filter', header: 'Filter' },
            { column: 9, name: 'ref', header: 'Ref' }, 
            { column: 10, name: 'normalized_alt', header: 'Alt' }, 
            { column: 11, name: 'coverage', header: 'Coverage' },
            { column: 12, name: 'allele_frequency', header: 'Allele Freq.', nowrap: true },
            { column: 13, name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/" 
            },
            { column: 14, name: 'coding', header: 'Transcript Change' }, 
            { column: 15, name: 'protein', header: 'Protein Change' }
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
