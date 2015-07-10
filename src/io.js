#! /usr/bin/env node

// node-cli-intro/src/io.js

"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.bumpVersion = bumpVersion;
exports.commit = commit;

var _fs = require("fs");

var _shelljs = require("shelljs");

// bump the package version (assumed to be [currentval] + 0.1.0

function bumpVersion(path, releaseType) {
				console.log("Got to the bump call:", releaseType);
				bumpPackageVersion(path, releaseType);
}

;

function commit(message) {
				// commit the project
				// optional message
				commitChangesLocally(message ? message : "Automated commit from node-bump-piler");
}

;

function bumpPackageVersion(pathToPackageJSON, bumpType) {
				var readData;
				// read in the file
				(0, _fs.readFile)(pathToPackageJSON, { "encoding": "utf8" }, function (err, data) {
								if (err) {
												return console.error(err);
								} else {
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

												// write to the file
												(0, _fs.writeFile)("./babel-es5-src/package.json", JSON.stringify(myObj, null, 4), function (err) {
																if (err) console.error(err);

																console.log("Write was successful");
												});
								}
				});
}

function commitChangesLocally(commitMessage) {
				// commit changes to local repo
				console.log("Commit message: ", commitMessage);

				try {
								(0, _shelljs.exec)("git commit -a -m \"" + commitMessage + "\"");
				} catch (e) {
								console.error("Error occured at 'commitChangesLocally'", e);
				}
}

// add version tags

//push git tags to remote repository