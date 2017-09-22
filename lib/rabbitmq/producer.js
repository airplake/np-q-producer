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
const exchange = require('config').exchange

const CONSUMER_ADAPTERS = require('config').queue.consumerAdapters
const CHANNEL = require('config').queue.channel
let ch

exports.start = function (callback) {
  conn.createChannel().then((channel) => {
    ch = channel
    ch.assertExchange(exchange, 'direct', {
      durable: true,
      autoDelete: false
    })
    async.eachLimit(CONSUMER_ADAPTERS, 10, function (adapter, callback) {
      ch.assertQueue(`${CHANNEL}.${adapter.queueName}`, {
        durable: true,
        autoDelete: false
      })
      callback()
    }, function (err) {
      callback(err)
    })
  })
}

exports.publish = function (message, consumerAdapter, callback) {
  try {
    const retry = arguments[3] || 0
    const routingKey = `${CHANNEL}.${consumerAdapter}`
    console.log('message', message)
    let success = ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), {
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
