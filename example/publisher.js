/**
 * Filename: /Users/wei/Desktop/yedian/zoo_mq_lib/example/consumer.js
 * Path: /Users/wei/Desktop/yedian/zoo_mq_lib
 * Created Date: Friday, September 22nd 2017, 5:32:10 pm
 * Author: wei
 *
 * Copyright (c) 2017 Your Company
 */

const { publisher } = require('../index')

let config = {
  exchange: 'night',
  queue: {
    connection: 'amqp://admin:admin@192.168.31.9:5672',
    channel: 'ZOO_QUEUE',
    consumerAdapters: [{
      queueName: 'task'
    }, {
      queueName: 'new'
    }]
  }
}
publisher.start(config, (err) => {
  if (err) console.log('publish start', err)
  console.log('publish start')

  publisher.publish({a: 1}, 'task', (err) => {
    if (err) console.log('publish err', err)
    console.log('publish success')
  })
})
