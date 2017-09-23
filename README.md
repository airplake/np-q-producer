# np-q-producer

=========================

**np-q-producer queue service**

## Install

```console
$ npm install --save np-q-producer
```
or
```console
$ yarn add  np-q-producer
```

## Usage

### startup
you need add this to startup file
```
const { publisher } = require('np-q-producer')

let config = {
  exchange: 'night',
  queue: {
    connection: 'amqp://admin:admin@127.0.0.1:5672',
    channel: 'ZOO_QUEUE',
    consumerAdapters: [{
      queueName: 'task'
    }, {
      queueName: 'new'
    }]
  }
}

publisher.start(config,(err) => {
    console.log('publish start')
})
```

### publisher

```
const { publisher } = require('np-q-producer')

publisher.publish({a:1}, 'task', function (err) {
    console.log('publish success')
})
```

### consumer

```
const { consumer } = require('np-q-producer')

let config = {
  exchange: 'night',
  queue: {
    connection: 'amqp://admin:admin@127.0.0.1:5672',
    channel: 'ZOO_QUEUE',
    consumerAdapters: [{
      queueName: 'task'
    }, {
      queueName: 'new'
    }]
  }
}

consumer.start(config,(err,message) => {
    console.log('Consumer started.',message)
})
```

## Example

[Example](https://github.com/airplake/np-q-producer/tree/master/example)


## JavaScript Style

```
npm run standard
```



### Contributors
[阿文 @kelvv](https://github.com/kelvv)  
[老魏 @qknow](https://github.com/503945930)  
[徐晨 @shadow88sky](https://github.com/shadow88sky)  
[文卿 @Wenqing Yu](https://github.com/wenqingyu)    
[业生 @CNBlackJ](https://github.com/CNBlackJ)     

