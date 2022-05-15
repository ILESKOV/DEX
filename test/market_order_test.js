const DEX = artifacts.require("DEX")
const KCS = artifacts.require("KCS")
const truffleAssert = require('truffle-assertions');

contract("DEX", accounts => {
    //When creating a SELL market order, the seller needs to have enough tokens for the trade
    it("should throw an error if token balance is too low when creating SELL market order", async () => {
        let dex = await DEX.deployed()
        let kcs = await KCS.deployed()
        await truffleAssert.reverts(
            dex.createMarketOrder(1, web3.utils.fromUtf8("KCS"), 10)
        )
        await dex.deposit(300, web3.utils.fromUtf8("KCS"))
        await truffleAssert.passes(
            dex.createMarketOrder(1, web3.utils.fromUtf8("KCS"), 10)
        )
    })
    //When creating a BUY market order, the buyer needs to have enough ETH for the trade
    it("should throw an error if ETH balance is too low when creating BUY market order", async () => {
        let dex = await DEX.deployed()
        let kcs = await KCS.deployed()
        await truffleAssert.reverts(
            dex.createMarketOrder(0, web3.utils.fromUtf8("KCS"), 10)
        )
        await dex.depositEth({value:10})
        await truffleAssert.passes(
            dex.createMarketOrder(0, web3.utils.fromUtf8("KCS"), 10)
        )
    })
    //Market orders can be submitted even if the order book is empty
    //Market orders should be filled until the order book is empty or the market order is 100% filled
    //The eth balance of the buyer should decrease with the filled amount
    //The token balances of the limit order sellers should decrease with the filled amounts
    //Filled limit order should be removed from the orderbook