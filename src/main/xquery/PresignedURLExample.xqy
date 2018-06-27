xquery version "1.0-ml";

(:
    Example taken from:
    https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
:)

declare variable $key as xs:string := "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
declare variable $date-stamp as xs:string := "20130524";
declare variable $region-name as xs:string := "us-east-1";
declare variable $service-name as xs:string := "s3";

let $kSecret-string := "AWS4" || $key

let $stringToSign := "AWS4-HMAC-SHA256
20130524T000000Z
20130524/us-east-1/s3/aws4_request
3bfa292879f6447bbcda7001decf97f4a54dc650c8942174ae0a9121cf58ad04"

let $kDate := xdmp:hmac-sha256($kSecret-string, $date-stamp)
let $kRegion := xdmp:hmac-sha256(binary { $kDate }, $region-name, "hex")
let $kService := xdmp:hmac-sha256(binary { $kRegion }, $service-name, "hex")
let $kSigning := xdmp:hmac-sha256(binary { $kService }, "aws4_request", "hex")
let $signature := xdmp:hmac-sha256(binary { $kSigning }, $stringToSign, "hex")

return
    element output {
        element kDate {$kDate},
        element kRegion {$kRegion},
        element kService {$kService},
        element kSigning {$kSigning},
        element signature {$signature}
    }

(:
  Target signature Hash:
  aeeed9bbccd4d02ee5c0109b86d86835f995330da4c265957d157751f604d404
:)