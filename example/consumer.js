/**
 * Filename: /Users/wei/Desktop/yedian/zoo_mq_lib/example/consumer.js
 * Path: /Users/wei/Desktop/yedian/zoo_mq_lib
 * Created Date: Friday, September 22nd 2017, 5:32:10 pm
 * Author: wei
 *
 * Copyright (c) 2017 Your Company
 */

const {consumer} = require('../index')

consumer.start((err, message) => {
  if (err) console.log('err', err)
  console.log('Consumer started.', message)
})
