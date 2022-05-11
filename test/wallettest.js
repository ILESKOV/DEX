const DEX = artifacts.require("DEX");
const KCS = artifacts.require("KCS");
const truffleAssert = require('truffle-assertions');

contract.skip("DEX", accounts => {
    it("should only be possible for owner to add tokens", async () =>{
        let dex = await DEX.deployed();
        let kcs = await KCS.deployed();     
        await truffleAssert.passes(
        dex.addToken(web3.utils.fromUtf8("KCS"), kcs.address, {from: accounts[0]})
        )
        await truffleAssert.reverts(
            dex.addToken(web3.utils.fromUtf8("KCS"), kcs.address, {from: accounts[1]})
        )
    })
    it("should handle deposits correctly", async () => {
        let dex = await DEX.deployed()
        let kcs = await KCS.deployed()
        await kcs.approve(dex.address, 500);
        await dex.deposit(100, web3.utils.fromUtf8("KCS"));
        let balance = await dex.balances(accounts[0], web3.utils.fromUtf8("KCS"));
        assert.equal(balance.toNumber() , 100)
        
    })
    it("should handle faulty withdrawals correctly", async () => {
        let dex = await DEX.deployed()
        let kcs = await KCS.deployed()
        await truffleAssert.reverts(
            dex.withdraw(500, web3.utils.fromUtf8("KCS"))
        )
    })
    it("should handle correct withdrawals correctly", async () => {
        let dex = await DEX.deployed()
        let kcs = await KCS.deployed()
        await truffleAssert.passes(
            dex.withdraw(100, web3.utils.fromUtf8("KCS"))
        )
    })
})