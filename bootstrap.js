var System = require('es6-module-loader').System;

System.import('./src/index.js').then(function(index) {
    index.run(appName);
}).catch(function(err){
    console.log('err', err);
});
