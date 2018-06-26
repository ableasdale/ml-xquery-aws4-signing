'use strict';

/* Reference Values:
kSecret  = '41575334774a616c725855746e46454d492f4b374d44454e472b62507852666943594558414d504c454b4559'
kDate    = '969fbb94feb542b71ede6f87fe4d5fa29c789342b0f407474670f0c2489e0a0d'
kRegion  = '69daa0209cd9c5ff5c8ced464a696fd4252e981430b10e3d3fd8e2f197d7a70c'
kService = 'f72cfd46f26bc4643f06a11eabb6c0ba18780c19a8da0c31ace671265e3c87fa'
kSigning = 'f4780e2d9f65fa895f9c67b32ce1baf0b0d8a43505a000a1a9e090d414db404d' */

var key = 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY';
var dateStamp = '20120215';
var regionName = 'us-east-1';
var serviceName = 'iam';

var kDate = xdmp.hmacSha256("AWS4" + key, dateStamp);

var kRegionNode = new NodeBuilder();
var kRegionNodeBinary = kRegionNode.addBinary( kDate ).toNode();
var kRegion = xdmp.hmacSha256(kRegionNodeBinary, regionName);

var kServiceNode = new NodeBuilder();
var kServiceNodeBinary = kServiceNode.addBinary( kRegion ).toNode();
var kService = xdmp.hmacSha256(kServiceNodeBinary, serviceName);

var kSigningNode = new NodeBuilder();
var kSigningNodeBinary = kSigningNode.addBinary( kService ).toNode();
var kSigning = xdmp.hmacSha256(kSigningNodeBinary, "aws4_request");

var json = {
    "output":[
        {"kDate" : kDate},
        {"kRegion" : kRegion},
        {"kService" : kService},
        {"kSigning" : kSigning}
    ]
};

json;
