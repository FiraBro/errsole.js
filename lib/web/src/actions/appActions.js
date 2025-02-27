import { http } from 'app/services/httpServices';
import { Notifications } from 'services/notifications';

export function checkUpdates (callback) {
  return (dispatch) => {
    http.checkUpdates()
      .then((response) => {
        const updateData = response.data;
        callback(null, updateData);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function getSlackDetails (callback) {
  return (dispatch) => {
    http.getSlackDetails()
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function addSlackDetails (data, callback) {
  return (dispatch) => {
    http.addSlackDetails(data)
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function updateSlackDetails (data, callback) {
  return (dispatch) => {
    http.updateSlackDetails(data)
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function deleteSlackDetails (callback) {
  return (dispatch) => {
    http.deleteSlackDetails()
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function getEmailDetails (callback) {
  return (dispatch) => {
    http.getEmailDetails()
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function addEmailDetails (data, callback) {
  return (dispatch) => {
    http.addEmailDetails(data)
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function updateEmailDetails (data, callback) {
  return (dispatch) => {
    http.updateEmailDetails(data)
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function deleteEmailDetails (callback) {
  return (dispatch) => {
    http.deleteEmailDetails()
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function testSlackNotification (callback) {
  return (dispatch) => {
    http.testSlackNotification()
      .then((response) => {
        const details = response.data.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error, null);
      });
  };
}

export function testEmailNotification (callback) {
  return (dispatch) => {
    http.testEmailNotification()
      .then((response) => {
        const details = response.data.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error, null);
      });
  };
}

export function addConsoleLogs (logs) {
  return {
    type: 'ADD_CONSOLE_LOGS',
    logs
  };
}

export function clearConsoleLogs () {
  return {
    type: 'CLEAR_CONSOLE_LOGS'
  };
}

export function setLatestOnTop (latestOnTop) {
  return {
    type: 'SET_LATEST_ON_TOP',
    payload: latestOnTop
  };
}

export function getAlertUrl (callback) {
  return (dispatch) => {
    http.getAlertUrl()
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}

export function addAlertUrl (data, callback) {
  return (dispatch) => {
    http.addAlertUrl(data)
      .then((response) => {
        const details = response.data;
        callback(null, details);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Notifications.showErrors(error);
        } else {
          Notifications.showErrors(error);
        }
        callback(error);
      });
  };
}
