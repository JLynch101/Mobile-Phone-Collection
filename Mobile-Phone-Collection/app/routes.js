'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const device = require('./controllers/device.js');
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');
const purchase = require('./controllers/purchase.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletedevice/:id', dashboard.deleteDevice);
router.get('/purchase', purchase.index);
router.post('/dashboard/adddevice', dashboard.addDevice);

router.get('/device/:id', device.index);
router.get('/device/:id/deletephone/:phoneid', device.deletePhone);
router.post('/device/:id/addphone', device.addPhone);

router.get('/about', about.index);

module.exports = router;