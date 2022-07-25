/**
Description: 
Use this widget to present a report-style data table within a service portal.

*/


/**
Body HTML Template 
*/
<div class="panel panel-primary">
    <div class="panel-heading">
        <h2 class="panel-title">
            My Custom Report Widget
        </h2>
    </div>
    <div class="panel-body">
        <sp-widget widget="data.myReportWidget"></sp-widget>
    </div>
</div>

/**
CSS
 */
.panel .panel-heading .panel-title{
    padding: 8px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}

.panel-primary {
    border: 1px solid #dee5e7!important;
}

.panel-body{
    padding: 0 !important;
}

/**
Server Script
 */
(function () {
    //Limit our list to only 10 records at a time
    data.window_size = $sp.getValue('maximum_entries') || 10;

    //Fields we want presented from the ticket
    var fields = 'number,sys_created_on,state,requested_for';

    //Establishing a default filter
    var defaultFilter = "active=true";

    //Widget parameter object
    var widgetParams = {
        table: 'sc_req_item',
        fields: fields,
        o: 'sys_created_on',
        d: 'desc',
        filter: defaultFilter,
        window_size: data.window_size,
        view: '',
        enable_filter: true,
        headerTitle: "My Custom Report Widget",
        show_breadcrumbs: true
    };

    data.myReportWidget = $sp.getWidget('widget-data-table', widgetParams);

})();

/**
Client controller
 */
function ($scope, spUtil, $location, spAriaFocusManager) {
    $scope.$on('data_table.click', function (e, parms) {
        var p = $scope.data.page_id || 'form';
        var s = { id: p, table: parms.table, sys_id: parms.sys_id, view: 'sp' };
        var newURL = $location.search(s);
        spAriaFocusManager.navigateToLink(newURL.url());
    });
}