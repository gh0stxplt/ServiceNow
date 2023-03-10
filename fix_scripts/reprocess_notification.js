/*
*   Fix script to reprocess an email in the event the conditions were 
*   invalid and the notification record is triggered via insert/update.
*
*   This creates a record directly in sysevent table subsequently processing an email.
*/
var eventGr = new GlideRecord('sysevent');
eventGr.initialize();
eventGr.name = "notification_engine.process";
eventGr.parm1 = ""; //Notification sys_id
eventGr.instance = ""; //Record sys_id
eventGr.table = ""; // Record Table
eventGr.insert();