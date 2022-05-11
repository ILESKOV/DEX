const KCS = artifacts.require("KCS");
const DEX = artifacts.require("DEX");

module.exports = async function (deployer, network ,accounts) {
  await deployer.deploy(KCS);

  // let dex = await DEX.deployed();
  // let kcs = await KCS.deployed();

  // await kcs.approve(dex.address, 500);
  // dex.addToken(web3.utils.fromUtf8("KCS"), kcs.address);
  // await dex.deposit(100, web3.utils.fromUtf8("KCS"));
  // let balanceOfKCS = await dex.balances(accounts[0], web3.utils.fromUtf8("KCS"));
  // console.log(balanceOfKCS);

};