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

const CONSUMER_ADAPTERS = require('config').queue.consumerAdapters
const CHANNEL = require('config').queue.channel
const exchange = require('config').exchange
let ch

exports.start = function (cb) {
  conn.createChannel().then((channel) => {
    ch = channel
    ch.assertExchange(exchange, 'direct', { durable: true, autoDelete: false })
    async.eachLimit(CONSUMER_ADAPTERS, 10, function (adapter, callback) {
      ch.assertQueue(`${CHANNEL}.${adapter.queueName}`, { durable: true, autoDelete: false })
      ch.bindQueue(`${CHANNEL}.${adapter.queueName}`, exchange, `${CHANNEL}.${adapter.queueName}`)
      ch.consume(`${CHANNEL}.${adapter.queueName}`, (msg) => {
        if (msg) {
          let message = JSON.parse(msg.content.toString())
          cb(null, message)
        }
        ch.ack(msg)
      }, { noAck: false })
    }, function (err) {
      cb(err)
    })
  })
}
