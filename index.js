/**
 * Filename: /Users/wei/Desktop/yedian/zoo_mq_lib/index.js
 * Path: /Users/wei/Desktop/yedian/zoo_mq_lib
 * Created Date: Friday, September 22nd 2017, 5:21:40 pm
 * Author: wei
 *
 * Copyright (c) 2017 Your Company
 */

const publisher = require('./lib/rabbitmq/producer')
const consumer = require('./lib/rabbitmq/worker')

module.exports = {
  publisher,
  consumer
}
