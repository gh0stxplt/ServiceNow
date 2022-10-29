/*
[0:00:11.280] Script completed in scope global: script
*/

//Push messages:
pushMessages();
function pushMessages() {
    var gr = new GlideRecord('sys_push_notif_msg');
    gr.addEncodedQuery('push_app=<classic sys_id>');
    gr.query();
    while (gr.next()) {
        gr.push_app = '<request sys_id>';
        gr.update();
    }
    pushMessageContent();
}

function pushMessageContent() {
    //Push message contents:
    var gr = new GlideRecord('sys_push_notif_msg_content');
    gr.addEncodedQuery('push_app=<classic sys_id>');
    gr.query();
    while (gr.next()) {
        gr.push_app = '<request sys_id>';
        gr.update();
    }
    defaultRegistrations();
}


function defaultRegistrations() {
    //Default registrations:
    var gr = new GlideRecord('sys_push_notif_default_reg');
    gr.addEncodedQuery('sys_push_application_id=<classic sys_id>');
    gr.query();
    while (gr.next()) {
        gr.sys_push_application_id = '<request sys_id>';
        gr.update();
    }
}


/*
Update "Generic Record Payload" with the following JSON to create a linkable notification to open target record: 

(function buildJSON( current, message, attributes) {

    var deepLinkGenerator = new global.MobileDeepLinkGenerator("Request");
    var link;
    //If our record is an incident then open our My Request - Incident screen
    if (current.getTableName() == 'incident') {
        link = deepLinkGenerator.getFormScreenLink("<sys_id of My Request - Incident screen>", 'incident', current.getValue("sys_id"));
    }
    //If our record is a REQ then open our list screen -- this can be modified to lookup the RITM and then link to My Request - RITM Item View screen
    else if (current.getTableName() == 'sc_request') {
        link = deepLinkGenerator.getFormScreenLink("<sys_id of My Requests - My Request List Screen>", 'sc_request', current.getValue("sys_id"));
    }

    var json = {
        "Link": link,
    };

    return json;

})(current, message, attributes);

*/