# Supply Chain Management
	
 	
 ------------------------		

Supply chain management on blockchain using Angular 4 + Truffle + IPFS + Ethereum


## How to use
There are 2 small parts to successfully running this project.

### Prerequisite

1. Node.js
2. IPFS
3. Truffle Framework (`npm install -g truffle` or on linux `sudo npm install -g truffle`)
4. Testrpc (`npm install -g ethereumjs-testrpc` or on linux `sudo npm install -g ethereumjs-testrpc`)

### Part 1

1. `git clone https://github.com/shekhar-shubhendu/supply-chain.git`
2. `cd suply-chain`
3. `npm install`
4. `npm install -g @angular/cli@latest`
(linux users might have to do: `sudo npm install -g @angular/cli@latest`)

### Part 2

4. Open a new terminal and start IPFS daemon with `ipfs daemon`
5. Now from inside the project directory run `node src/ipfs.js`. This will start a ipfs file upload server on port 4201.
6. Start testrpc in new terminal.
7. From inside the project directory run `truffle compile` to compile your contracts
8. And `truffle migrate` to deploy those contracts to the network
9. Now finally, start the project with `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
10. Make sure there are no errors in browser console

### Login

1. This project uses your keystore file to login to the application.
2. For now, the accounts that can login are hardcoded in `auth.service.ts` with there role. Future builds will feature a screen for proper role and account management.
3. You can find the keystore for default accounts and there password in 'keys' folder.

### URLs

1. `/login`
2. `/retailer`
3. `/distributor`
4. `/manufacturer`
5. `/supplier`

### Todo/Bugs:

1.) Fix IPFS upload and download

## Technologies & Languages Used
1. Angular4 (Typescript/Javascript)
2. Truffle (Solidity)
3. IPFS
4. Node.js
5. Express
