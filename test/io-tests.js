// node-cli-tool/test/io-tests.js
var chai = require("chai");
var expect = chai.expect;
var myIo = require("../lib/io.js");


describe("IO", function() {
  describe("#commit()", function() {
    it("should perfom a git commit, with message", function () {
      console.log("Initializing test");
      var commitMessage = "Mocha test commit: ";
      var self = this;
      var _this = this;
      var doAssertion = function () {
        expect(self).to.have.a.property("result", _this.res);
      };
      
      var testCallback = function (err, res) {
        _this.res = res;
        if (err) expect(0).to.be.same(1); // force fail
        /*
          else {
          self.result = res;
          }
        */
        self.result = res;
        expect(self).to.have.a.property("result", res);
        console.log(self.result);
        doAssertion();
      };

      myIo.commit(commitMessage, testCallback);

    });
  });
});
