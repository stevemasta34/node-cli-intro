// node-cli-intro/src/io.js
import { writeFile, readFile } from "fs-promise";
import { exec } from "child-process-promise";
//import { inc, clean, valid } from "semver";
import { simpleIncrement } from "./utils/bump";
import { printError, print } from "./utils/ui";

// bump the package version
export function bumpPackageVersion(pathToPackageJSON, bumpType) {

  return new Promise(function (resolve, reject) {
	  // read in the file
	  readFile(pathToPackageJSON, { "encoding": "utf8"})
      .then((data) => {	    
		    let myObj = JSON.parse(data);

		    let verNum = myObj["version"];

		    let newVer = simpleIncrement(verNum, bumpType);
		    
		    myObj["version"] = newVer;

		    // write to the file
		    writeFile(pathToPackageJSON, JSON.stringify(myObj, null, 4))
          .then( () => {
			      print("Write was successful", "green");
				    // resolve data
				    resolve(newVer);
			    })
          .catch( (err) => {
			      printError(err);
			      // Error reject
				    reject(err);
			    });
	    },
            (err) => {
		          printError(err);
		          reject(err);
	          })
      .catch( (err) => printError(err));
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
        // console.log("Hit the top level success block, in CCL Promise");
        resolveFunc(result);
      })
      .fail( (error) => {
	      let message = "Shelljs failed to execute the Git commit.";
        exec(`echo ${message}`)
          .then( () => {
            // res is a code we don't need right now
            rejectFunc(error);
          })
          .fail(err => rejectFunc(err) )
          .progress(function (kidProc) {
            print(`kidProc.pid: ${kidProc.pid}`, "green");
          });
      });
  });
};

// do the git tag and commit the package.json, because it was changed earlier
export function tag(version, tagMessage) {

  new Promise (function (resolve, reject) {
    // probe the file for the version
    // console.log(`Made it to #tag with version: ${version}`);
    // tag with said version: "git tag -a <version> -m <>"
    exec(`git tag -a v${version} -m "${tagMessage}"`)
      .then((succRes) => {
        console.log(`Version tagging to "v${version}" was succesful`);
        resolve(succRes);
      }, (failRes) => {
        console.error(`ERROR: Tagging to v${version} FAILED`);
        reject(new Error(failRes));
      })
      .catch( (exception) => {
        console.error(`ERROR: ${exception}`);
        reject(exception);
      });
  });
};

//push git tags to remote repository
export function pushTags () {

  new Promise (function (resolve, reject) {
    exec("git push --follow-tags")
      .then( (result) => resolve(result))
      .fail( (error) => reject(error));    
  });
};
