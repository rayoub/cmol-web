
var GridTypes = {

    // standard grids

    SCOPe: {
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '4%', name: 'cl', header: 'CL', isScore: false, title: "Class" },
            { column: 2, width: '4%', name: 'cf', header: 'CF', isScore: false, title: "Fold" },
            { column: 3, width: '4%', name: 'sf', header: 'SF', isScore: false, title: "Superfamily" },
            { column: 4, width: '4%', name: 'fa', header: 'FA', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'SCOP Domain', isScore: false,
                hrefName: 'sunid', href: "http://scop.berkeley.edu/sunid="
            }, 
            { column: 6, width: '25%', name: 'cf_descr', header: 'Fold', isScore: false }, 
            { column: 7, width: '25%', name: 'sf_descr', header: 'Superfamily', isScore: false },
            { column: 8, width: '6%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized based on search type" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    CATH: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'c', header: 'C', isScore: false, title: "Class" },
            { column: 2, width: '3%', name: 'a', header: 'A', isScore: false, title: "Architecture" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "Topology" },
            { column: 4, width: '3%', name: 'h', header: 'H', isScore: false, title: "Homologous Superfamily" },
            { column: 5, width: '3%', name: 's', header: 's35', isScore: false }, 
            { column: 6, width: '10%', name: 'dbId', header: 'CATH Domain', isScore: false,
                hrefName: 'dbId', href: "http://www.cathdb.info/version/latest/domain/"
            }, 
            { column: 7, width: '25%', name: 't_descr', header: 'Topology', isScore: false }, 
            { column: 8, width: '25%', name: 'h_descr', header: 'Superfamily', isScore: false }, 
            { column: 9, width: '6%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 10, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized based on search type" }, 
            { column: 11, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },
    
    ECOD: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'x', header: 'X', isScore: false, title: "X-Group" },
            { column: 2, width: '3%', name: 'h', header: 'H', isScore: false, title: "H-Group" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "T-Group" },
            { column: 4, width: '3%', name: 'f', header: 'F', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'ECOD Domain', isScore: false,
                hrefName: 'dbId', href: "http://prodata.swmed.edu/ecod/complete/domain/"
            }, 
            { column: 6, width: '25%', name: 't_descr', header: 'T-Group', isScore: false }, 
            { column: 7, width: '25%', name: 'f_descr', header: 'Family', isScore: false }, 
            { column: 8, width: '6%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized based on search type" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    Chain: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false }, 
            { column: 1, width: '10%', name: 'dbId', header: 'Chain Id', isScore: false,
                hrefName: 'pdbId', href: "https://www.rcsb.org/structure/"
            }, 
            { column: 2, width: '8%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 3, width: '8%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized based on search type" }, 
            { column: 4, width: '8%', name: 'align', header: 'TM-Align', isScore: false }
        ],
        items: []
    },
    
    // RMSD grids
    
    SCOPe_4: {
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '4%', name: 'cl', header: 'CL', isScore: false, title: "Class" },
            { column: 2, width: '4%', name: 'cf', header: 'CF', isScore: false, title: "Fold" },
            { column: 3, width: '4%', name: 'sf', header: 'SF', isScore: false, title: "Superfamily" },
            { column: 4, width: '4%', name: 'fa', header: 'FA', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'SCOP Domain', isScore: false,
                hrefName: 'sunid', href: "http://scop.berkeley.edu/sunid="
            }, 
            { column: 6, width: '25%', name: 'cf_descr', header: 'Fold', isScore: false }, 
            { column: 7, width: '25%', name: 'sf_descr', header: 'Superfamily', isScore: false },
            { column: 8, width: '6%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    CATH_4: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'c', header: 'C', isScore: false, title: "Class" },
            { column: 2, width: '3%', name: 'a', header: 'A', isScore: false, title: "Architecture" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "Topology" },
            { column: 4, width: '3%', name: 'h', header: 'H', isScore: false, title: "Homologous Superfamily" },
            { column: 5, width: '3%', name: 's', header: 's35', isScore: false }, 
            { column: 6, width: '10%', name: 'dbId', header: 'CATH Domain', isScore: false,
                hrefName: 'dbId', href: "http://www.cathdb.info/version/latest/domain/"
            }, 
            { column: 7, width: '25%', name: 't_descr', header: 'Topology', isScore: false }, 
            { column: 8, width: '25%', name: 'h_descr', header: 'Superfamily', isScore: false }, 
            { column: 9, width: '6%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 10, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 11, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },
    
    ECOD_4: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'x', header: 'X', isScore: false, title: "X-Group" },
            { column: 2, width: '3%', name: 'h', header: 'H', isScore: false, title: "H-Group" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "T-Group" },
            { column: 4, width: '3%', name: 'f', header: 'F', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'ECOD Domain', isScore: false,
                hrefName: 'dbId', href: "http://prodata.swmed.edu/ecod/complete/domain/"
            }, 
            { column: 6, width: '25%', name: 't_descr', header: 'T-Group', isScore: false }, 
            { column: 7, width: '25%', name: 'f_descr', header: 'Family', isScore: false }, 
            { column: 8, width: '6%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    Chain_4: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false }, 
            { column: 1, width: '10%', name: 'dbId', header: 'Chain Id', isScore: false,
                hrefName: 'pdbId', href: "https://www.rcsb.org/structure/"
            }, 
            { column: 2, width: '8%', name: 'rmsd', header: 'RMSD', isScore: true }, 
            { column: 3, width: '8%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 4, width: '8%', name: 'align', header: 'TM-Align', isScore: false }
        ],
        items: []
    },
    
    // Q-Score grids
    
    SCOPe_5: {
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '4%', name: 'cl', header: 'CL', isScore: false, title: "Class" },
            { column: 2, width: '4%', name: 'cf', header: 'CF', isScore: false, title: "Fold" },
            { column: 3, width: '4%', name: 'sf', header: 'SF', isScore: false, title: "Superfamily" },
            { column: 4, width: '4%', name: 'fa', header: 'FA', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'SCOP Domain', isScore: false,
                hrefName: 'sunid', href: "http://scop.berkeley.edu/sunid="
            }, 
            { column: 6, width: '25%', name: 'cf_descr', header: 'Fold', isScore: false }, 
            { column: 7, width: '25%', name: 'sf_descr', header: 'Superfamily', isScore: false },
            { column: 8, width: '6%', name: 'q', header: 'Q-Score', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    CATH_5: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'c', header: 'C', isScore: false, title: "Class" },
            { column: 2, width: '3%', name: 'a', header: 'A', isScore: false, title: "Architecture" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "Topology" },
            { column: 4, width: '3%', name: 'h', header: 'H', isScore: false, title: "Homologous Superfamily" },
            { column: 5, width: '3%', name: 's', header: 's35', isScore: false }, 
            { column: 6, width: '10%', name: 'dbId', header: 'CATH Domain', isScore: false,
                hrefName: 'dbId', href: "http://www.cathdb.info/version/latest/domain/"
            }, 
            { column: 7, width: '25%', name: 't_descr', header: 'Topology', isScore: false }, 
            { column: 8, width: '25%', name: 'h_descr', header: 'Superfamily', isScore: false }, 
            { column: 9, width: '6%', name: 'q', header: 'Q-Score', isScore: true }, 
            { column: 10, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 11, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },
    
    ECOD_5: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'x', header: 'X', isScore: false, title: "X-Group" },
            { column: 2, width: '3%', name: 'h', header: 'H', isScore: false, title: "H-Group" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "T-Group" },
            { column: 4, width: '3%', name: 'f', header: 'F', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'ECOD Domain', isScore: false,
                hrefName: 'dbId', href: "http://prodata.swmed.edu/ecod/complete/domain/"
            }, 
            { column: 6, width: '25%', name: 't_descr', header: 'T-Group', isScore: false }, 
            { column: 7, width: '25%', name: 'f_descr', header: 'Family', isScore: false }, 
            { column: 8, width: '6%', name: 'q', header: 'Q-Score', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    Chain_5: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false }, 
            { column: 1, width: '10%', name: 'dbId', header: 'Chain Id', isScore: false,
                hrefName: 'pdbId', href: "https://www.rcsb.org/structure/"
            }, 
            { column: 2, width: '8%', name: 'q', header: 'Q-Score', isScore: true }, 
            { column: 3, width: '8%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 4, width: '8%', name: 'align', header: 'TM-Align', isScore: false }
        ],
        items: []
    },
    
    // SSAP grids
    
    SCOPe_6: {
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '4%', name: 'cl', header: 'CL', isScore: false, title: "Class" },
            { column: 2, width: '4%', name: 'cf', header: 'CF', isScore: false, title: "Fold" },
            { column: 3, width: '4%', name: 'sf', header: 'SF', isScore: false, title: "Superfamily" },
            { column: 4, width: '4%', name: 'fa', header: 'FA', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'SCOP Domain', isScore: false,
                hrefName: 'sunid', href: "http://scop.berkeley.edu/sunid="
            }, 
            { column: 6, width: '25%', name: 'cf_descr', header: 'Fold', isScore: false }, 
            { column: 7, width: '25%', name: 'sf_descr', header: 'Superfamily', isScore: false },
            { column: 8, width: '6%', name: 'ssap', header: 'SSAP', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    CATH_6: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'c', header: 'C', isScore: false, title: "Class" },
            { column: 2, width: '3%', name: 'a', header: 'A', isScore: false, title: "Architecture" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "Topology" },
            { column: 4, width: '3%', name: 'h', header: 'H', isScore: false, title: "Homologous Superfamily" },
            { column: 5, width: '3%', name: 's', header: 's35', isScore: false }, 
            { column: 6, width: '10%', name: 'dbId', header: 'CATH Domain', isScore: false,
                hrefName: 'dbId', href: "http://www.cathdb.info/version/latest/domain/"
            }, 
            { column: 7, width: '25%', name: 't_descr', header: 'Topology', isScore: false }, 
            { column: 8, width: '25%', name: 'h_descr', header: 'Superfamily', isScore: false }, 
            { column: 9, width: '6%', name: 'ssap', header: 'SSAP', isScore: true }, 
            { column: 10, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 11, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },
    
    ECOD_6: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false },
            { column: 1, width: '3%', name: 'x', header: 'X', isScore: false, title: "X-Group" },
            { column: 2, width: '3%', name: 'h', header: 'H', isScore: false, title: "H-Group" },
            { column: 3, width: '3%', name: 't', header: 'T', isScore: false, title: "T-Group" },
            { column: 4, width: '3%', name: 'f', header: 'F', isScore: false, title: "Family" }, 
            { column: 5, width: '10%', name: 'dbId', header: 'ECOD Domain', isScore: false,
                hrefName: 'dbId', href: "http://prodata.swmed.edu/ecod/complete/domain/"
            }, 
            { column: 6, width: '25%', name: 't_descr', header: 'T-Group', isScore: false }, 
            { column: 7, width: '25%', name: 'f_descr', header: 'Family', isScore: false }, 
            { column: 8, width: '6%', name: 'ssap', header: 'SSAP-score', isScore: true }, 
            { column: 9, width: '6%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 10, width: '8%', name: 'align', header: 'TM-Align', isScore: false } 
        ],
        items: []
    },

    Chain_6: {     
        columns: [
            { column: 0, width: '3%', name: 'n', header: '#', isScore: false }, 
            { column: 1, width: '10%', name: 'dbId', header: 'Chain Id', isScore: false,
                hrefName: 'pdbId', href: "https://www.rcsb.org/structure/"
            }, 
            { column: 2, width: '8%', name: 'ssap', header: 'SSAP', isScore: true }, 
            { column: 3, width: '8%', name: 'tmScore', header: 'TM-Score', isScore: true, title: "Normalized by avg. length of structures" }, 
            { column: 4, width: '8%', name: 'align', header: 'TM-Align', isScore: false }
        ],
        items: []
    },

    getGridType: function(db, st) {

        if (db == 1 || db == "SCOPe") {
            if (st == 4) {
                return this.SCOPe_4;
            }
            else if (st == 5) {
                return this.SCOPe_5;
            }
            else if (st == 6) {
                return this.SCOPe_6;
            }
            else {
                return this.SCOPe;
            }
        }
        else if (db == 2 || db == "CATH") {
            if (st == 4) {
                return this.CATH_4;
            }
            else if (st == 5) {
                return this.CATH_5;
            }
            else if (st == 6) {
                return this.CATH_6;
            }
            else {
                return this.CATH;
            }
        }
        else if (db == 3 || db == "ECOD") {
            if (st == 4) {
                return this.ECOD_4;
            }
            else if (st == 5) {
                return this.ECOD_5;
            }
            else if (st == 6) {
                return this.ECOD_6;
            }
            else {
                return this.ECOD;
            }
        }
        else {
            if (st == 4) {
                return this.Chain_4;
            }
            else if (st == 5) {
                return this.Chain_5;
            }
            else if (st == 6) {
                return this.Chain_6;
            }
            else {
                return this.Chain;
            }
        }
    }
}
