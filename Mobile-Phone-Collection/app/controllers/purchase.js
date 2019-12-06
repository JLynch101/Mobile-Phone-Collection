'use strict';

const logger = require('../utils/logger');

const purchase = {
  index(request, response) {
    logger.info('purchase rendering');
    const viewData = {
      title: 'Purchase Phones',
    };
    response.render('purchase', viewData);
  },
};

module.exports = purchase;