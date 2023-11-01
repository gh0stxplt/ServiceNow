/*
Date: 10/28/2023
Created by: Logan Poynter

Purpose: This fix script can be used to restart a Flow Designer flow 
using the same values of the origianl submission for multiple items. 


Use case: An item published through catalog builder was moved to a production
instance but did not carry over the step based fulfillment steps. You notice
there are already a handful of item submissions stuck without fulfillment actions.

You make the necessary changes and run this fix script with the appropriate
encoded query to restart the flow without the need to resubmit. 
*/

var grScReqItem = new GlideRecord('sc_req_item');
grScReqItem.addEncodedQuery("{encoded query}");
grScReqItem.orderBy('sys_created_on');
grScReqItem.query();
gs.info('Found ' + grScReqItem.getRowCount());
while (grScReqItem.next()) {
  gs.info('Restarting flow against ' + grScReqItem.number);
  try {
    var flow = grScReqItem.cat_item.flow_designer_flow;
    var flowName = flow.sys_scope.scope + "." + flow.internal_name;
    var inputs = {};
    inputs['request_item'] = grScReqItem; // GlideRecord of table: sc_req_item
    inputs['table_name'] = 'sc_req_item';

    var contextId = sn_fd.FlowAPI.startFlow(flowName, inputs);

  } catch (ex) {
    var message = ex.getMessage();
    gs.error(message);
  }
}