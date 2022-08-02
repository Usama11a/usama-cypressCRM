# servicePath Cypress

servicePath Cypress repository is used for storing all source code related to cypress automated tests across the servicePath applications

## Pre-requisites

1.	Download and [Install VS Code](https://code.visualstudio.com/download)
2.	Download and Install [Node JS](https://nodejs.org/en/download/)
3. Make sure to add Node js path in the environment variable if it is not already there
4.	Checkout this repository Cypress from Git to a new folder
4.	Open VS Code > navigate to File menu > Open Folder
5.	Navigate to path where “Cypress-servicePath” folder is located. Select that folder and the project “Cypress-servicePath” should be loaded in VS Code.


## Installation

Run the following commands in the correct sequence from a command line, with starting directory the location you checked out the code from this repository

1. Clean npm cache
```bash
npm cache clean
```

2. Run npm install with updates
```bash
npm install -g npm-check-updates ncu -u --force
```

*Optional steps 3-4 - this shouldn't be needed any more as node_modules is added to .gitignore*

3. Install rimraf deep deletion module
```bash
npm install rimraf -g
```

4. Remove node_modules directory using rimraf
```bash
rimraf node_modules
```

5. Finally install cypress via NPM
```bash
npm install cypress --force
```

## Running cypress tests

1. Run locally in headed mode:
```bash
node_modules\.bin\cypress
```
*open and find 'Clients/ParkPlace/All.js' and click on All.js to run all Parkplace tests for example.*

2. Run locally in headless mode:
```bash
node_modules\.bin\cypress run --spec 'cypress/integration/Clients/ParkPlace/All.js' --browser chrome
```
3.Run in cypress dashboard:
```bash
node_modules\.bin\cypress run --record --key 4e1f0fea-aabc-41e0-9464-a41d18038e84 --spec cypress/integration/Clients/ParkPlace/All.js --browser chrome --headless
```


## Contributing
Pull requests are welcome. For major changes, please open an issue in JIRA first to discuss what you would like to change.

