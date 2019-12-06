'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const deviceStore= require('../models/device-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: '2019 Mobile Phone Collection',
      devices: deviceStore.getUserDevices(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render', deviceStore.getAllDevices());
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  deleteDevice(request, response) {
    const deviceId = request.params.id;
    logger.debug(`Deleting Device ${deviceId}`);
    deviceStore.removeDevice(deviceId);
    response.redirect('/dashboard');
  },
  
  addDevice(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newDeVice = {
      id: uuid(),
      userid: loggedInUser.id,
      maker: request.body.maker,
      phones: [],
    };
    logger.debug('Creating a new Device', newDeVice);
    deviceStore.addDevice(newDeVice);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;