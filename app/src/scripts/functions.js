
var Functions = {

    scoreConverter: function (value) {
        
        if (value === '-1') {
            return 'N/A';
        }
        else {
            var formatted = numeral(value).format('0.00');
            if (formatted === 'NaN') {
                return '0.00';
            }
            else {
                return formatted;
            }
        }
    },

    getDbTypeId: function (dbType) {

        if (dbType === 'SCOPe'){
            return 1;
        }
        else if (dbType === 'CATH') {
            return 2;
        }
        else if (dbType === 'ECOD') {
            return 3;
        }
        else {
            return 4;
        }
    },

    getQueryVariable: function (name)
    {
           var query = window.location.search.substring(1);
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if(pair[0] == name){return pair[1];}
           }
           return false;
    }
}
