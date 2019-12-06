'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const deviceStore = {

  store: new JsonStore('./models/device-store.json', { deviceCollection: [] }),
  collection: 'deviceCollection',

  getAllDevices() {
    return this.store.findAll(this.collection);
  },

  getDevice(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserDevices(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addDevice(device) {
    this.store.add(this.collection, device);
  },

  removeDevice(id) {
    const device = this.getDevice(id);
    this.store.remove(this.collection, device);
  },

  removeAllDevices() {
    this.store.removeAll(this.collection);
  },

  addPhone(id, phone) {
    const device = this.getDevice(id);
    device.phones.push(phone);
  },

  removePhone(id, phoneId) {
    const device = this.getDevice(id);
    const phones = device.phones;
    _.remove(phones, { id: phoneId});
  },
  
  editPhone(id, phoneId, phoneDetails) {
    const device = this.getDevice(id);
    const phones = device.phones;
    const thepos = phones.findIndex(field=> field.id === phoneId);
    phones[thepos].title=phoneDetails.title;
    phones[thepos].artist=phoneDetails.artist;
  },
  
};

module.exports = deviceStore;