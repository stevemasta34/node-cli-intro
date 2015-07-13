#! /usr/bin/env node
// node-cli-intro/src/io.js

import { open, writeFile, readFile } from "fs";
import { exec, echo, exit } from "shelljs";

/********************* Wrapper functions for easy names *********************/

// bump the package version (assumed to be [currentval] + 0.1.0
export function bumpVersion(path, releaseType, callback) {
    console.log("Got to the bump call:", releaseType);
    bumpPackageVersion(path, releaseType, callback);
};

export function commit(message, callback) {
    // commit the project
    // optional message
    try {
	let res = commitChangesLocally(
	    message ? message : "Automated commit from bump-tool");
	
	return callback(res.error, res.data);
    } catch (error) {
	return callback(error);
    }
};

export function tag(callback) {
};

export function pushTags(callback) {
    let res = tagPush();
    
    callback(res.error);
};

/********************* Actual working functions *********************/


function bumpPackageVersion(pathToPackageJSON, bumpType) {
    let readData;
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
	    let myObj = JSON.parse(data);

            // JSON.destringify (or some equivalent), so we get the object back
	    let verNum = myObj["version"];
	    let split = verNum.split('.');
	    let splitInd = (bumpType === "major" ? 0 : bumpType === "minor" ? 1 : 2);
	    let theInt = Number(split[ splitInd ]);
	    console.log("Parsed this as the current",bumpType,"version num:", theInt);

	    // bump the int
	    theInt += 1;
	    split[splitInd] = theInt;
	    console.log(split);

	    // tick the property of the object
	    let newVer = split.join(".");
	    console.log("New version: ",newVer);
	    myObj["version"] = newVer;

	    let ret = {};
            // write to the file
	    writeFile("./babel-es5-src/package.json",
		      JSON.stringify(myObj, null, 4), function (err) {
			  if (err) {
			      console.error(err);
			      ret.error = err;
			  }
			  console.log("Write was successful");
			  ret.successful = true;
		      });
	    ret.data = readData;
	    return ret;
	}	
    });
}

function commitChangesLocally(commitMessage) {
    // commit changes to local repo
    let res = {};
    console.log("Commit message: ",commitMessage);
    try {
	if (exec(`git commit -a -m "${commitMessage}"`).code !== 0) {
	    let message = "Shelljs failed to execute the Git commit.";
	    echo(message);
	    exit(1);
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
    let e = exec("git push --tags"), ret = {};
    if (e.code !== 0) {
	ret.error = `Error: git push --tags failed with code {e.code}`;
//	ret.data = false;
    }
//    ret.data = true;
    return ret;
}
