'use strict';

/*
    Example taken from:
    https://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html

    Target Hash (signature) should be: aeeed9bbccd4d02ee5c0109b86d86835f995330da4c265957d157751f604d404
 */

var key = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
var dateStamp = '20130524';
var regionName = 'us-east-1';
var serviceName = 's3';

var kDate = xdmp.hmacSha256("AWS4" + key, dateStamp);

var stringToSign = `AWS4-HMAC-SHA256
20130524T000000Z
20130524/us-east-1/s3/aws4_request
3bfa292879f6447bbcda7001decf97f4a54dc650c8942174ae0a9121cf58ad04`;

var kRegionNode = new NodeBuilder();
var kRegionNodeBinary = kRegionNode.addBinary( kDate ).toNode();
var kRegion = xdmp.hmacSha256(kRegionNodeBinary, regionName);

var kServiceNode = new NodeBuilder();
var kServiceNodeBinary = kServiceNode.addBinary( kRegion ).toNode();
var kService = xdmp.hmacSha256(kServiceNodeBinary, serviceName);

var kSigningNode = new NodeBuilder();
var kSigningNodeBinary = kSigningNode.addBinary( kService ).toNode();
var kSigning = xdmp.hmacSha256(kSigningNodeBinary, "aws4_request");

var kSignatureNode = new NodeBuilder();
var kSignatureNodeBinary = kSignatureNode.addBinary( kSigning ).toNode();
var signature = xdmp.hmacSha256(kSignatureNodeBinary, stringToSign);


var json = {
    "output":[
        {"kDate" : kDate},
        {"kRegion" : kRegion},
        {"kService" : kService},
        {"kSigning" : kSigning},
        {"signature" : signature}
    ]
};

json;
