//Scirpt includes to find duplicate IMEIs on assets
//Report callable via IMEI/MEID ISONEOF javascript:duplicateIMEIs();
function duplicateIMEIs(){
    var ga = new GlideAggregate('alm_asset');
    ga.addAggregate('COUNT', 'u_imei_meid'); //Whatever your IMEI field is
    ga.addHaving('COUNT','u_imei_meid','>','1'); //Count of greater than 1. Increase based on how many occurrences you want to find
    ga.query();
    if (!ga.next()){
        return 'no duplicates'
    } else {
        var listOfDupes = new Array();
        while (ga.next()){
            listOfDupes.push(ga.getValue('u_imei_meid'));
        }
        return listOfDupes;
    }
}
