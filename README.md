# Supply Chain Management
	
 	
 ------------------------		

Supply chain management on blockchain using Angular 4 + Truffle + IPFS + Ethereum


## How to use
There are 2 small parts to successfully running this project.

### Part 1

1. `git clone https://github.com/shekhar-shubhendu/supply-chain.git`
2. `cd suply-chain`
3. `npm install`

### Part 2

4. Open a new terminal and start IPFS daemon with `ipfs daemon`
5. Now from inside the project directory run `node src/ipfs.js`. This will start a ipfs file upload server on port 4201.
6. Start testrpc in new terminal.
7. From inside the project directory run `truffle compile` to compile your contracts
8. And `truffle migrate` to deploy those contracts to the network
9. Now finally, start the project with `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
10. Make sure there are no errors in browser console

### Login

1.) This project uses your keystore file to login to the application.
2.) For now, the addresses that can login are hardcoded in `auth.service.ts`

### URLs

1.) `/login`
2.) `/retailer`
3.) `/distributor`
4.) `/manufacturer`
5.) `/supplier`


## Technologies & Languages Used
1. Angular4 (Typescript/Javascript)
2. Truffle (Solidity)
3. IPFS
4. Node.js
5. Express
