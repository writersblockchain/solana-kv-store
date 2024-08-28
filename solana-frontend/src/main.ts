import './style.css'
import { setupConnect } from './connect'
import { setupSubmit } from './submit'
import { Buffer } from 'buffer';
import { SecretNetworkClient } from 'secretjs'; 

// Polyfill Buffer for browser environment
window.Buffer = Buffer;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header>
  <h1>Secret Network for Solana</h1>
  <div id="links">
    <a href="https://uploads-ssl.webflow.com/632b43ea48475213272bcef4/632dd73d6dfc1b0cba06bbd6_Snakepath_whitepaper.pdf" target="_blank">
    <div class="card">
      Whitepaper
    </div>
    </a>
    <a href="https://github.com/SecretSaturn/SecretPath" target="_blank">
    <div class="card">
      GitHub
    </div>
    </a>
    <a href="https://docs.scrt.network/secret-network-documentation/development/ethereum-evm-developer-toolkit/connecting-evm-with-snakepath" target="_blank">
    <div class="card">
      Docs
    </div>
    </a>
  </div>
</header>
  <div>
    <h2>Sample Application: Key Value Store using Encrypted Payloads</h2>
    <div id="form">
      <form name="inputForm">
        <br>
        <label for="input1">Value</label>
        <input type="string" value="string you want to encrypt" id="input1" name="input1"/>
        <br>
        <br>
        <label for="input2">Key</label>
        <input type="string" value="key to set value" id="input2" name="input2" />
        <br>
        <div style="text-align: center;"> <!-- Centering the button -->
          <button id="submit" style="width: 150px; margin-top: 20px;">Submit</button> <!-- Submit button -->
        </div>
        <br>
        <label for="revealKey">Key to Reveal Value</label>
        <input type="string" value="key to query value" id="revealKey" name="revealKey" />
        <br>
        <div style="text-align: center;"> <!-- Centering the button -->
          <button id="reveal" style="width: 150px; margin-top: 20px;">Reveal Value</button> <!-- Reveal Value button -->
        </div>
        <br>
      </form>
    </div>
    <div id="preview" style="word-wrap: break-word;">
    </div>
    <div id="decryptedValue" class="card">
      <!-- This is where the decrypted value will be shown -->
    </div>
  </div>
`
setupSubmit(document.querySelector<HTMLButtonElement>('#submit')!)
setupConnect(document.querySelector<HTMLButtonElement>('#connect')!)

// Function to handle the decryption and display the JSON stringified result
const revealValue = async () => {
  const key = document.querySelector<HTMLInputElement>('#revealKey')!.value;

  const routing_contract = "secret1p0zdxcnllslmajawwag7wxrf83th83k7asyfqr";
  const routing_code_hash = "3d250d179d27d98c918ec4ee82d8f7e298b70748362d54093d1658fb9754635a";

  const secretjs = new SecretNetworkClient({
    url: "https://lcd.testnet.secretsaturn.net",
    chainId: "pulsar-3",
  });

  try {
    const query_tx = await secretjs.query.compute.queryContract({
      contract_address: routing_contract,
      code_hash: routing_code_hash,
      query: { retrieve_value: { key: key } },
    });
    const result = JSON.stringify(query_tx, null, 2); // Stringify the entire query_tx object
    document.querySelector<HTMLDivElement>('#decryptedValue')!.innerText = `Query Result: ${result}`;
  } catch (error) {
    document.querySelector<HTMLDivElement>('#decryptedValue')!.innerText = `Error: query unsuccessful!`;
  }
};

// Add event listener to the reveal button
document.querySelector<HTMLButtonElement>('#reveal')!.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  revealValue();
});
