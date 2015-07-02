
var System = require('es6-module-loader').System;

System.import('./src/index').then(function(index) {
    index.run(__dirname);
}).catch(function(err){
    console.log('err', err);