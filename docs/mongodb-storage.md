# Errsole with MongoDB

### Install

Install the errsole and errsole-mongodb modules using the npm install command:

```bash
npm install errsole errsole-mongodb
```

### Configure

```javascript
// CommonJS
const errsole = require('errsole');
const ErrsoleMongoDB = require('errsole-mongodb');
```

```javascript
// ESM and TypeScript
import errsole from 'errsole';
import ErrsoleMongoDB from 'errsole-mongodb';
```

```javascript
// Insert the Errsole code snippet at the beginning of your app's main file
errsole.initialize({
  storage: new ErrsoleMongoDB('<MongoDB Connection URL>', '<Optional: Database Name>', '<Optional: MongoDB Client Options>')
});
```

#### Example

```javascript
const express = require('express');
const errsole = require('errsole');
const ErrsoleMongoDB = require('errsole-mongodb');

// Insert the Errsole code snippet at the beginning of your app's main file
errsole.initialize({
  storage: new ErrsoleMongoDB('mongodb://localhost:27017/', 'logs')
});

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
```

#### Advanced Configuration

| **Option**          	| **Type**         	| **Description**                                                                                                                                                                                                                                                                                            	|
|---------------------	|------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| storage             	| ErrsoleMongoDB   	| Required.<br>Setup MongoDB as the storage backend with connection details.                                                                                                                                                                                                                                 	|
| collectLogs         	| Array of Strings 	| Optional. The default value is ['error', 'info'].<br>By default, Errsole collects both error and info logs. If you wish to limit Errsole to collecting only error logs, you can set this option to ['error']. If you prefer Errsole not to collect any logs, simply set this option to an empty array, []. 	|
| enableConsoleOutput 	| Boolean          	| Optional. The default value is true.<br>Control whether log output is also shown in the console.                                                                                                                                                                                                           	|
| exitOnException     	| Boolean          	| Optional. The default value is true.<br>By default, Errsole will exit the process after capturing an uncaught exception. If this is not the behavior you want, you can disable it by setting exitOnException to false.                                                                                     	|
| enableDashboard     	| Boolean          	| Optional. The default value is true.<br>Enable or disable the web dashboard feature.                                                                                                                                                                                                                       	|
| port                	| Number           	| Optional. The default value is 8001.<br>Specify the network port for the web dashboard.                                                                                                                                                                                                                    	|
| path                	| String           	| Optional. The default value is '/'.<br>Define the base path for accessing the web dashboard.                                                                                                                                                                                                               	|
| appName             	| String           	| Optional. The default value is the name from package.json.<br>Specify the name of the app.                                                                                                                                                                                                                 	|
| environmentName     	| String           	| Optional. The default value is process.env.NODE_ENV.<br>Specify the deployment environment.                                                                                                                                                                                                                	|
| serverName          	| String           	| Optional. The default value is the hostname of the machine.<br>Specify the name of the server.                                                                                                                                                                                                             	|

### Web Dashboard Access

[Web Dashboard Access](/docs/web-dashboard-access.md)

### Main Documentation

[Main Documentation](/README.md)
