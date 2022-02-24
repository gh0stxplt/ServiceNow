//Workflow script to automatically remove user from a group based on selection from catalog item
//groups_to_remove should be replaced with the list collector or select field used on the catalog item in your environment
removeGroups();

function removeGroups(){
	var removeGrpsArray = [];
	var grpstoremove = current.variable_pool.groups_to_remove.toString();
	removeGrpsArray = grpstoremove.split(",");
	var user = current.variable_pool.requested_for;
	for (var i=0; i<removeGrpsArray.length; i++){
		var memberGR = new GlideRecord('sys_user_grmember');
		memberGR.addQuery('user', user);
		memberGR.addQuery('sys_id', removeGrpsArray[i]);
		memberGR.query();
		while (memberGR.next()){
			memberGR.deleteRecord();
		}
	}
}
