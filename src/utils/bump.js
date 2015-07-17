//node-cli-intro/src/utils/bump.js
export function simpleIncrement(verNum, bumpType) {

  // parse and find the int to tick
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

  return newVer;
};
