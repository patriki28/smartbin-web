import CryptoJS from 'crypto-js';

export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, import.meta.env.VITE_ENCRYPTION_KEY).toString();
};

export const decrypt = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
