//#! /usr/bin/env node
// node-cli-intro/src/io.js

import { open, writeFile, readFile } from "fs";
import { exec } from "child-process-promise";

/********************* Wrapper functions for easy names *********************/

// bump the package version (assumed to be [currentval] + 0.1.0
export function bumpVersion(path, releaseType, callback) {
  console.log("\nGot to the bump call:", releaseType);
  try {
	  let ret = bumpPackageVersion(path, releaseType);
	  callback(ret.error ? null : ret.error, ret.data);
  } catch (e) {
	  callback(e);
  }
};

// commit the project
export function commit(message, callback) {

  // Using Promises
  commitChangesLocally(message ? message : "Automated commit from bump-tool")
    .then( (result) => { // success
      // The result is a childProcess object
      console.log(`git commited successfully with status code:
                  ${result["childProcess"]["exitCode"]}`);
      // Is this desired functionality?
      return callback(null, result);
    }, (err) => { // failure
      console.error(`commit failed, with status code: ${err}`);
      return callback(err);
    }).catch( (exception) => {
      // Exception handle block. For now, see what happens
      console.error(exception);
    });
};

export function tag(callback) {
  // TODO: add tags through git command
  // TODO: potentially, derive tag version with package.json version
};

export function pushTags(callback) {
  let res = tagPush();
  callback(res.error);
};

/********************* Actual working functions *********************/


function bumpPackageVersion(pathToPackageJSON, bumpType) {

  return new Promise(function (resolve, reject) {
    // read in the file
    readFile(pathToPackageJSON, { "encoding": "utf8"}, function (err, data) {
	    if (err) {
	      console.error(err);
        reject(new Error(err));
	    }
	    else {	    
	      let myObj = JSON.parse(data);

        // JSON.destringify (or some equivalent), so we get the object back
	      let verNum = myObj["version"];
	      let split = verNum.split('.');

        let splitInd = (bumpType === "major" ? 0 : bumpType === "minor" ? 1 : 2);

	      let theInt = Number(split[ splitInd ]);
	      console.log(`Parsed bumptype: ${bumpType}, version num: ${theInt}`);

	      // bump the int
	      theInt += 1;
        split[splitInd] = theInt;
        
        if (bumpType === "major") { 
          split[splitInd + 1] = 0;
          split[splitInd + 2] = 0;
        }
        else if (bumpType === "minor") {
          split[splitInd + 1] = 0;
        }

	      // tick the property of the object
	      let newVer = split.join(".");
	      console.log(`New version: ${newVer}`);
	      myObj["version"] = newVer;

        // write to the file
	      writeFile("./package.json",
		              JSON.stringify(myObj, null, 4), function (err) {
			              if (err) {
			                console.error(err);
			                // Error reject
                      reject(new Error(err));
			              }
			              else {
			                console.log("Write was successful");
                      // resolve data
                      resolve(data);
			              }
		              });
	    }	
    });
  });
  
}

// commit changes to local repo
function commitChangesLocally(commitMessage) {
  //  console.log("Commit message: ",commitMessage);
  return new Promise(function(resolveFunc, rejectFunc) {
    let topCmd = `git commit -am "${commitMessage}"`;
    exec(topCmd)
      .then(function (result) {
        // resolve the program, because we've hit the succes
        console.log("Hit the top level success block, in CCL Promise");
        resolveFunc(result);
      })
      .fail(function (error) {
	      let message = "Shelljs failed to execute the Git commit.";
        exec(`echo ${message}`)
          .then(function (res) {
            rejectFunc(new Error(message));
          })
          .fail(function (err) {
            rejectFunc(new Error(`ERROR: ${err}`));
          })
          .progress(function (kidProc) {
            console.log(`kidProc.pid: ${kidProc.pid}`);
          });
      });
  });
};

//push git tags to remote repository
function tagPush() {

  new Promise (function (resolve, reject) {
    exec("git push --tags")
      .then(function (result) {
        // 
      })
      .fail(function (error) {
        // 
      });    
  });
}
