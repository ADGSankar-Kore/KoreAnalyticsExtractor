const request = require("request")
const fs = require("fs")
const jsonexport = require("jsonexport")
const config = require("./config")
/*
*To make Analytics API call - done
*/
function requestAPI(options) {
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            if(body.errors){
                return reject(body);
            }
            return resolve(body)
        })
    })
}
/*
*To process the custom tags for every object and return the stringified version of it - done
*/
function processTags(customTags){
    var userTags={};
    var sessionTags={};
    var messageTags={};
    if(customTags.userTags){
        customTags.userTags.forEach(tag=>{
            userTags[tag.name]=tag.value
        });
    }
    if(customTags.sessionTags){
        customTags.sessionTags.forEach(tag=>{
            sessionTags[tag.name]=tag.value
        });
    }
    if(customTags.messageTags){
        customTags.messageTags.forEach(tag=>{
            messageTags[tag.name]=tag.value
        });
    }
    return{
        "USERTAGS":JSON.stringify(userTags),
        "SESSIONTAGS":JSON.stringify(sessionTags),
        "MESSAGETAGS":JSON.stringify(messageTags)
    }
}
/*
*To process every record come from the API and extract the required fields mentioned in the config based on the type. -done
*/
function processData(data,type) {
    var pData = []
    var requiredFields = config.requiredFields[type];
    data.forEach(d=>{
        var row={}
        requiredFields.forEach(field=>{
            row[field.key] = (Array.isArray(d[field.value]))? d[field.value].join(" | "): d[field.value]; 
        })
        var tags=processTags(d.customTags)
        pData.push({...row,...tags});
    })
    return pData;
}
/*
*To prepare and return the options object to make Analytics API call - done
*/
function getOptions(botDetails,fromDate,toDate,type,skip,isDeveloper) {
    // var botDetails = config.botDetails;
    return {
        'method': 'POST',
        'url': `https://${botDetails.host}/api/public/bot/${botDetails.botId}/getAnalytics`,
        'headers': {
            'auth': botDetails.authToken,
            'Content-Type': 'application/json'
        },
        json: true,
        body: {
            "type": type,
            "filters": {
                "from": fromDate,//"2020-11-10T17:25:09.698Z",
                "to": toDate,//"2020-11-15T17:25:09.698Z",
                "isDeveloper": isDeveloper
            },
            "limit": 50,
            "skip": skip,
            "sort": {
                "order": "desc",
                "by": "timestamp"
            }
        }
    }
    
}
/*
*Dirver code 
*/
async function getAnalytics(botDetails,fromDate,toDate,type,fileName,isDeveloper) {
    return new Promise(async(resolve,reject)=>{
        const analytics = [];
        var isRecordsAvailable = false;
        var currentSkip = 0;
        try {
            do {
                var options=getOptions(botDetails,fromDate,toDate,type,currentSkip,isDeveloper);
                var res = await requestAPI(options);
                var pData = processData(res.result,type);
                analytics.push(...pData);
                isRecordsAvailable = res.moreAvailable;
                console.log("Type = ",type," :: Current Skip = ",currentSkip," :: IS More Records Available = ", isRecordsAvailable);
                currentSkip += 50;
            } while (isRecordsAvailable);
        }
        catch (err) {
            console.log(err)
            return reject(err)
        }
        var csv = await jsonexport(analytics);
        fs.writeFileSync(fileName, csv);
        return resolve(fileName)
    })
}
var from = config.otherDetails.from;
var to =config.otherDetails.to;
var promiseArr=[]

Object.keys(config.requiredFields).forEach(type=>{
    var fileName = `${type}_${Date.now()}.csv`
    console.log(`${type} - ${fileName}`)
    promiseArr.push(getAnalytics(config.botDetails,from,to,type,fileName,config.otherDetails.isDeveloper));
})

Promise.all(promiseArr).then((data)=>{
    console.log(`completed the task - ${data}`);
}).catch((err)=>{
    console.log(err)
})