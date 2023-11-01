/*
Date: 10/2/2023
Created by: Logan Poynter

Purpose: Often, REQ notifications are turned off in favor of RITM notifications. One notification
that has issues is the request opened notification. This slightly modified email script will
present the same behavior as the OOB about_this_request with the addition of printing
the catalog item's variables directly in the body of the email itself.
*/


(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {
    var portalSuffix = new sn_ex_emp_fd.FoundationNotificationUtil().getPortalSuffix();
    var requestUrl = '/' + portalSuffix + '?id=ticket&table=sc_req_item&sys_id=' + current.sys_id;
    var buttonText = gs.getMessage('View request');
    //Generates primary action of view request
    var requestNotificationJs = new global.RequestNotificationUtil();
    requestNotificationJs.createNotificationPrimayAction(template, requestUrl, buttonText);

    //request details required for notification template
    var requestDetails = requestNotificationJs.getRequestItemDetails(current.sys_id, current, true);


    template.print('<div style="font-size: 15pt; line-height:30px; padding-bottom:16px"><b style="font-weight:600">About this request</b></div>');

    var showRequestPrice = false;

    var showOpenedBy = false;
    if (current.opened_by.toString() !== current.requested_for.toString()) {
        showOpenedBy = true;
    }
    var requestItemsPadding = 'padding-top:16px;';
    if (showOpenedBy || showRequestPrice) {
        template.print('<div style="padding-bottom:16px">');

        if (showOpenedBy) {
            if (requestDetails.showItemRequestedFor) {
                template.print('<div>Requested for: ' + '<b style="font-weight:600">' + current.requested_for.name + '</b></div>');
            }
            template.print('<div>Opened by: ' + '<b style="font-weight:600">' + current.opened_by.name + '</b></div>');
        }

        if (showRequestPrice) {
            var recurringPriceText = requestNotificationJs.gerRecurringPriceRollup(current.sys_id);
            template.print('<div>Total price: ' + '<b style="font-weight:600">' + current.price.getDisplayValue() + '</b><span style="font-size:14px;font-weight: 600">' + recurringPriceText + '</span></div>');
        }
        template.print('</div>');
    } else {
        requestItemsPadding = '';
    }

    var borderBottom = 'border-bottom:1px solid #DADDE2';

    template.print('<div style="padding-bottom:16px;');

    template.print('">');
    template.print('<div>Requested item number: <b style="font-weight:600">' + requestDetails.requestNumber + '</b></div>');
    template.print('<div>Catalog Item: <b style="font-weight:600">' + requestDetails.item + '</b></div>');
    for (var i = 0; i < requestDetails.variables.length; i++) {
        var variable = requestDetails.variables[i];
        template.print('<div>' + variable.label + ' <b style="font-weight:600">' + variable.value + '</b></div>');
    }
    requestNotificationJs.setPricingtoTemplate(requestDetails, template);
    template.print('</div>');

})(current, template, email, email_action, event);