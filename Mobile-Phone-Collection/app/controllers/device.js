'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const deviceStore = require('../models/device-store');
const accounts = require ('./accounts.js');

const device = {
 index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const deviceId = request.params.id;
    logger.debug('Device id = ', deviceId);
    if (loggedInUser) {
    const viewData = {
      title: 'Phones',
      device: deviceStore.getDevice(deviceId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('device', viewData);
    }
    else response.redirect('/');
  },
  
  deletePhone(request, response) {
    const deviceId = request.params.id;
    const phoneId = request.params.phoneid;
    logger.debug(`Deleting Phone ${phoneId} from Device ${deviceId}`);
    deviceStore.removePhone(deviceId, phoneId);
    response.redirect('/device/' + deviceId);
  },
  
    addPhone(request, response) {
    const deviceId = request.params.id;
    const device = deviceStore.getDevice(deviceId);
    const newPhone = {
      id: uuid(),
      title: request.body.title,
      memory: request.body.memory,
    };
    deviceStore.addPhone(deviceId, newPhone);
    response.redirect('/device/' + deviceId);
  },
  
  updatePhone(request, response) {
    const deviceId = request.params.id;
    const phoneId = request.params.phoneid;
    logger.debug("updating phone " + phoneId);
    const alterPhone = {
      title: request.body.title,
      memory: request.body.memory,
    };
    deviceStore.editPhone(deviceId, phoneId, alterPhone);
    response.redirect('/device/' + deviceId);
  },
  
};

module.exports = device;