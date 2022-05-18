/*
Date: 5/18/2022
Created by: Logan Poynter

Purpose: Script include to lookup a CI record based on the provided user and CI type. 
Use case: Populating lost/stolen incident forms with "Lost/Stolen" category
Subcategory of "Phone" locates the User's Communication Device CI; 
Subcategory of "Laptop" locates the User's Primary Workstation CI
etc.
*/

//Name: PopulateCIbyType
//Client callable = True
var PopulateCIbyType = Class.create();
PopulateCIbyType.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    returnCI: function () {
        //Collect our params passed from the client script
        var user = this.getParameter('userId');
        var ci = this.getParameter('ciType');

        //Establish our switch statement - note the use of String
        //ciType comes in as an Object type so we need to make it a string for use in our cases
        switch (String(ci)) {
            //Case matching for phone type
            case "phone":
                var phoneCI = new GlideRecord('cmdb_ci_comm');
                phoneCI.addEncodedQuery('assigned_to.sys_id=' + user);
                phoneCI.query();
                if (phoneCI.next()) {
                    return phoneCI.sys_id;
                } else {
                    return false;
                }

            //Case matching for laptop type.
            case "laptop":
                var laptopCI = new GlideRecord('cmdb_ci_computer');
                laptopCI.addEncodedQuery('asset.asset_function=primary^assigned_to.sys_id=' + user);
                laptopCI.query();
                if (laptopCI.next()) {
                    return laptopCI.sys_id;
                } else {
                    return false;
                }

            //Create new cases for other asset types you need to track for
        }

    },
    type: 'PopulateCIbyType'
});