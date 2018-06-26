import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;


public class AWS4Signing {

    private static final Logger LOG = LoggerFactory.getLogger(AWS4Signing.class);

    static byte[] HmacSHA256(String data, byte[] key) throws Exception {
        String algorithm = "HmacSHA256";
        Mac mac = Mac.getInstance(algorithm);
        mac.init(new SecretKeySpec(key, algorithm));
        return mac.doFinal(data.getBytes("UTF8"));
    }

    static byte[] getSignatureKey(String key, String dateStamp, String regionName, String serviceName) throws Exception {
        byte[] kSecret = ("AWS4" + key).getBytes("UTF8");
        byte[] kDate = HmacSHA256(dateStamp, kSecret);
        byte[] kRegion = HmacSHA256(regionName, kDate);
        byte[] kService = HmacSHA256(serviceName, kRegion);
        byte[] kSigning = HmacSHA256("aws4_request", kService);
        return kSigning;
    }

    public static void main(String[] args) throws Exception {

        String key = "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY";
        String dateStamp = "20120215";
        String regionName = "us-east-1";
        String serviceName = "iam";

        LOG.info("Reference:\nkSecret  = '41575334774a616c725855746e46454d492f4b374d44454e472b62507852666943594558414d504c454b4559'\n" +
                "kDate    = '969fbb94feb542b71ede6f87fe4d5fa29c789342b0f407474670f0c2489e0a0d'\n" +
                "kRegion  = '69daa0209cd9c5ff5c8ced464a696fd4252e981430b10e3d3fd8e2f197d7a70c'\n" +
                "kService = 'f72cfd46f26bc4643f06a11eabb6c0ba18780c19a8da0c31ace671265e3c87fa'\n" +
                "kSigning = 'f4780e2d9f65fa895f9c67b32ce1baf0b0d8a43505a000a1a9e090d414db404d'");
        LOG.info("----------------");

        byte[] kSecret = ("AWS4" + key).getBytes("UTF8");
        byte[] kDate = HmacSHA256(dateStamp, kSecret);
        byte[] kRegion = HmacSHA256(regionName, kDate);

        LOG.info("kSecret = " + DatatypeConverter.printHexBinary(kSecret));
        LOG.info("kDate = " + DatatypeConverter.printHexBinary(kDate));
        LOG.info("kRegion = " + DatatypeConverter.printHexBinary(kRegion));
        LOG.info("kService = " + DatatypeConverter.printHexBinary(HmacSHA256(serviceName, kRegion)));
        LOG.info("kSigning = " + DatatypeConverter.printHexBinary(getSignatureKey(key, dateStamp, regionName, serviceName)));

    }
}
