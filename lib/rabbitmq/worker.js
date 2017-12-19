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

exports.start = function (config, callback) {
  conn.createChannel(config).then((channel) => {
    ch = channel
    ch.assertExchange(config.exchange, config.type || 'direct', { durable: true, autoDelete: false })
    async.eachLimit(config.queue.consumerAdapters, 10, function (adapter, cb) {
      ch.assertQueue(`${config.queue.channel}.${adapter.queueName}`, { durable: true, autoDelete: false })
      ch.bindQueue(`${config.queue.channel}.${adapter.queueName}`, config.exchange, `${config.queue.channel}.${adapter.queueName}`)
      ch.consume(`${config.queue.channel}.${adapter.queueName}`, (msg) => {
        try {
          ch.ack(msg)
          let message = JSON.parse(msg.content.toString())
          return callback(null, adapter.queueName, message)
        } catch (error) {
          return callback(error, adapter.queueName)
        }
      }, { noAck: false })

      return cb()
    }, function (err) {
      if (err) return callback(err)
    })
  })
}
