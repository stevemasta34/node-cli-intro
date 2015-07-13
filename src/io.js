#! /usr/bin/env node

// node-cli-intro/src/io.js

"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.bumpVersion = bumpVersion;
exports.commit = commit;
exports.tag = tag;
exports.pushTags = pushTags;

var _fs = require("fs");

var _shelljs = require("shelljs");

/********************* Wrapper functions for easy names *********************/

// bump the package version (assumed to be [currentval] + 0.1.0

function bumpVersion(path, releaseType, callback) {
				console.log("Got to the bump call:", releaseType);
				try {
								var ret = bumpPackageVersion(path, releaseType);
								callback(ret.error ? null : ret.error, ret.data);
				} catch (e) {
								callback(e);
				}
}

;

function commit(message, callback) {
				// commit the project
				// optional message
				try {
								var res = commitChangesLocally(message ? message : "Automated commit from bump-tool", callback);

								return callback(res.error, res.data);
				} catch (error) {
								return callback(error);
				}
}

;

function tag(callback) {}

;

function pushTags(callback) {
				var res = tagPush();

				callback(res.error);
}

;

/********************* Actual working functions *********************/

function bumpPackageVersion(pathToPackageJSON, bumpType) {
				var readData = undefined;
				// read in the file
				(0, _fs.readFile)(pathToPackageJSON, { "encoding": "utf8" }, function (err, data) {
								if (err) {
												return console.error(err);
								} else {
												var _ret = (function () {
																console.log("Got data from a file");

																readData = data;
																console.log(readData);

																// console.log(data);
																// transform the contents to an string
																var myObj = JSON.parse(data);

																// JSON.destringify (or some equivalent), so we get the object back
																var verNum = myObj["version"];
																var split = verNum.split(".");
																var splitInd = bumpType === "major" ? 0 : bumpType === "minor" ? 1 : 2;
																var theInt = Number(split[splitInd]);
																console.log("Parsed this as the current", bumpType, "version num:", theInt);

																// bump the int
																theInt += 1;
																split[splitInd] = theInt;
																console.log(split);

																// tick the property of the object
																var newVer = split.join(".");
																console.log("New version: ", newVer);
																myObj["version"] = newVer;

																var ret = {};
																// write to the file
																(0, _fs.writeFile)("./babel-es5-src/package.json", JSON.stringify(myObj, null, 4), function (err) {
																				if (err) {
																								console.error(err);
																								ret.error = err;
																				}
																				console.log("Write was successful");
																				ret.successful = true;
																});
																ret.data = readData;
																return {
																				v: ret
																};
												})();

												if (typeof _ret === "object") return _ret.v;
								}
				});
}

function commitChangesLocally(commitMessage) {
				// commit changes to local repo
				var res = {};
				console.log("Commit message: ", commitMessage);
				try {
								if ((0, _shelljs.exec)("git commit -am \"" + commitMessage + "\"").code !== 0) {
												var message = "Shelljs failed to execute the Git commit.";
												(0, _shelljs.echo)(message);
												(0, _shelljs.exit)(1);
												res.error = message;
								}
								res.data = true;
								return res;
				} catch (e) {
								return console.error("Error occured at 'commitChangesLocally'", e);
				}
};

// add version tags

//push git tags to remote repository
function tagPush() {
				var e = (0, _shelljs.exec)("git push --tags"),
				    ret = {};
				if (e.code !== 0) {
								ret.error = "Error: git push --tags failed with code " + e.code;
								//	ret.data = false;
				}
				//    ret.data = true;
				return ret;
}