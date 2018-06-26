var crypto = require("/hmac-sha256.sjs");

var key = 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY'
var dateStamp = '20120215'
var regionName = 'us-east-1'
var serviceName = 'iam'

var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
var kRegion = crypto.HmacSHA256(regionName, kDate);
var kService = crypto.HmacSHA256(serviceName, kRegion);


function getSignatureKey(Crypto, key, dateStamp, regionName, serviceName) {
    var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = Crypto.HmacSHA256(regionName, kDate);
    var kService = Crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = Crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}

var json = {
"output":[
    {"kDate" : kDate.toString()},
    {"kRegion" : kRegion.toString()},
    {"kService" : kService.toString()},
    {"kSigning" : getSignatureKey(crypto, key, dateStamp, regionName, serviceName).toString()}
]
}

json;
/*
var result = crypto.HmacSHA256("A","b");

result.toString();
*/


