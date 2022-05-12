/*
Date: 5/10/2022
Created by: Logan Poynter

Purpose: Example of how to create an event from a business rule
*/

(function executeRule(current, previous /*null when async*/){
    
    //Immediately execute an event
    gs.eventQueue('event.name', current, parm1, parm2);
    //Docs: https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server_legacy/c_GlideSystemAPI#r_GS-eventQueue_S_O_S_S_S


    //Schedule an event for later
    gs.eventQueueScheduled('event.name', current, parm1, parm2, date);
    //Docs: https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server_legacy/c_GlideSystemAPI#GS-eventQueueScheduled_S_O_S_S_O

})(current, previous);