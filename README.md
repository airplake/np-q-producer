night-zoo-trigger
night-zoo-trigger  mq service 

## Install

```console
$ npm install --save night-zoo-trigger
```
or
```console
$ yarn add  night-zoo-trigger
```

## Usage

### startup
you need add this to startup file
```
const { publisher } = require('night-zoo-trigger')

publisher.start((err) => {
    console.log('publish start')
})
```

### publisher

```
const { publisher } = require('night-zoo-trigger')

publisher.publish({a:1}, 'task', function (err) {
    console.log('publish success')
})
```

### consumer

```
const { consumer } = require('night-zoo-trigge')

consumer.start( (err,message) => {
    console.log('Consumer started.',message)
})
```


## JavaScript Style

```
npm run standard
```



### Contributors
阿文 @kelvv
老魏 @qknow
徐晨 @shadow88sky