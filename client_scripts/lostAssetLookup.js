/*
Date: 5/18/2022
Created by: Logan Poynter

Purpose: Client script to call PopulateCIbyType script include from client side
Use case: Populating lost/stolen incident forms with "Lost/Stolen" category
Subcategory is "Phone", it locates the User's Communication Device CI; 
Subcategory of "Laptop" finds their Primary workstation CI
etc.
*/

//Name: Lost CI by Type
//Table: Incident
//UI Type: All
//Type: onChange
//Field name: Subcategory

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    //First we grab the category and check if Lost/Stolen, if so we call our script includes with params
	var category = g_form.getValue('category');
	if(category == 'lost' || category == 'stolen'){
		
		//Get our caller and CI Type values
		var caller = g_form.getValue('caller_id');
		var ciType = g_form.getValue('subcategory');
		
		//Establish a GlideAjax call to our Script Include
		var ga = new GlideAjax('global.PopulateCIbyType');
		
		//Add our params
		ga.addParam('sysparm_name', 'returnCI');
		ga.addParam('userId', caller);
		ga.addParam('ciType', ciType);
		
		//Execute our call
		ga.getXMLAnswer(getResponse);
	}
	
	function getResponse(response){
		//If no ci match is made we clear the value if any
		if (response == false){
			g_form.clearValue('cmdb_ci');
		}
		
		//Otherwise, we have our CI sys_id back in our response
		else {
			g_form.setValue('cmdb_ci', response);
		}
	}
    


}