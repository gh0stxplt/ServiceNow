/*
Date: 5/18/2022
Created by: Logan Poynter

Purpose: Query sys_user_grmember and return a list of user id's for use in reporting
Example: Created by is one of javascript:new groupMembers().getMember('Group Name');
*/
var groupMembers = Class.create();
groupMember.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getMember: function (group) {
        var mbrs = "";
        var gr = new GlideRecord("sys_user_group");
        gr.get("name", group);

        var grmember = new GlideRecord('sys_user_grmember');
        grmember.addQuery('group', gr.sys_id);
        grmember.query();
        while (grmember.next()) {
            mbrs += grmember.user.user_name.toString();
            if (grmember.hasNext())
                mbrs += ",";

        }
        return mbrs;
    },

    type: 'groupMember'
});