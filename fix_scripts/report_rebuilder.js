/*
Date: 4/18/2022
Created by: Logan Poynter

Purpose: If you have deleted a report without saving XML but have the table and filter, 
create a new report, populate the sys_id, table, and filter into this script, then run.
*/
var gr = new GlideRecord('sys_report');
gr.addQuery('sys_id', 'report_sys_id');
gr.query();
while (gr.next()) {
    gr.table = '';
    gr.filter = '';
    gr.update();
}