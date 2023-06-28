/*
Date: 6/28/2023
Created by: Logan Poynter

Purpose: Prevent duplicate approvals for someone who has already approved.
Table: Approval [sysapproval_approver]
When: Before
Insert: true
Update: true
Condition: current.state.changesTo(‘requested’)

Credit to SNGuru [https://servicenowguru.com/scripting/business-rules-scripting/prevent-redundant-approval-requests-servicenow/]
*/

(function executeRule(current, previous /*null when async*/){
    if(current.document_id || current.sysapproval){
        var app = new GlideRecord('sysapproval_approver');
        if(!current.document_id.nil()){
            app.addQuery('document_id', current.document_id);
        }
        else if(!current.sysapproval.nil()){
            app.addQuery('sysapproval', current.sysapproval);
        }
        app.addQuery('approver', current.approver);
        app.addQuery('state', 'approved');
        app.query();
        if(app.next()){
            current.state = 'not_required';
            current.comments = "Approval marked as 'Not Longer Required'; Approver already approved.";
        }
    }
})(current, previous);
