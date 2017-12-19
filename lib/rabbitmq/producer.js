/**
 * Filename: /Users/wei/Desktop/yedian/zoo_mq_lib/lib/rabbitmq/channel.js
 * Path: /Users/wei/Desktop/yedian/zoo_mq_lib
 * Created Date: Friday, September 22nd 2017, 5:15:40 pm
 * Author: wei
 *
 * Copyright (c) 2017 Your Company
 */

const conn = require('./channel')
const async = require('async')

let ch
let _config

exports.start = function (config, callback) {
  _config = config
  conn.createChannel(config).then((channel) => {
    ch = channel
    ch.assertExchange(config.exchange, config.type || 'direct', {
      durable: true,
      autoDelete: false
    })
    async.eachLimit(config.queue.consumerAdapters, 10, function (adapter, cb) {
      ch.assertQueue(`${config.queue.channel}.${adapter.queueName}`, {
        durable: true,
        autoDelete: false
      })
      .then(function () {
        return cb()
      })
      .catch(function (err) {
        return cb(err)
      })
    }, function (err) {
      if (err) return callback(err)
      return callback()
    })
  })
}

exports.publish = function (message, consumerAdapter, callback) {
  try {
    const retry = arguments[3] || 0
    const routingKey = `${_config.queue.channel}.${consumerAdapter}`
    console.log('message', message)
    let success = ch.publish(_config.exchange, routingKey, Buffer.from(JSON.stringify(message)), {
      deliveryMode: 2,
      contentType: 'application/json'
    })

    console.error(`success`, success)
    // if success false
    if (!success) {
      // retry for 5 times
      if (retry < 5) {
        console.error(`Failed to publish message. Retry for ${retry} times.`)
        return exports.publish(message, consumerAdapter, callback, retry + 1)
      }
      return callback(new Error(`Failed to publish message ${message}`))
    }

    return callback()
  } catch (error) {
    return callback(error)
  }
}
