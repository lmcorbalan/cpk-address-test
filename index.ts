import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
dotenvConfig({ path: resolve(__dirname, './.env') });

import CPK, { EthersAdapter } from 'contract-proxy-kit';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)
const PK = process.env.ACCOUNT_PK || ''
const wallet = new ethers.Wallet(PK, provider)

const ethLibAdapter = new EthersAdapter({ ethers, signer: wallet });

(function main() {
  return CPK.create({ ethLibAdapter, isSafeApp: false });
})().then(cpk => {
  console.log(`User address: ${wallet.address} - CPK address ${cpk.address}`)
})
