// node-cli-intro/src/index.js

"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.doFlow = doFlow;

var _uiTools = require("./ui/tools");

var _io = require("./io");

function myMethod() {
   console.log("This is how we do it.");
   console.log("And we keep on, keeping on");
};

function doFlow(optionsObj) {
   if (optionsObj.help) {
      (0, _uiTools.print)(_uiTools.usage, "blue");
   } else {
      console.log(optionsObj);
      for (var k in optionsObj) {
         if (optionsObj.hasOwnProperty(k)) (0, _uiTools.print)(optionsObj[k], "green");
      }
      var bumpCB = function bumpCB(error, data) {
         // testing inappropriate bump function call
         console.log("Bump callback was hit");
      };

      // This could be done with string parsing, but that can be error pron
      // and this is a definite thing that will reduce operation count
      if (optionsObj["bump-major"] !== undefined) {
         // pass the major key to the bump command
         (0, _io.bumpVersion)("./package.json", "major", bumpCB);
      }
      if (optionsObj["bump-minor"] !== undefined) {
         // pass the minor key to the bump command
         (0, _io.bumpVersion)("./package.json", "minor", bumpCB);
      }
      if (optionsObj["bump-patch"] !== undefined) {
         // pass the patch key to the bump command
         (0, _io.bumpVersion)("./package.json", "patch", bumpCB);
      }
      if (optionsObj.commit) {
         (0, _io.commit)(optionsObj.message, function (error, dat) {
            (0, _uiTools.print)("The data thing: " + dat, "blue");
         });
      }
   }
}

;