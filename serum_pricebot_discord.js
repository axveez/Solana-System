// AXVEEZ.COM
const {Discord, Guild, Client, Channel, GuildMemberManager} = require('discord.js');
const client = new Client();
const {Account, Connection, PublicKey} = require('@solana/web3.js');
const {Market} = require('@project-serum/serum');

client.login('BOT TOKEN'); // change here 

let connection = new Connection('https://api.mainnet-beta.solana.com/');
let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'); // Serum program v3 
let marketAddress = new PublicKey('MARKET ID'); //MARKET
const tokenName = 'TOKEN NAME';
const tokenSymbol = 'TOKEN SYMBOL';

client.on('ready', async () => {
  
    client.user.setActivity(`${ await getOrder()}`, {
      type: "WATCHING"
    });

    setInterval(async function () {
      client.user.setActivity(`${ await getOrder()}`, {
        type: "WATCHING"
      });

      var datetime = new Date();
      console.log('update price: ' + datetime);
    }, 10000);

    // uncomment if u want to change bot name every 1.5 hour

    // setInterval(async function () {
    //     client.user.setUsername("NAME");
    // }, 900000);
})

async function getOrder() {
    let market = await Market.load(connection, marketAddress, {}, programId);
    let bids = await market.loadBids(connection);

    let ask = await market.loadAsks(connection);
    return ` ↗ ${Number(ask.getL2(1)[0][0]).toFixed(3)} / ↙ ${Number(bids.getL2(1)[0][0]).toFixed(3)}`;
}