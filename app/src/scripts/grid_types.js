
var GridTypes = {

    qci: {
        columns: [
            { column: 0, name: 'pdf', header: 'Report',
                hrefName: "sample_id", href: "api/qci/pdf?sample_id="
            },
            { column: 1, name: 'testDate', header: 'Test Date', nowrap: true },
            { column: 2, name: 'testCode', header: 'Panel', nowrap: true }, 
            { column: 3, name: 'specimen_id', header: 'Specimen ID', nowrap: true },
            { column: 4, name: 'mrn', header: 'MRN', nowrap: true },
            { column: 5, name: 'physician', header: 'Physician' }, 
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
            { column: 12, name: 'transcriptChange', header: 'Change' },
            { column: 13, name: 'transcriptExon', header: 'Exon' }, 
            { column: 14, name: 'protein', header: 'Protein',
                hrefName: "protein", href: "https://www.ncbi.nlm.nih.gov/protein/"
            },
            { column: 15, name: 'proteinChange', header: 'Change' }, 
            { column: 16, name: 'assessment', header: 'Assessment', nowrap: true }
        ],
        items: []
    },
    
    lab: {
        columns: [
            { column: 0, name: 'reportedDate', header: 'Reported Date', nowrap: true },
            { column: 1, name: 'testCode', header: 'Panel', nowrap: true }, 
            { column: 2, name: 'runId', header: 'Run ID', nowrap: true }, 
            { column: 3, name: 'specimenId', header: 'Specimen ID', nowrap: true },
            { column: 4, name: 'mrn', header: 'MRN', nowrap: true },
            { column: 5, name: 'surgpathId', header: 'Surgpath ID', nowrap: true },
            { column: 6, name: 'diagnosis', header: 'Diagnosis' }, 
            { column: 7, name: 'locus', header: 'Locus' },
            { column: 8, name: 'gene', header: 'Gene',
                hrefName: "gene", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
            },
            { column: 9, name: 'alleleFraction', header: 'AF %', isNumeric : true, nowrap: true }, 
            { column: 10, name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/"
            },
            { column: 11, name: 'transcriptChange', header: 'Change' },
            { column: 12, name: 'transcriptExon', header: 'Exon' }, 
            { column: 13, name: 'proteinChange', header: 'Change' }, 
            { column: 14, name: 'assessment', header: 'Assessment', nowrap: true }
        ],
        items: []
    },

    ion: {
        columns: [
            { column: 0, name: 'analysis_date', header: 'Analysis Date', nowrap: true },
            { column: 1, name: 'assay_folder', header: 'Assay' },
            { column: 2, name: 'specimen_id', header: 'Specimen ID', nowrap: true },
            { column: 4, name: 'mrn', header: 'MRN' },
            { column: 5, name: 'locus', header: 'Locus' },
            { column: 6, name: 'type', header: 'Type' },
            { column: 7, name: 'copy_number', header: 'CN'},
            { column: 8, name: 'fold_diff', header: 'FD'},
            { column: 9, name: 'genes', header: 'Genes',
                hrefName: "genes", href: "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" },
            { column: 10, name: 'filter', header: 'Filter' },
            { column: 11, name: 'ref', header: 'Ref' }, 
            { column: 12, name: 'normalized_alt', header: 'Alt' }, 
            { column: 13, name: 'coverage', header: 'Coverage' },
            { column: 14, name: 'allele_frequency', header: 'Allele Freq.', nowrap: true },
            { column: 15, name: 'transcript', header: 'Transcript',
                hrefName: "transcript", href: "https://www.ncbi.nlm.nih.gov/nuccore/" 
            },
            { column: 16, name: 'coding', header: 'Transcript Change' }, 
            { column: 17, name: 'protein', header: 'Protein Change' }
        ],
        items: []
    },
    
    ion_cnv_stats: {
        columns: [
            { column: 0, name: 'gene', header: 'Gene' },
            { column: 1, name: 'gn', header: 'Sample Count' },
            { column: 2, name: 'sn', header: 'Total Samples' },
            { column: 3, name: 'gnPct', header: 'Sample %', isNumeric: true },
            { column: 4, name: 'minCn', header: 'Min Copy Number', isNumeric: true },
            { column: 5, name: 'maxCn', header: 'Max Copy Number', isNumeric: true },
            { column: 6, name: 'avgCn', header: 'Avg Copy Number', isNumeric: true }
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
