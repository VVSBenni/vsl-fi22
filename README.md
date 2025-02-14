# Dokumentation des Decrypt-Moduls

Dieses Modul bietet Funktionen zur Verschlüsselung und Entschlüsselung unter Verwendung eines zufällig generierten Entschlüsselungssatzes sowie Funktionen zur Generierung von SHA256- und SHA512-Hashes.

## Funktionen

### `generateRandomDecryptionSet()`
Generiert einen zufälligen Entschlüsselungssatz durch Mischen des Alphabets.

### `getDecryptionSet(index = 0)`
Gibt den Entschlüsselungssatz am angegebenen Index zurück. Wenn kein Entschlüsselungssatz existiert, wird ein neuer generiert.

### `decryptAll(text, index = 0)`
Entschlüsselt den angegebenen Text unter Verwendung des Entschlüsselungssatzes am angegebenen Index.

### `encryptAll(text, index = 0)`
Verschlüsselt den angegebenen Text unter Verwendung des Entschlüsselungssatzes am angegebenen Index.

### `generateSHA256Hash(text)`
Generiert einen SHA256-Hash des angegebenen Textes.

### `generateSHA512Hash(text)`
Generiert einen SHA512-Hash des angegebenen Textes.

## Konstanten

### `alphabet`
Ein Array, das die im Entschlüsselungssatz verwendeten Zeichen enthält.

### `decryptionSets`
Ein Array, das alle generierten Entschlüsselungssätze enthält.

## Verwendung

```javascript
import { decryptAll, encryptAll, generateSHA256Hash, generateSHA512Hash } from './src/functions/decrypt';

// Einen Text verschlüsseln
const encryptedText = encryptAll('Hallo Welt');
console.log(encryptedText);

// Einen Text entschlüsseln
const decryptedText = decryptAll(encryptedText);
console.log(decryptedText);

// SHA256-Hash generieren
const sha256Hash = generateSHA256Hash('Hallo Welt');
console.log(sha256Hash);

// SHA512-Hash generieren
const sha512Hash = generateSHA512Hash('Hallo Welt');
console.log(sha512Hash);
```