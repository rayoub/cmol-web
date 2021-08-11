
var FilterTypes = {

    SCOPe: [
        { id: 0, name: 'No Filter' },
        { id: 1, name: 'Different Fold' },
        { id: 2, name: 'Different Superfamily' },
        { id: 3, name: 'Different Family' }
    ],

    CATH: [
        { id: 0, name: 'No Filter' }, 
        { id: 1, name: 'Different Topology' },
        { id: 2, name: 'Different Superfamily' },
        { id: 3, name: 'Different s35' },
        { id: 4, name: 'Topology Representatives' },
        { id: 5, name: 'Superfamily Representatives' },
        { id: 6, name: 's35 Representatives' }
    ],

    ECOD: [
        { id: 0, name: 'No Filter' },
        { id: 1, name: 'Different H-group' },
        { id: 2, name: 'Different T-group' },
        { id: 3, name: 'Different F-group' }
    ],
    
    Chain: [
        { id: 0, name: 'No Filter' }
    ],
    
    UploadSCOPe: [
        { id: 0, name: 'No Filter' },
    ],

    UploadCATH: [
        { id: 0, name: 'No Filter' }, 
        { id: 4, name: 'Topology Representatives' },
        { id: 5, name: 'Superfamily Representatives' },
        { id: 6, name: 's35 Representatives' }
    ],

    UploadECOD: [
        { id: 0, name: 'No Filter' },
    ],
    
    UploadChain: [
        { id: 0, name: 'No Filter' }
    ],

    getFilterType: function (id) {

        if (id == 1 || id == "SCOPe") {
            return this.SCOPe;
        }
        else if (id == 2 || id == "CATH") {
            return this.CATH;
        }
        else if (id == 3 || id == "ECOD") {
            return this.ECOD;
        }
        else {
            return this.Chain;
        }
    },
    
    getUploadFilterType: function (id) {

        if (id == 1 || id == "SCOPe") {
            return this.UploadSCOPe;
        }
        else if (id == 2 || id == "CATH") {
            return this.UploadCATH;
        }
        else if (id == 3 || id == "ECOD") {
            return this.UploadECOD;
        }
        else {
            return this.UploadChain;
        }
    }
}
