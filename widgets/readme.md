# Widgets and their descriptions
### [Related HR Services](https://github.com/gh0stxplt/ServiceNow/blob/main/widgets/related_hr_services.xml)
Widget to present related HR Services against an HR Knowledge Article. "Open a case" button is present and allows for opening a general HR Case and will tag the article viewed when the button was clicked.

Changes to make: 
- Server Script : line 23 : {catalog sys_id} should be the service catalog to query HR Service items
- Server Script : line 46 : {default assignment group} should be the assignment group you want the generic case assigned to when Open a case is clicked.
- Server Script : line 46 : {HR Knowledge Base} should be the sys_id of the HR Knowledge base to identify HR articles.
---
