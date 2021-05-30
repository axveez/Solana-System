/*MADE BY AXVEEZ*/
const {Discord, Guild, Client, Channel, GuildMemberManager} = require('discord.js');
const client = new Client();
const {Account, Connection, PublicKey} = require('@solana/web3.js');
const {Market} = require('@project-serum/serum');


// Discord bot ID
client.login('BOT TOKEN'); // change here 
let channelid = "Channel ID";

// let connection = new Connection('https://api.mainnet-beta.solana.com/');
let connection = new Connection('https://api.mainnet.rpcpool.com/');
let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'); // Serum program v3
// Serum Market ID
let marketAddress = new PublicKey('Market Addrees'); // MARKET

let treshold = "500";
let arr_donepost = Array();

client.on('ready', async () => {
  


  setInterval(async function () {
    for(const val of await getTrade()) {
        // console.log(val)
        client.channels.cache.get(`${channelid}`).send(`${val}`)
    }
  }, 10000);



})

async function getTrade() {
    let market = await Market.load(connection, marketAddress, {}, programId);
    let fills = await market.loadFills(connection);
    let bigorder = Array();


    var count = 1;
    for (let fill of fills) {
      if(fill.side=="buy"){
        if(fill.size>=treshold){
          if(typeof(arr_donepost.find( (name) => name === `${fill.orderId}` )) === 'undefined'){

            bigorder.push(`🔥   Big Trade Alert! someone has bought ${fill.size} $TOKENNAME @${fill.price}`); 
            arr_donepost.push(`${fill.orderId}`)
            console.log("POST") 

          }else{
            console.log('DUPLICATED');
          }
        }
      }
    }
    return bigorder
}

// NOTUSE