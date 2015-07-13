#! /usr/bin/env node
// node-cli-intro/src/io.js

import { open, writeFile, readFile } from "fs";
import { exec, echo, exit } from "shelljs";

/********************* Wrapper functions for easy names *********************/

// bump the package version (assumed to be [currentval] + 0.1.0
export function bumpVersion(path, releaseType, callback) {
    console.log("Got to the bump call:", releaseType);
    let ret = bumpPackageVersion(path, releaseType);
    callback(ret.error, ret.ver);
};

export function commit(message, callback) {
    // commit the project
    // optional message
    try {
	commitChangesLocally(message ? message : "Automated commit from bump-tool");
	
	return callback(null);
    } catch (error) {
	return callback(error);
    }
};

export function tag() {
};

export function pushTags(callback) {
    let res = tagPush();
    
    callback(res.error);
};

/********************* Actual working functions *********************/


function bumpPackageVersion(pathToPackageJSON, bumpType) {
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
	    var splitInd = (bumpType === "major" ? 0 : bumpType === "minor" ? 1 : 2);
	    var theInt = Number(split[ splitInd ]);
	    console.log("Parsed this as the current",bumpType,"version num:", theInt);

	    // bump the int
	    theInt += 1;
	    split[splitInd] = theInt;
	    console.log(split);

	    // tick the property of the object
	    var newVer = split.join(".");
	    console.log("New version: ",newVer);
	    myObj["version"] = newVer;

            // write to the file
	    writeFile("./babel-es5-src/package.json",
		      JSON.stringify(myObj, null, 4), function (err) {
			  if (err) {
			      return console.error(err);
			  }
			  return console.log("Write was successful");
		      });
	    return { ver: newVer, error: null };
	}	
    });
}

function commitChangesLocally(commitMessage) {
    // commit changes to local repo
    console.log("Commit message: ",commitMessage);

    try {
	if (exec(`git commit -a -m "${commitMessage}"`).code !== 0) {
	    let message = "Shelljs failed to execute the Git commit.";
	    echo(message);
	    exit(1);
	    return {error: message};
	}
    } catch (e) {
	console.error("Error occured at 'commitChangesLocally'", e);
    }
}

// add version tags

//push git tags to remote repository
function tagPush() {
    let e = exec("git push --tags"), ret = {};
    if (e.code !== 0) {
	ret.error = `Error: git push --tags failed with code {e.code}`;
//	ret.data = false;
    }
//    ret.data = true;
    return ret;
}
