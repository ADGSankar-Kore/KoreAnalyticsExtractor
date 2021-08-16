This code will extract the Analytics reports of a bot.
It creates CSV reports of
1.Intent found
2.Intent not found and 
3.Failed task

you need to mention the bot details in the config file
1.botId,
2.authToken generaed from client id and client secret (Should enable the metrics API scope for the bot)
3.host(ex: bots.kore.ai)
4.from
5.to
6.isDeveloper

You can also get performance tab metrics using this script.
All you need to do is by adding a an object to the "requiredFields" in config file.

You will get output as csv files and the filenames will be displayed at the start of the script

This is built using Metrics API  of Kore
https://developer.kore.ai/docs/bots/api-guide/get-analytics-api/
You can customize the metrics API call in the getAnalytics.js file

Issues found as of now
----------------------------------------
1.facing one issue with the API call - getting 400 error and raised a internal ticket

Future enhancements
----------------------------------------
1.Adding a retry mechanism in case of any failures