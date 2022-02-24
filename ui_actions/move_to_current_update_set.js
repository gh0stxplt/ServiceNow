/* 
Module: System > UI Actions
Name: Move to Current Update Set
Table: sys_update_xml
Action Name: move_to_current
List choice: checked
*/

//Get object's parent update set and set as redirect URL.
var updateSetLink = gs.getProperty('glide.servlet.uri') + 'sys_update_set.do?sys_id=' + current.getValue('update_set');
action.setRedirectURL(updateSetLink);

//Get link to the current 'customer update' record.
var updateLink = gs.getProperty('glide.servlet.uri') + 'sys_update_xml.do?sys_id=' + current.getValue('sys_id');

//Get the 'type' of the record being updated.
var type = current.getValue('type');

//Get a record containing the parent update set.
var currentUpdateSetID = gs.getPreference('sys_update_set');
var updateSetGR = new GlideRecord('sys_update_set');
updateSetGR.get(currentUpdateSetID);

//If record is already in the current update set, alert the user. Else, try to move to current update set and catch any errors.
if (current.getValue('update_set') == gs.getPreference('sys_update_set')) {
    gs.addErrorMessage('<a href="' + updateLink + '">' + type + '</a>  already exists in current update set.');
} else {
    try {
        current.setValue('update_set', currentUpdateSetID);
        current.update();
        gs.addInfoMessage('Moved <a href="' + updateLink + '">' + type + '</a> to current selected update set.');
    }
    catch(e) {
        gs.log('ERROR while moving customer updates: ' + e);
        gs.addErrorMessage('There was an error. Please review the system logs for more details.');
    }
}