import { useState, useEffect } from 'react'
import './index.css'
import { decryptAll, decryptionSets, generateRandomDecryptionSet, encryptAll, generateSHA256Hash, generateSHA512Hash } from './functions/decrypt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom, faCopy, faFileImport, faUnlockAlt, faLock } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [importValue, setImportValue] = useState("");
  const [exportValue, setExportValue] = useState("");
  const [selectedSet, setSelectedSet] = useState(0);
  const [sets, setSets] = useState(decryptionSets);
  const [importSetValue, setImportSetValue] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("OWN");

  useEffect(() => {
    // Generate an initial decryption set
    generateRandomDecryptionSet();
    setSets([...decryptionSets]);
  }, []);

  function handleClick(action) {
    if (selectedMethod === "OWN") {
      if (action === "decrypt") {
        setExportValue(decryptAll(importValue, selectedSet))
      } else if (action === "encrypt") {
        setExportValue(encryptAll(importValue, selectedSet))
      }
    } else if (selectedMethod === "SHA256" || selectedMethod === "SHA512") {
      const hashFunction = selectedMethod === "SHA256" ? generateSHA256Hash : generateSHA512Hash;
      setExportValue(hashFunction(importValue));
    }
  } 

  const handleImportChange = (event) => {
    setImportValue(event.target.value);
  };

  const handleExportChange = (event) => {
    setExportValue(event.target.value);
  };

  const handleSetChange = (event) => {
    setSelectedSet(event.target.value);
  };

  const handleGenerateSet = () => {
    generateRandomDecryptionSet();
    setSets([...decryptionSets]);
  };

  const handleCopySet = () => {
    const setToCopy = sets[selectedSet];
    navigator.clipboard.writeText(JSON.stringify(setToCopy));
  };

  const handleImportSet = () => {
    try {
      const importedSet = JSON.parse(importSetValue);
      decryptionSets.push(importedSet);
      setSets([...decryptionSets]);
    } catch (error) {
      console.error("Invalid decryption set format");
    }
  };

  const handleImportSetChange = (event) => {
    setImportSetValue(event.target.value);
  };

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-900 text-white p-5'>
      <div className='flex flex-col w-full max-w-4xl space-y-5'>
        <div className='flex flex-col space-y-3'>
          <select className='w-full p-3 bg-gray-800 rounded-md' onChange={handleMethodChange}>
            <option value="OWN">OWN CRYPTION</option>
            <option value="SHA256">SHA-256</option>
            <option value="SHA512">SHA-512</option>
          </select>
        </div>
        {selectedMethod === "OWN" && (
          <div className='flex flex-col space-y-3'>
            <select className='w-full p-3 bg-gray-800 rounded-md' onChange={handleSetChange}>
              {sets.map((set, index) => (
                <option key={index} value={index}>{set.name}</option>
              ))}
            </select>
            <button className='px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 flex items-center' onClick={handleGenerateSet}>
              <FontAwesomeIcon icon={faRandom} className="mr-2" /> Generate Decryption Set
            </button>
            <button className='px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 flex items-center' onClick={handleCopySet}>
              <FontAwesomeIcon icon={faCopy} className="mr-2" /> Copy Decryption Set
            </button>
            <input className='w-full p-3 bg-gray-800 rounded-md' type='text' value={importSetValue} onChange={handleImportSetChange} placeholder='Import Decryption Set'/>
            <button className='px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center' onClick={handleImportSet}>
              <FontAwesomeIcon icon={faFileImport} className="mr-2" /> Import Decryption Set
            </button>
          </div>
        )}
        {selectedMethod === "SHA256" && (
          <div className='flex flex-col space-y-3 bg-gray-800 p-3 rounded-md'>
            <p><b>SHA-256</b> ist eine kryptografische Hashfunktion, die eine <b>256-Bit</b> lange, eindeutige Zeichenfolge erzeugt. Sie ist eine <b>Einwegfunktion</b>, was bedeutet, dass die ursprünglichen Daten nicht aus dem Hash zurückgewonnen werden können. </p>  
            <p><b>SHA-256</b> wird häufig für <b>Blockchain-Technologie</b>, <b>digitale Signaturen</b> und <b>Passwortsicherheit</b> verwendet, da sie eine hohe <b>Kollisionsresistenz</b> bietet und Manipulationen verhindert.</p>
          </div>
        )}
        {selectedMethod === "SHA512" && (
          <div className='flex flex-col space-y-3 bg-gray-800 p-3 rounded-md'>
            <p><b>SHA-512</b> ist eine kryptografische Hashfunktion aus der <b>SHA-2</b>-Familie, die eine <b>512-Bit</b> lange, eindeutige Zeichenfolge erzeugt. Sie ist eine <b>Einwegfunktion</b>, was bedeutet, dass die ursprünglichen Daten nicht aus dem Hash zurückgewonnen werden können.</p>  
            <p><b>SHA-512</b> wird häufig für <b>Datensicherheit</b>, <b>digitale Signaturen</b> und <b>Passwort-Hashing</b> verwendet, da sie eine starke <b>Kollisionsresistenz</b> bietet und gegen Brute-Force-Angriffe sehr robust ist.</p>

          </div>
        )}
        <div className='flex flex-col space-y-3'>
          <textarea className='w-full h-40 p-3 bg-gray-800 rounded-md resize-none' name='import' value={importValue} onChange={handleImportChange} placeholder='Enter text to encrypt/decrypt'/>
          <div className='flex space-x-3'>
            <button className='px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 flex items-center' onClick={() => handleClick("decrypt")}>
              <FontAwesomeIcon icon={faUnlockAlt} className="mr-2" /> Decrypt
            </button>
            <button className='px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 flex items-center' onClick={() => handleClick("encrypt")}>
              <FontAwesomeIcon icon={faLock} className="mr-2" /> Encrypt
            </button>
          </div>
        </div>
        <div className='flex flex-col space-y-3'>
          <textarea className='w-full h-40 p-3 bg-gray-800 rounded-md resize-none' name='export' disabled={true} value={exportValue} onChange={handleExportChange} placeholder='Output will appear here'/>
          <div className='flex space-x-3'>
            <button className='px-4 py-2 bg-yellow-600 rounded-md hover:bg-yellow-700 flex items-center' onClick={() => navigator.clipboard.writeText(exportValue)}>
              <FontAwesomeIcon icon={faCopy} className="mr-2" /> Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App