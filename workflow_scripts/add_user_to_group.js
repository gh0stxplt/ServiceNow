//Workflow script to automatically add user to a group based on selection from catalog item
//groups_to_add should be replaced with the list collector or select field used on the catalog item in your environment
addGroups();

function addGroups(){
	var addGrpsArray = [];
	var grpstoadd = current.variable_pool.groups_to_add.toString();
	addGrpsArray = grpstoadd.split(",");
	for (var i=0; i<addGrpsArray.length; i++){
		var memberGR = new GlideRecord('sys_user_grmember');
		memberGR.initialize();
		memberGR.user = current.variable_pool.requested_for;
		memberGR.group = addGrpsArray[i];
		memberGR.insert();
	}
}