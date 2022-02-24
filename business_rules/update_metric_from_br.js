/* 
Business Rule (BR) to update an existing Metric Instance (MI)

This BR should run on before update
*/

(function executeRule(current, previous /*null when async*/) {

    var mi = new GlideRecord('metric_instance');
    var metricSysID = '7e15e6b3972101103059341e6253afed'; //Define your specific metric definiton sys_id
    mi.addQuery('id', current.sys_id);
    mi.addQuery('definition', metricSysID);
    mi.addQuery('calculation_complete', false); //we only want to see MIs that are still active
    mi.query();

    if (mi.next()) {
        mi.end = new GlideDateTime();
        mi.calculation_complete = true;
        mi.update();

        var newmi = new GlideRecord('metric_instance');
        newmi.initialize();
        newmi.definition = metricSysID;
        newmi.id = current.sys_id;
        newmi.start = new GlideDateTime();
        newmi.value = current.state.getDisplayValue();

        if (current.state.getDisplayValue() != 'Closed') { //Define whatever final state your tickets go into here
            newmi.calculation_complete = false;
            newmi.insert();
        } else {
            newmi.end = new GlideDateTime();
            //GlideDateTime.subtract must be used if in a scope app that does not allow gs.dateDiff
            duration = GlideDateTime.subtract(new GlideDateTime(current.opened_at), new GlideDateTime(newmi.end));
            newmi.duration = new GlideDateTime(duration);
            newmi.calculation_complete = true;
            newmi.insert();
        }

    }

})(current, previous);
