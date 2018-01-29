# ProofOfCertificate
Blockchain Anti-Falsification Solution for Academic Diplomas and Certificates

## Contribute or Test

  ### Updates
  Current code uses 
  1. Node v8.9.3
  2. npm v4.6.1
  3. testrpc v6.0.3
  4. Truffle v4.0.5

  ### Requirement
   1. install Nodejs v.8+ and npm v.4+
   2. install local blockchain network like, testrpc or ganache gui/cli. Here "npm install -g ethereumjs-testrpc" is used.
   3. install truffle "npm install -g truffle@4.0.5"
   4. Instasl Metamask extention in chrome to run blockchain in chrome browser
   
  ### Run 
  1. $ git clone https://github.com/samueldinesh/Proof-of-Certificate-2.git
  2. $ cd ProofOfCertificate/
  3. $ npm install
  4. $ testrpc in another terminal 
  5. $ truffle migrate
  6. $ npm run dev
  
  ### Note
  1. Make Metamask to connect to testrpc
  2. testrpc account should match MetaMask account (import private key from testrpc account to metamask).
