// node-cli-intro/src/index.js
import { usage, cli, print, printError } from "./utils/ui";
import { bumpPackageVersion, commit, tag, pushTags } from "./io";

export default function doFlow(optionsObj = cli.parse()) {
  let packageJsonPath = "./package.json";
  if(optionsObj.help) { 
    print(usage, "yellow");
  }
  else {
    if (optionsObj.message) {
      
      if (optionsObj.commit){
	      commit(optionsObj.message)
          .then( (res) => {
            console.log(`
          git commited successfully with status code: ${res["childProcess"]["exitCode"]}`);
          })
          .then( () => {
            print("Hit the second then block.", "green");

            if (optionsObj["bump-major"]) {
              print(`Decide on "bump-major"`, "cyan");
              return bumpPackageVersion(packageJsonPath, "major");
            } else if (optionsObj["bump-minor"]) {
              print(`Decide on "bump-minor'"`, "cyan");
              return bumpPackageVersion(packageJsonPath, "minor");
            } else if (optionsObj["bump-patch"]) {
              print(`Decide on "bump-patch"`, "cyan");
              return bumpPackageVersion(packageJsonPath, "patch");
            } else {
              throw "No bump version";
            }
          })
          .then( (verCode) => {
            if (optionsObj.version) {
              tag(`${verCode}-${optionsObj.version}`, optionsObj.message);
            }
            else {
              print(`No version appendage for tagging ${verCode}`, "cyan");
              tag(verCode, optionsObj.message);
            }
          } )
          .then( () => commit(optionsObj.message))
          .then( () => {
            // print("not really pushing tags. Just a commit.", "green");
            pushTags();
          } )
          .catch( (err) => {
            printError(err);
          });
      }     
    }
    else {
      printError("Please supply a message with -m");
    }
  }
};
