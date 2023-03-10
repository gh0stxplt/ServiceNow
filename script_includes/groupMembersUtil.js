/*
Date: 5/18/2022
Created by: Logan Poynter

Purpose: Query sys_user_grmember and return a list of user id's

*/
var groupMembersUtil = Class.create();
groupMembersUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getMembers: function(group) {
        var mbrs = "";

        var grmember = new GlideRecord('sys_user_grmember');
        grmember.addQuery('group.name', group);
        grmember.query();
        while (grmember.next()) {
            mbrs += grmember.user.sys_id + ',';
        }

        mbrs = mbrs.substr(0, mbrs.length - 1);
        return mbrs;
    },

    getMembersMultiple: function(groups) {
        var mbrs = "";
        var groupArr = groups.split(',');

        for (var i = 0; i < groupArr.length; i++) {
            var grmember = new GlideRecord('sys_user_grmember');
            grmember.addQuery('group.name', groupArr[i]);
            grmember.query();
            while (grmember.next()) {
                mbrs += grmember.user.sys_id + ',';
            }
        }

        mbrs = mbrs.substr(0, mbrs.length - 1);
        return mbrs;
    },

    type: 'groupMembersUtil'
});
