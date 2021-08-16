var config = {
    "otherDetails":{
        "from": "2020-07-20T10:00:00.000Z",
        "to": "2020-07-25T10:00:00.000Z",
        "isDeveloper":false //true - if you want to include developer interactions also
    },
    "botDetails": {
        "botId": "<botId>",
        "authToken": "JWT_Token generated from client id and seret",
        "host": "<host url without https://   ex: bots.kore.ai > "
    },
    "requiredFields": {
        //UTTERANCES,INTENT,USERID,CHANNELUID,LANGUAGE,DATE & TIME,CHANNEL,TRAINED,MESSAGEID,USERTAGS,SESSIONTAGS,MESSAGETAGS  -success intent
        //UTTERANCES,USERID,CHANNELUID,LANGUAGE,DATE & TIME,CHANNEL,AMBIGUOUS,AMBIGUOUS INTENTS,TRAINED,MESSAGEID,USERTAGS,SESSIONTAGS,MESSAGETAGS -fail intent
        //UTTERANCES,TASK NAME,FAILURE POINT,TYPE OF ISSUE,USERID,CHANNELUID,LANGUAGE,DATE & TIME,CHANNEL,TRAINED,MESSAGEID,FLOW,USERTAGS,SESSIONTAGS,MESSAGETAGS - fail task
        "successintent": [
            { "key": "UTTERANCES", "value": "utterance" }, 
            { "key": "INTENT", "value": "intent" }, 
            { "key": "USERID", "value": "userId" }, 
            { "key": "CHANNELUID", "value": "channelUId" }, 
            { "key": "LANGUAGE", "value": "language" }, 
            { "key": "DATE & TIME", "value": "timestamp" }, 
            { "key": "CHANNEL", "value": "channel" }, 
            { "key": "MESSAGEID", "value": "messageId" }
        ],
        "failintent": [ 
            { "key": "UTTERANCES", "value": "utterance" }, 
            { "key": "USERID", "value": "userId" }, 
            { "key": "CHANNELUID", "value": "channelUId" }, 
            { "key": "LANGUAGE", "value": "language" }, 
            { "key": "DATE & TIME", "value": "timestamp" }, 
            { "key": "CHANNEL", "value": "channel" }, 
            { "key": "AMBIGUOUS", "value": "isAmbiguous" },
            { "key": "AMBIGUOUS INTENTS", "value": "ambiguousIntents" },
            { "key": "MESSAGEID", "value": "messageId" }
            ],
        "failtask": [
            { "key": "UTTERANCES", "value": "utterance" },
            { "key": "TASK NAME", "value": "taskName" },
            { "key": "FAILURE POINT", "value": "failurePoint" },
            { "key": "TYPE OF ISSUE", "value": "failureReason" },
            { "key": "USERID", "value": "userId" }, 
            { "key": "CHANNELUID", "value": "channelUId" },
            { "key": "LANGUAGE", "value": "language" }, 
            { "key": "DATE & TIME", "value": "timestamp" }, 
            { "key": "CHANNEL", "value": "channel" }, 
            { "key": "MESSAGEID", "value": "messageId" }
        ]
    }

}

module.exports = config;


