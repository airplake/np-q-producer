/**
 * Filename: /Users/wei/Desktop/yedian/zoo_mq_lib/lib/rabbitmq/channel.js
 * Path: /Users/wei/Desktop/yedian/zoo_mq_lib
 * Created Date: Friday, September 22nd 2017, 5:15:40 pm
 * Author: wei
 *
 * Copyright (c) 2017 Your Company
 */

const amqp = require('amqplib')
const RABBITMQ_URL = require('config').queue.connection
// RABBITMQ_URL ||
const connStr = RABBITMQ_URL

let conn

function connect () {
  return new Promise((resolve, reject) => {
    if (conn) return resolve(conn)
    amqp.connect(connStr).then((_conn) => {
      console.log('连接rabbitmq成功')
      // If your program runs until interrupted, you can hook into the process signal handling to close the connection:
      // process.once('SIGINT', conn.close.bind(conn))
      conn = _conn
      // 监听连接关闭事件
      conn.on('close', () => {
        console.log('rabbimq连接关闭')
      })
      // 监听连接错误事件
      conn.on('error', (err) => {
        console.error(`rabbimq连接出错:`, err)
      })
      // 监听连接阻塞事件
      conn.on('blocked', (reason) => {
        console.error(`连接阻塞，原因:${reason}`)
      })
      // 监听阻塞连接恢复正常事件
      conn.on('unblocked', () => {
        console.log('阻塞连接恢复正常')
      })
      resolve(conn)
    }).catch((err) => {
      console.error(`连接rabbitmq失败，`, err)
      reject(err)
    })
  })
}

exports.createChannel = function () {
  return new Promise((resolve, reject) => {
    // if (self.ch) return resolve(self.ch);
    connect()
      .then(() => {
        return conn.createChannel()
      })
      .then((ch) => {
        // ch = this.ch
        ch.on('close', () => {
          // console.log('channel关闭');
        })
        ch.on('error', (err) => {
          console.error(`channel出错:`, err)
        })
        ch.on('return', (msg) => {
          console.log(`channel return:${msg}`)
        })
        ch.on('drain', () => {
          console.error('drain event fired.')
        })
        resolve(ch)
      })
      .catch((err) => {
        console.error(`创建channel失败，`, err)
        reject(err)
      })
  })
}
