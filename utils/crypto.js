const CryptoJS = require("crypto-js");

const AES_SECRET = "secret";

exports.encrypt = (originalText) => {
    return CryptoJS.AES.encrypt(originalText, process.env.AES_SECRET || AES_SECRET).toString();
}

exports.decrypt = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.AES_SECRET || AES_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}