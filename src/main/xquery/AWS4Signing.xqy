xquery version "1.0-ml";

(:
  Example taken from:
  https://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html
:)

declare variable $key as xs:string := "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY";
declare variable $date-stamp as xs:string := "20120215";
declare variable $region-name as xs:string := "us-east-1";
declare variable $service-name as xs:string := "iam";

declare function local:create-hex-string($string){
    string-join(xdmp:integer-to-hex(string-to-codepoints($string)), "")
};

let $kSecret-string := "AWS4" || $key
(: Note that local:create-hex-string is only used to ensure/confirm we have the correct hexadecimal value for $kSecret :)
let $kSecret := local:create-hex-string($kSecret-string)

let $kDate := xdmp:hmac-sha256($kSecret-string, $date-stamp)
let $kRegion := xdmp:hmac-sha256(binary { $kDate }, $region-name, "hex")
let $kService := xdmp:hmac-sha256(binary { $kRegion }, $service-name, "hex")
let $kSigning := xdmp:hmac-sha256(binary { $kService }, "aws4_request", "hex")

(: Reference:
kSecret  = '41575334774a616c725855746e46454d492f4b374d44454e472b62507852666943594558414d504c454b4559'
kDate    = '969fbb94feb542b71ede6f87fe4d5fa29c789342b0f407474670f0c2489e0a0d'
kRegion  = '69daa0209cd9c5ff5c8ced464a696fd4252e981430b10e3d3fd8e2f197d7a70c'
kService = 'f72cfd46f26bc4643f06a11eabb6c0ba18780c19a8da0c31ace671265e3c87fa'
kSigning = 'f4780e2d9f65fa895f9c67b32ce1baf0b0d8a43505a000a1a9e090d414db404d'
:)

return
    element output {
        element kSecret {$kSecret},
        element kDate {$kDate},
        element kRegion {$kRegion},
        element kService {$kService},
        element kSigning {$kSigning}
    }