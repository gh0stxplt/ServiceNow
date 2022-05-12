# Date: 3/26/2022
# Created by: Logan Poynter
# Purpose: A quick reference on how to utilize environment variables and oauth in a python script
# Examples of how to interact with os.environ, passing data to oauth_token.do to get our tokens 
# and using our access token in a header to perform an oauth authenticated request.

import requests
import os

#Read env var
os.environ.get('COMPUTERNAME')
#Set env var
os.environ['CLIENT_ID'] = ''
#Clear env var
os.environ.pop('CLIENT_ID')

oauthurl = "https://instance.servicenow-services.com/oauth_token.do"
data = {
    "Content_Type":"application/json",
    "grant_type":"password", 
    "client_id":"", 
    "client_secret":"",
    "username":"",
    "password":""
}
response = requests.post(oauthurl, data=data)
token = response.json()


incident_table_url = "https://instance.servicenow-services.com/api/now/table/incident?sysparm_query={encoded query}&sysparm_limit=1"
headers={"Content-Type":"application/json","Accept":"application/json", "Authorization":"Bearer {}".format(token)}
oauth_table_query = requests.get(incident_table_url, headers=headers)
print(oauth_table_query.json()["result"][0]["number"]) # Prints the incident number returned by our query