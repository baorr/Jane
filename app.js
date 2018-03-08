'use strict';
const pathToRegExp = require('path-to-regexp');
/**
 * 启动程序
 */
module.exports = app => {
};


process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')