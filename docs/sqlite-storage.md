# Errsole with SQLite

SQLite stores databases as files, so your app logs will be stored in a file on your server.

### 1. Install the modules

Run the following command to install Errsole and the SQLite storage module in your Node.js project:

```bash
npm install errsole errsole-sqlite
```

### 2. Configure the logger

Create a separate `logger.js` file to initialize and export the Errsole logger, so that you can use it across your project:

#### CommonJS

```javascript
const errsole = require('errsole');
const ErrsoleSQLite = require('errsole-sqlite');

errsole.initialize({
  storage: new ErrsoleSQLite('path/to/database.sqlite'),
  appName: 'your-app-name'
});

module.exports = errsole;
```

#### ESM and TypeScript

```javascript
import errsole from 'errsole';
import ErrsoleSQLite from 'errsole-sqlite';

errsole.initialize({
  storage: new ErrsoleSQLite('path/to/database.sqlite'),
  appName: 'your-app-name'
});

export default errsole;
```

#### Example

Here is a full example that stores logs in the temporary directory:

```javascript
import errsole from 'errsole';
import ErrsoleSQLite from 'errsole-sqlite';
import os from 'os';
import path from 'path';

const logFile = path.join(os.tmpdir(), 'helloworld.log.sqlite');

errsole.initialize({
  storage: new ErrsoleSQLite(logFile),
  appName: 'helloworld'
});

export default errsole;
```

### 3. Use the logger in your app code

To start logging, include the logger in your app code. Here is an example using Express:

```javascript
import express from 'express';
import errsole from './logger.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  errsole.log(`Hello World app is listening on port ${port}`);
});
```

After completing the setup, start your app and access the Errsole Web Dashboard to view and manage your logs:
* Local Development: Open your web browser and go to `http://localhost:8001/`
* Remote Deployment: Replace with your server IP or domain:
```
http://your-server-ip:8001/
http://your-domain:8001/
```

### 4. Configure NGINX

If your app is behind NGINX, you can configure access to the Errsole Web Dashboard by adding the following lines to your NGINX configuration file:

```
location = /your-app-name/logs {
  return 301 /your-app-name/logs/;
}
location /your-app-name/logs/ {
  proxy_pass http://localhost:8001/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
}
```

**Note:** Replace `/your-app-name/logs` and `/your-app-name/logs/` with the desired URL path where you want the log viewer to be accessible.

After updating the configuration, reload NGINX to apply the changes:

```
sudo nginx -s reload
```

You can now access the Errsole Web Dashboard through your domain:

* For HTTP: `http://your-domain/your-app-name/logs/`
* For HTTPS: `https://your-domain/your-app-name/logs/`

**Note:** Replace `/your-app-name/logs/` in the URLs above to match the path you configured in NGINX.

## Advanced Configuration

### Configuration Options

| **Option**          	| **Type**                                                                                                                                                                           	| **Description**                                                                                                                                                                                                               	|
|---------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| storage             	| [ErrsoleSQLite](/docs/sqlite-storage.md)<br>[ErrsoleMySQL](/docs/mysql-storage.md)<br>[ErrsolePostgres](/docs/postgresql-storage.md)<br>[ErrsoleMongoDB](/docs/mongodb-storage.md) 	| **Required.** Specify the storage backend along with connection details.                                                                                                                                                      	|
| exitOnException     	| boolean                                                                                                                                                                            	| **Optional.** Default: `true`. By default, Errsole exits the process after capturing an uncaught exception. To disable this behavior, set exitOnException to `false`.                                                         	|
| collectLogs         	| string[]                                                                                                                                                                           	| **Optional.** Default: `['error', 'info']`. By default, Errsole collects both error and info logs. To collect only error logs, set this to `['error']`. To disable log collection entirely, set this to an empty array, `[]`. 	|
| enableConsoleOutput 	| boolean                                                                                                                                                                            	| **Optional.** Control whether log output is shown in the console.                                                                                                                                                             	|
| enableDashboard     	| boolean                                                                                                                                                                            	| **Optional.** Default: `true`. Enable or disable the web dashboard feature.                                                                                                                                                   	|
| port                	| number                                                                                                                                                                             	| **Optional.** Default: `8001`. Specify the network port for the web dashboard.                                                                                                                                                	|
| path                	| string                                                                                                                                                                             	| **Optional.** Default: `/`. Define the base path for accessing the web dashboard.                                                                                                                                             	|
| appName             	| string                                                                                                                                                                             	| **Optional.** Specify the name of the app.                                                                                                                                                                                    	|
| environmentName     	| string                                                                                                                                                                             	| **Optional.** Default: `process.env.NODE_ENV`. Specify the deployment environment.                                                                                                                                            	|
| serverName          	| string                                                                                                                                                                             	| **Optional.** Default: the hostname of the machine. Specify the name of the server.                                                                                                                                           	|

