// node-cli-tool/test/io-tests.js
var chai = require("chai");
var expect = chai.expect;
var myIo = require("../lib/io.js");
var exec = require("child-process-promise").exec;

describe("IO", function() {
  describe("#commit()", function() {
    it("should perfom a git commit, with message", function () {
      console.log("Initializing test");
      var commitMessage = "Mocha test commit: commit from the testing frame work";
      var self = this;
      var _this = this;

      myIo.commit(commitMessage)
        .then(function () {
          self.res = 0;
        })
        .then(function () {
          exec("git reset HEAD^")
            .then(function (result) {
              console.log("Undid the commit");
              
              // Let's look at the output streams.
              var stdout = result.stdout;
              var stderr = result.stderr;
              console.log('stdout: ', stdout);
              console.log('stderr: ', stderr);
              expect(self).to.have.a.property("res", 0);
            })
            .fail(function (err) {
              console.error("ERROR: ",err);
            })
            .progress(function (childProcess) {
              console.log("childProcess.pid = ",childProcess.pid);
            });
        })
        .catch(function (err) {
          console.log("Error block, pseudo-failure");
          // break the test
          expect(self).to.have.a.property("res", 100);
        });
    });
  });
});
