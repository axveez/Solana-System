/*MADE BY AXVEEZ*/
const {Discord, Guild, Client, Channel, GuildMemberManager} = require('discord.js');
const client = new Client();
const {Account, Connection, PublicKey} = require('@solana/web3.js');
const {Market} = require('@project-serum/serum');
var fs = require('fs');

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

let filename = "orderbook.txt";

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
    let orderarr = await readfile();


    var count = 1;
    for (let fill of fills) {
      if(fill.side=="buy"){
        if(fill.size>=treshold){
          if(orderarr.includes(`${fill.orderId}`)){
            // NOthing here
          }else{

            bigorder.push(`🔥   Big Trade Alert! someone has bought ${fill.size} $TOKENNAME @${fill.price}`); 
            arr_donepost.push(`${fill.orderId}`)
            // console.log(`🔥  Big Trade Alert! someone BUYING ${fill.size} TOKENNAME`) 
            fs.appendFileSync(filename, `${fill.orderId}\n`);
          }
        }
      }
    }
    console.log(bigorder)
    return bigorder
}

const readfile = () => new Promise((resolve, reject) => {
  fs.open(filename,'r',function(err, fd){
    if (err) {
      fs.writeFile(filename, '', function(err) {
          if(err) {
              console.log(err);
          }
          console.log("The file was saved!");
      });
    } else {
      fs.readFile(filename, 'utf8', function(err, data){
          if (err){
              throw err;
          }
          var linesCount = data.split("\n").length;
          var all_line = data.split("\n");
          resolve(all_line);
      });
    }
  });
  
})