#### Example

```javascript
errsole.initialize({
  storage: new ErrsoleSQLite(logFile),
  exitOnException: true,
  collectLogs: ['error', 'info'],
  enableConsoleOutput: true,
  enableDashboard: true,
  port: 8001,
  path: '/',
  appName: 'your-app-name',
  environmentName: 'your-environment-name',
  serverName: 'your-server-name'
});
```

### Email Integration (For Critical Error Notifications)

| **Option**                    	| **Type** 	| **Description**                                                          	|
|-------------------------------	|----------	|--------------------------------------------------------------------------	|
| integrations.email            	| Object   	| **Optional.** SMTP configuration object for sending email notifications. 	|
| integrations.email.host       	| string   	| **Required.** SMTP host or IP address.                                   	|
| integrations.email.port       	| number   	| **Required.** SMTP port number.                                          	|
| integrations.email.username   	| string   	| **Required.** SMTP username.                                             	|
| integrations.email.password   	| string   	| **Required.** SMTP password.                                             	|
| integrations.email.sender     	| string   	| **Required.** Email address from which notifications are sent.           	|
| integrations.email.recipients 	| string[] 	| **Required.** List of email addresses to receive notifications.          	|

#### Example

```javascript
errsole.initialize({
  storage: new ErrsoleSQLite(logFile),
  appName: 'your-app-name',
  integrations: {
    email: {
      host: 'smtp.example.com',
      port: 587,
      username: 'your-smtp-username',
      password: 'your-smtp-password',
      sender: 'notifications@example.com',
      recipients: ['dev1@example.com', 'dev2@example.com']
    }
  }
});
```

**Note:** You can configure the SMTP email settings either in the code or directly in the Errsole Web Dashboard.

### Slack Integration (For Critical Error Notifications)

| **Option**             	| **Type** 	| **Description**                                            	|
|------------------------	|----------	|------------------------------------------------------------	|
| integrations.slack     	| Object   	| **Optional.** Slack configuration object.                  	|
| integrations.slack.url 	| string   	| **Required.** Slack Webhook URL for sending notifications. 	|

#### Example

```javascript
errsole.initialize({
  storage: new ErrsoleSQLite(logFile),
  appName: 'your-app-name',
  integrations: {
    slack: {
      url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'
    }
  }
});
```

**Note:** You can configure the Slack Webhook URL either in the code or directly in the Errsole Web Dashboard.

## Advanced Logging Functions

Errsole automatically collects all logs from the Node.js console. Additionally, it provides advanced logging functions that support multiple log levels. [Read More](/docs/advanced-logging-functions.md)

```javascript
errsole.log('Logging a message');
errsole.alert('Alert! Something critical happened');
errsole.error(new Error('An error occurred'));
errsole.warn('This is a warning message');
errsole.debug('Debugging information');
errsole.meta({ reqBody: req.body, queryResults: results }).error(err);
```

## Errsole Proxy Middleware (Optional)

To integrate the Errsole Web Dashboard as a route within your main app, use the Errsole Proxy Middleware. This middleware maps a specified route in your app to the Errsole Web Dashboard. [Read More](/docs/proxy-middleware.md)

## Main Documentation

[Main Documentation](/README.md)
