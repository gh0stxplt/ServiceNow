//Workflow script to automatically add user to a group based on selection from catalog item
//groups_to_add should be replaced with the list collector or select field used on the catalog item in your environment
addGroups();

function addGroups(){
	var grpsToAdd = current.variable_pool.list_collector_variable.toString();
	grpsArray = grpsToAdd.split(",");
	for (var i=0; i<grpsArray.length; i++){
		var memberGR = new GlideRecord('sys_user_grmember');
		memberGR.initialize();
		memberGR.user = current.variable_pool.requested_for;
		memberGR.group = grpsArray[i];
		memberGR.insert();
	}
}
