import "@nomiclabs/hardhat-waffle";
import {ethers} from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const TestGotchi = await ethers.getContractFactory("TestGotchi");
  const testGotchi = await TestGotchi.deploy();


  let h1brs: (number)[] = [];
  let h2brs: (number)[] = [];

  for(let i = 0; i < 100000; i++) {
    const traits: (number)[] = await testGotchi.toNumericTraits(i, [0, 0, 0, 0, 0, 0], 1);
    let brs = 0;
    for(let j = 0; j < 6; j++) {
      const trait = traits[j];
      if (trait < 50) {
        brs += 100 - trait;
      }
      else {
        brs += trait + 1;
      }
    }
    if(brs > 510) {
      h1brs.push(brs);
    }
  }
  h1brs.sort();
  h1brs.reverse();
  console.log("Haunt 1 BRS");
  console.log(h1brs);

  for(let i = 0; i < 100000; i++) {
    const traits: (number)[] = await testGotchi.toNumericTraits(i, [0, 0, 0, 0, 0, 0], 2);
    let brs = 0;
    for(let j = 0; j < 6; j++) {
      const trait = traits[j];
      if (trait < 50) {
        brs += 100 - trait;
      }
      else {
        brs += trait + 1;
      }
    }
    if(brs > 510) {
      h2brs.push(brs);
    }
  }
  h2brs.sort();
  h2brs.reverse();

  console.log("Haunt 2 BRS");
  console.log(h2brs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
