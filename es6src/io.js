#! /usr/bin/env node
// node-cli-intro/src/io.js

import { open, writeFile, readFile } from "fs";
import { exec } from "shelljs";

// bump the package version (assumed to be [currentval] + 0.1.0
export function bumpVersion(path) {
    console.log("Got to the bump call");
    bumpPackageVersion(path);
};

export function commit(message) {
    // commit the project
    // optional message
    commitChangesLocally(message ? message : "Automated commit from node-bump-piler");
};

function bumpPackageVersion(pathToPackageJSON) {
    var readData;
    // read in the file
    readFile(pathToPackageJSON, { "encoding": "utf8"}, function (err, data) {
	if (err) {
	    return console.error(err);
	}
	else {
	    console.log("Got data from a file");

	    readData = data;
	    console.log(readData);
	    
	    // console.log(data);
	    // transform the contents to an string
	    var myObj = JSON.parse(data);

            // JSON.destringify (or some equivalent), so we get the object back
	    var verNum = myObj["version"];
	    var split = verNum.split('.');
	    var theInt = Number(split[1]);
	    console.log("Parsed this as the version num:", theInt);

	    // bump the int
	    theInt += 1;
	    split[1] = theInt;
	    console.log(split);

	    // tick the property of the object
	    var newVer = split.join(".");
	    console.log("New version: ",newVer);
	    myObj["version"] = newVer;

            // write to the file
	    writeFile("./babel-es5-src/package.json",
		      JSON.stringify(myObj), function (err) {
		if (err) console.error(err);

		console.log("Write was successful");
	    });
	}
    });

}

function commitChangesLocally(commitMessage) {
    // commit changes to local repo
    console.log("Commit message: ",commitMessage);
    
    exec(`git commit -a -m "${commitMessage}"`);
}

// add version tags

//push git tags to remote repository
