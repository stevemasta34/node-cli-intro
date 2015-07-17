// node-cli-intro/src/io.js

import { open, writeFile, readFile } from "fs";
import { exec } from "child-process-promise";
//import { inc, clean, valid } from "semver";
import { simpleIncrement } from "./utils/bump";
import { printError } from "./utils/ui";

// bump the package version (assumed to be [currentval] + 0.1.0
export function bumpPackageVersion(pathToPackageJSON, bumpType) {

    return new Promise(function (resolve, reject) {
	// read in the file
	readFile(pathToPackageJSON, { "encoding": "utf8"}, function (err, data) {
	    if (err) {
		console.error(err);
		reject(new Error(err));
	    }
	    else {	    
		let myObj = JSON.parse(data);

		let verNum = myObj["version"];

		let newVer = simpleIncrement(verNum, bumpType);
		
		myObj["version"] = newVer;

		// write to the file
		writeFile(pathToPackageJSON,
		          JSON.stringify(myObj, null, 4), function (err) {
			      if (err) {
			          console.error(err);
			          // Error reject
				  reject(new Error(err));
			      }
			      else {
			          console.log("Write was successful");
				  // resolve data
				  resolve(newVer);
			      }
		          });
	    }
    });
  });
  
};

// commit changes to local repo
export function commit(commitMessage) {
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

// do the git tag and commit the package.json, because it was changed earlier
export function tag(version, tagMessage) {

  new Promise (function (resolve, reject) {
    // probe the file for the version
    console.log(`Made it to #tag with version: ${version}`);
    // tag with said version: "git tag -a <version> -m <>"
    exec(`git tag -a v${version} -m "${tagMessage}"`)
      .then((succRes) => {
        console.log(`Version tagging to v${version} was succesful`);
        resolve(succRes);
      }, (failRes) => {
        console.error(`ERROR: Tagging to v${version} FAILED`);
        reject(new Error(failRes));
      })
      .catch( (exception) => {
        console.error(`ERROR: ${exception}`);
        reject(new Error(exception));
      });
  });
};

//push git tags to remote repository
export function pushTags () {

  new Promise (function (resolve, reject) {
    exec("git push --follow-tags")
      .then( (result) => {
        //
        resolve(result);
      })
      .fail( (error) => {
        //
        reject(error);
      });    
  });
};
