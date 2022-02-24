const { assert } = require('chai');

const Token = artifacts.require('Token');

require('chai').use(require('chai-as-promised')).should();


contract('Token', () => {
  
  let contract;

  before(async () => {
      contract = await Token.deployed();
  })

  describe('Deployed', () => {
    it('Should Deployed', async () => {
      const address = await contract.address;
      console.log(address);
      assert(address != null, "Address was null");
    })
  })
  describe('Mint & Transfer', () => {
    it('Should mint', async () => {
        const admin = await contract.admin();
      await contract.mint(330, admin);
      console.log('balance checked');
      const balance = await contract.balanceOf(admin);
      const bal = parseInt(balance);
      console.log(bal);
      assert(bal === 330, "Error in minting or checking");
    })
    it('Should transfer', async () => {
        const admin = await contract.admin();
        await contract.mint(330, admin);
        await contract.transfer(admin, admin, 10);           
        console.log('balance checked');
    })
  })

})
