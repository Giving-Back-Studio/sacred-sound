import CryptoJS from 'crypto-js';

export function encryptData(data){
    return CryptoJS.AES.encrypt(data, process.env.REACT_APP_CARD_ENCRYPTION_KEY).toString();
}

export function decryptData(encryptedText){
    const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.REACT_APP_CARD_ENCRYPTION_KEY);
    console.log(bytes)
    return bytes.toString(CryptoJS.enc.Utf8);
}