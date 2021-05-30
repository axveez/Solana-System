/*MADE BY AXVEEZ*/
const {Discord, Guild, Client, Channel, GuildMemberManager} = require('discord.js');
const client = new Client();
const {Account, Connection, PublicKey} = require('@solana/web3.js');
const {Market} = require('@project-serum/serum');

// Discord bot ID
client.login('BOT TOKEN'); // change here 
let channelid = "822300897777287189";

let arr_donepost = Array();

let connection = new Connection('https://api.mainnet.rpcpool.com/');
let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'); // Serum program v3
// Serum Market ID
let marketAddress = new PublicKey('MARKET ID'); // MARKET

let treshold = "0"; //TRESHOLD
let token_name = "$TOKENNAME"; //TOKENNAME

client.on('ready', async () => {
  

  setInterval(async function () {
    for(const val of await getTrade()) {
        // console.log(val)
        client.channels.cache.get(`${channelid}`).send(`${val}`)
    }
  }, 5000);



})

async function getTrade() {
    let market = await Market.load(connection, marketAddress, {}, programId);
    let fills = await market.loadFills(connection);
    let bigorder = Array();
    let last_release = 0;

    var count = 1;
    for (let fill of fills) {
      if (fill.eventFlags.bid==true) {
        if (fill.eventFlags.maker==false) {
          text_side ="Bought"
          side = "buy"
        }else{
          text_side ="Sell"
          side = "sell"
        }
        if(side=='buy'){ //buy only
          if(fill.size>=treshold){ 
            if(arr_donepost.includes(`${fill.orderId}`)){
              // NOthing here
            }else{
              
              bigorder.push(`🔥  Big Trade Alert! someone ${text_side} ${parseFloat(fill.size)} ${token_name} @${fill.price}`); 
              arr_donepost.push(`${fill.orderId}`)
              console.log(fill.feeCost) 
            }
          }
        }
      }
    }
    console.log(bigorder)
    return bigorder
}
