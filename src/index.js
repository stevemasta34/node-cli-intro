// node-cli-intro/src/index.js
import { usage, cli, print, printError } from "./utils/ui";
import { bumpPackageVersion, commit, tag, pushTags } from "./io";

export default function doFlow(optionsObj = cli.parse()) {
  let packageJsonPath = "./package.json";
  if(optionsObj.help) { 
    print(usage, "yellow");
  }
  else {
    print(optionsObj, "green");

    if (optionsObj.message) {
      
      if (optionsObj.commit){
	      commit(optionsObj.message)
          .then( (res) => {
            console.log(`
          git commited successfully with status code: ${res["childProcess"]["exitCode"]}`);
            //print(res, "yellow");
            return res;
          })
          .then( () => {
            print("Hit the second then block.", "green");
            let bumpPackage = (() => {
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
            })();
            return bumpPackage();
          })
          .then( (verCode) => tag(verCode, optionsObj.message) )
          .then( () => pushTags() )
          .catch( (err) => {
            printError(err);
          })
            .then ( (param) => {
              print(`Past the error block with param: ${param}`, "cyan");
            });
      }     
    }
    else {
      printError("Please supply a message with -m");
    }
  }
};
