const Jsonapi = require('../utils/jsonapiUtil');
const NPMUpdates = require('../utils/npmUpdates');
const { getStorageConnection } = require('../storageConnection');
const packageJson = require('../../../../package.json');
const helpers = require('../utils/helpers');
const Alerts = require('../utils/alerts');

exports.checkUpdates = async (req, res) => {
  try {
    const errsoleLatestVersion = await NPMUpdates.fetchLatestVersion('errsole');
    const storageConnection = getStorageConnection();
    const storageLatestVersion = await NPMUpdates.fetchLatestVersion(
      storageConnection.name
    );
    const data = {
      name: packageJson.name,
      version: packageJson.version,
      latest_version: errsoleLatestVersion,
      storage_name: storageConnection.name,
      storage_version: storageConnection.version,
      storage_latest_version: storageLatestVersion,
      storage_dialect: storageConnection.dialect
    };
    res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, data));
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.getSlackDetails = async (req, res) => {
  try {
    const storageConnection = getStorageConnection();
    const data = await storageConnection.getConfig('slackIntegration');
    if (data && data.item) {
      data.item.value = JSON.parse(data.item.value);
      delete data.item.value.url;
    }
    res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, data.item || {}));
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.addSlackDetails = async (req, res) => {
  try {
    const { url } = helpers.extractAttributes(req.body);
    const slackUrl = await helpers.SlackUrl(url);
    if (!slackUrl) {
      const errorData = [
        {
          error: 'Conflict',
          message: 'You have sent a url which is not a slack url.'
        }
      ];
      return res.status(409).send({ errors: errorData });
    } else {
      const storageConnection = getStorageConnection();
      const data = await storageConnection.getConfig('slackIntegration');
      if (data && !data.item) {
        const details = {
          url,
          username: 'Errsole',
          icon_url: 'https://avatars.githubusercontent.com/u/84983840',
          status: true
        };
        const result = await storageConnection.setConfig(
          'slackIntegration',
          JSON.stringify(details)
        );
        if (result && result.item) {
          result.item.value = JSON.parse(result.item.value);
          res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, result.item));
        } else {
          res.status(500).send({
            errors: [
              {
                error: 'Internal Server Error',
                message: 'An unexpected error occurred'
              }
            ]
          });
        }
      } else {
        const errorData = [
          {
            error: 'Conflict',
            message: 'You have already added a webhook url for slack.'
          }
        ];
        res.status(409).send({ errors: errorData });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.updateSlackDetails = async (req, res) => {
  try {
    const { status } = helpers.extractAttributes(req.body);
    const storageConnection = getStorageConnection();
    const data = await storageConnection.getConfig('slackIntegration');
    if (data && data.item) {
      let parsedValue;
      try {
        parsedValue = JSON.parse(data.item.value);
        parsedValue.status = JSON.parse(status);
      } catch (err) {
        console.error(err);
        res.status(500).send({
          errors: [
            {
              error: 'Internal Server Error',
              message: err && err.message ? err.message : 'An unexpected error occurred'
            }
          ]
        });
      }
      data.item.value.status = JSON.parse(status);
      const result = await storageConnection.setConfig(
        'slackIntegration',
        JSON.stringify(parsedValue)
      );
      if (result && result.item) {
        result.item.value = JSON.parse(result.item.value);
        res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, result.item));
      } else {
        res.status(500).send({
          errors: [
            {
              error: 'Internal Server Error',
              message: 'An unexpected error occurred'
            }
          ]
        });
      }
    } else {
      res.status(500).send({
        errors: [
          {
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
          }
        ]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.deleteSlackDetails = async (req, res) => {
  try {
    const storageConnection = getStorageConnection();
    const data = await storageConnection.deleteConfig('slackIntegration');
    if (data) {
      res.send(
        Jsonapi.Serializer.serialize(Jsonapi.AppType, {
          data: 'slack integration has been removed'
        })
      );
    } else {
      res.status(500).send({
        errors: [
          {
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
          }
        ]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.getEmailDetails = async (req, res) => {
  try {
    const storageConnection = getStorageConnection();
    const data = await storageConnection.getConfig('emailIntegration');
    if (data && data.item) {
      data.item.value = JSON.parse(data.item.value);
      delete data.item.value.url;
    }
    res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, data.item || {}));
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.addEmailDetails = async (req, res) => {
  try {
    const { sender, host, port, username, password, recipients } =
      helpers.extractAttributes(req.body);
    const storageConnection = getStorageConnection();
    const details = {
      sender,
      host,
      port,
      username,
      password,
      recipients,
      status: true
    };
    const result = await storageConnection.setConfig(
      'emailIntegration',
      JSON.stringify(details)
    );
    if (result && result.item) {
      result.item.value = JSON.parse(result.item.value);
      await Alerts.clearEmailTransport();
      res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, result.item));
    } else {
      res.status(500).send({
        errors: [
          {
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
          }
        ]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.updateEmailDetails = async (req, res) => {
  try {
    const { status } = helpers.extractAttributes(req.body);
    const storageConnection = getStorageConnection();
    const data = await storageConnection.getConfig('emailIntegration');
    if (data && data.item) {
      let parsedValue;
      try {
        parsedValue = JSON.parse(data.item.value);
        parsedValue.status = JSON.parse(status);
      } catch (err) {
        console.error(err);
        res.status(500).send({
          errors: [
            {
              error: 'Internal Server Error',
              message: err && err.message ? err.message : 'An unexpected error occurred'
            }
          ]
        });
      }
      data.item.value.status = JSON.parse(status);
      const result = await storageConnection.setConfig(
        'emailIntegration',
        JSON.stringify(parsedValue)
      );
      if (result && result.item) {
        result.item.value = JSON.parse(result.item.value);
        await Alerts.clearEmailTransport();
        res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, result.item));
      } else {
        res.status(500).send({
          errors: [
            {
              error: 'Internal Server Error',
              message: 'An unexpected error occurred'
            }
          ]
        });
      }
    } else {
      res.status(500).send({
        errors: [
          {
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
          }
        ]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.deleteEmailDetails = async (req, res) => {
  try {
    const { url } = helpers.extractAttributes(req.body);
    const storageConnection = getStorageConnection();
    const data = await storageConnection.deleteConfig('emailIntegration');
    if (data) {
      res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, { url }));
    } else {
      res.status(500).send({
        errors: [
          {
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
          }
        ]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.testSlackNotification = async (req, res) => {
  try {
    const result = await Alerts.testSlackAlert('This is a test notification from the Errsole Logger.', 'Test Notification');
    res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, { success: result }));
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.testEmailNotification = async (req, res) => {
  try {
    const result = await Alerts.testEmailAlert('This is a test notification from the Errsole Logger. If you received this email, it means your SMTP settings are correctly configured in Errsole.', 'Test Notification');
    res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, { success: result }));
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.getAlertUrlDetails = async (req, res) => {
  try {
    const storageConnection = getStorageConnection();
    const data = await storageConnection.getConfig('alertUrl');
    if (data && data.item) {
      data.item.value = JSON.parse(data.item.value);
    }
    res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, data.item || {}));
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};

exports.addAlertUrlDetails = async (req, res) => {
  try {
    const { url } = helpers.extractAttributes(req.body);
    const storageConnection = getStorageConnection();
    const details = { url };
    const result = await storageConnection.setConfig(
      'alertUrl',
      JSON.stringify(details)
    );
    if (result && result.item) {
      result.item.value = JSON.parse(result.item.value);
      res.send(Jsonapi.Serializer.serialize(Jsonapi.AppType, result.item));
    } else {
      res.status(500).send({
        errors: [
          {
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
          }
        ]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          error: 'Internal Server Error',
          message: error && error.message ? error.message : 'An unexpected error occurred'
        }
      ]
    });
  }
};
