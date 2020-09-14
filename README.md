# Conflux Studio

Conflux Studio is an integrated development environment (IDE), making developing [Conflux](https://confluxnetwork.org/) smart contracts faster and easier. 

![](./screenshots/compile.png)

English | [简体中文](https://github.com/ObsidianLabs/ConfluxStudio/blob/master/README-CN.md)

## Install

### Download

Download Conflux Studio install-package in [Github Release](https://github.com/ObsidianLabs/ConfluxStudio/releases) according to the computer system type (.dmg/.zip for macOS, .AppImage for Linux, .exe for Windows).

### Install

- **macOS**: Double click to open `ConfluxStudio-x.x.x.dmg` and drag `Conflux Studio` to the application folder.
- **Linux**: Double-click to open `ConfluxStudio-x.x.x.AppImage`, select *Properties* => *Permissions* => *Execute*, and tick the *Allow executing file as progrom* option. Close the properties window and double-click to open the application (different Linux distributions may have different installation methods).
- **Windows**: Double click to run the ConfluxStudio-x.x.x.exe.

## Tutorial

Learn how to use Conflux Studio to completely develop a token DApp in the [Conflux DApp Tutorial](https://github.com/ObsidianLabs/conflux-dapp-tutorial).

## Features

### Preparation

When Conflux Studio is properly installed and started for the first time, users will see a welcome page, where the dependencies for Conflux are displayed, including Docker, Conflux Node and Conflux Truffle.

<p align="center">
  <img src="./screenshots/welcome.png" width="720px">
</p>

- [**Docker**](https://www.docker.com/) is used to to start the Conflux Node and compile projects in Conflux Studio. If Docker is not installed yet, users can click the *Install Docker* button to visit the official Docker website and download and install it.
- [**Conflux Node**](https://github.com/Conflux-Chain/conflux-rust) is the Conflux node image officially provided by Conflux. Conflux Studio uses the image to run the Conflux node and compile projects.
- [**Conflux Truffle**](https://github.com/Conflux-Chain/conflux-truffle) is a Conflux version of truffle used to create and compile projects.

When all the dependencies are properly installed and run, the gray *Skip* button will change into a green *Get Started* button. Click the button to enter the main interface of Conflux Studio.

### Create Keypairs

After entering the main interface, users need to create some keypairs by opening the keypair manager by clicking the key icon at the bottom left on any interface of Conflux Studio.

<p align="center">
  <img src="./screenshots/keypairs.png" width="480px">
</p>

Users can create, import and manage keypairs in the keypair manager. When creating and editing a keypair, users can set an alias for the keypair to facilitate identification in later use. Besides storing and managing keypairs, the keypair manager will also provide a genesis address for the genesis block. When creating a new Conflux node instance, all addresses in the keypair manager will be regarded as genesis addresses, and each address will get a total of 10,000 initial CFX tokens.

**Before the following steps, users need to create some keypairs in the key manager as the genesis address for creating node instances.**

### Start the Node

Click the *Network* tab at the top to switch the main interface to the network manager. In the network manager, users can manage Conflux node versions and node instances, including downloading and deleting Conflux node versions, and creating, deleting and running node instances in line with different versions.

Click the *New Instance* button in the upper right corner of the main interface to open the pop-up window for creating a new instance. Fill in the instance name and select the appropriate Conflux version, and click the *Create* button to complete the creation of a node instance.

<p align="center">
  <img src="./screenshots/new_instance.png" width="720px">
</p>

When a node instance is created, the instance list will show the newly created instance. Click the green *Start* button of the instance to start the Conflux node. After starting, users can check the node running log in the log viewer below.

<p align="center">
  <img src="./screenshots/node_log.png" width="720px">
</p>

### Block Explorer

After the node is started, click the *Explorer* tab at the top to switch the main interface to the block explorer. In the block explorer, users can query the information of a given address. This module is still under development, so users can only check the balance in the explorer currently.

Copy the address generated from the keypair manager, paste the address in the address bar and click Enter, then the balance of the address will be visible.

<p align="center">
  <img src="./screenshots/explorer.png" width="720px">
</p>

### Create Smart Contract Projects


Click the *Project* tab at the top to switch the main interface to the project manager. Click the *New* button in the upper right corner of the page to open the Create a New Project pop-up window, enter the project name and select an appropriate template. Currently Conflux Studio provides two templates:

- `coin`：the coin smart contract provided by the Conflux instance
- `[Truffle] metacoin`：a contract created using Conflux Truffle; the project cannot be deployed to the Conflux node at present

<p align="center">
  <img src="./screenshots/create_project.png" width="720px">
</p>

After the project is created, the main interface will switch to the project editor. The project editor consists of several commonly used development modules, including a file browser, code editor, toolbar, log viewer, etc.

### Compile Smart Contract Projects

Click the compile button (hammer-shaped) on the toolbar, Conflux Studio will compile the project, and you can view the compilation result through the log viewer below. After compilation, a json file will be generated in the `build` folder under the project directory.

<p align="center">
  <img src="./screenshots/compile.png" width="720px">
</p>

### Deploy Smart Contract Project

Click the deploy button (boat-shaped) on the toolbar to open the *Deploy* modal. You can enter constructor parameters, signer, gas limit and gas price for the deployment.

<p align="center">
  <img src="./screenshots/deploy_parameters.png" width="720px">
</p>

Click the *Deploy* button, Conflux Studio will deploy the project, and the deployment result will be displayed in a pop-up window.

<p align="center">
  <img src="./screenshots/deploy.png" width="720px">
</p>

### Call the Contract

After successfully deploying the smart contract, click the blue *contract* button in the pop-up window, the main interface will switch to the contract explorer, and Conflux Studio will automatically open the smart contract just deployed.

The contract explorer interface includes two parts:

- On the left is the calling method of the contract. Click the blue button in the upper left of the left column, the drop-down box displays the methods defined by the current contract. Users can click the method name to select the calling method.
- On the right is the data reading of the contract. Click the blue button in the upper left of the right column,  the drop-down box shows the data table of the current contract. Users can click the table name to view the data in different tables.

Conflux Studio will automatically read the functions in the contract ABI and generate a parameter table for each function. Select the function to be called, enter the parameters, select the signer (the signer should be an existing address in the keypair manager; the read operation does not need to be selected), and click the run button to call the contract. The call result (success or failure) will be displayed in the result viewer below.

<p align="center">
  <img src="./screenshots/contract.png" width="720px">
</p>

Next, create coins using the deployed contract. Select the *mint* method, enter the *receiver* address (which can be copied from the keypair manager) and an appropriate amount in the *Parameters* part, enter the genesis address in the *Authorization* part, and click the execution button above. After completing the transaction, users can see the result of successful execution in the *Result* viewer in the lower left column. Now we have created new coins.

In the *balance* table on the right, enter the *receiver* address just filled in in the Parameters Part, click the execution button, and users can see the total number of coins minted just now.

<p align="center">
  <img src="./screenshots/mint.png" width="720px">
</p>
