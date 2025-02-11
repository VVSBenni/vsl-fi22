import CryptoJS from 'crypto-js';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~ '.split('');
let savedDecryptionSet = null;
const decryptionSets = [];

function generateRandomDecryptionSet() {
    const shuffledAlphabet = [...alphabet];
    for (let i = shuffledAlphabet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAlphabet[i], shuffledAlphabet[j]] = [shuffledAlphabet[j], shuffledAlphabet[i]];
    }

    const decryptionSet = {};
    for (let i = 0; i < alphabet.length; i++) {
        decryptionSet[alphabet[i]] = shuffledAlphabet[i];
    }

    decryptionSets.push({ set: decryptionSet, name: shuffledAlphabet.join('') });
    return decryptionSet;
}

function getDecryptionSet(index = 0) {
    if (!savedDecryptionSet) {
        savedDecryptionSet = generateRandomDecryptionSet();
    }
    return decryptionSets[index]?.set || savedDecryptionSet;
}

function decryptAll(text, index = 0) {
    const decryptionSet = getDecryptionSet(index);
    let decryptedText = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        decryptedText += decryptionSet[char] || char; // Use the decryption set or keep the character as is
    }

    return decryptedText;
}

function encryptAll(text, index = 0) {
    const decryptionSet = getDecryptionSet(index);
    const encryptionSet = Object.fromEntries(Object.entries(decryptionSet).map(([key, value]) => [value, key]));
    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        encryptedText += encryptionSet[char] || char; // Use the encryption set or keep the character as is
    }

    return encryptedText;
}

function generateSHA256Hash(text) {
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
}

function generateSHA512Hash(text) {
    return CryptoJS.SHA512(text).toString(CryptoJS.enc.Hex);
}

export { alphabet, decryptAll, encryptAll, getDecryptionSet, decryptionSets, generateRandomDecryptionSet, generateSHA256Hash, generateSHA512Hash };