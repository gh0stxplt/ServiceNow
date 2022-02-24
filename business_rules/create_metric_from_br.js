/* 
Business Rule (BR) to initalize a new Metric Instance (MI)

This BR should run on before insert as it is wanting to create the new MI upon ticket open.
*/

(function executeRule(current, previous /*null when async*/) {

    var mi = new GlideRecord('metric_instance');
    var metricSysID = ''; //Define your specific metric definiton sys_id
    
    mi.initialize();
    mi.definition = metricSysID;
    mi.id = current.sys_id;
    mi.start = current.opened_at;
    //The value is being set to the initial state on ticket creation
    //but you can set this to whatever meets your use case
    mi.value = current.state.getDisplayValue();
    mi.calculation_complete = false;
    mi.insert();

})(current, previous);
