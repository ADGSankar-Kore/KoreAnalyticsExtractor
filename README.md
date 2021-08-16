Script to extract Analyze metric reports from Kore platform
------------------------------------------------------------
This code will extract the Analytics reports of a bot.<br />
It creates CSV reports of<br />
1.Intent found<br />
2.Intent not found and<br /> 
3.Failed task<br />

you need to mention the bot details in the config file<br />
1.botId,<br />
2.authToken generaed from client id and client secret (Should enable the metrics API scope for the bot)<br />
3.host(ex: bots.kore.ai)<br />
4.from<br />
5.to<br />
6.isDeveloper<br />

You can also get performance tab metrics using this script.<br />
All you need to do is by adding a an object to the "requiredFields" in config file.<br />

You will get output as csv files and the filenames will be displayed at the start of the script<br />

This is built using Metrics API  of Kore<br />
https://developer.kore.ai/docs/bots/api-guide/get-analytics-api/<br />
You can customize the metrics API call in the getAnalytics.js file<br />

Issues found as of now
----------------------------------------
1.facing one issue with the API call - getting 400 error and raised a internal ticket

Future enhancements
----------------------------------------
1.Adding a retry mechanism in case of any failures