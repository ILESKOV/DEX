const KCS = artifacts.require("KCS");
const Wallet = artifacts.require("Wallet");

module.exports = async function (deployer, network ,accounts) {
  deployer.deploy(KCS);

  let wallet = await Wallet.deployed();
  let kcs = await KCS.deployed();

  await kcs.approve(wallet.address, 200);
  wallet.addToken(web3.utils.fromUtf8("KCS"), kcs.address);
  await wallet.deposit(100, web3.utils.fromUtf8("KCS"));
  let balanceOfKCS = await wallet.balances(accounts[0], web3.utils.fromUtf8("KCS"));
  console.log(balanceOfKCS);

};