import './style.css'
import { setupConnect } from './connect'
import { setupSubmit } from './submit'
import { Buffer } from 'buffer';

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
      <button id="submit">Submit</button>
      <form name="inputForm">
      <br>
      <label for="input1">Value</label>
      <input type="string" value="string you want to encrypt" id="input1" name="input1"/>
      <br>
      <br>
      <label for="input2">Key</label>
      <input type="string" value="key to query your encrypted value" id="input2" name="input2" />
      <br>

    </div>
    <div id="preview" style="word-wrap: break-word;">
    </div>
    <div class="card">
    </div>
  </div>
`
setupSubmit(document.querySelector<HTMLButtonElement>('#submit')!)
setupConnect(document.querySelector<HTMLButtonElement>('#connect')!)