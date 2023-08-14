const express = require('express');
const mongoose = require('mongoose');
const redis =require('redis')
const os =require('os') ;
// const { Client } = require('pg')
// init app
const PORT = process.env.PORT || 4000;
const app = express();


// connect db
const DB_USER ='root';
const DB_PASSWORD ='example';
const DB_PORT=27017;
const DB_HOST='mongo';
const URL=(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`) ;
mongoose
    .connect(URL)
    .then(()=> console.log("connected to db..."))
    .catch((err)=> console.log("fail connection to db",err));


// connect to redis 
const REDIS_PORT= '6379';
const REDIS_HOST= 'redis';
const URL1={url: `redis://${REDIS_HOST}:${REDIS_PORT}`} ;
const redisClient = redis.createClient(URL1);
redisClient.on('error',(err) => console.log('redis client error',err));
redisClient.on('connect',() => console.log('connected to redis...'));
redisClient.connect();

app.get('/', (req, res) =>{
    redisClient.set('products','Shams international');
    console.log(`traffic from ${os.hostname}`)
    res.send("<hl> Hello Shams  i'm so proud of you be modest please from docker hub<hl>")});
app.get('/data', async (req, res) =>{
    const products = await redisClient.get('products');
    res.send(`<hl> Hello Shams  i'm so proud of you keep it up  <hl> <h2>${products}<h2>`);
});
app.listen(PORT, () => console.log(`app 15 up and running on port:,${PORT}`));

// connection postgres
// PGUSER='root'
// PGHOST= 'postgres'
// PGPASSWORD='example'
// PGDATABASE='mydb'
// PGPORT= 5432


// const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}`
// const client = new Client({
//     connectionString,
// })
// client
// .connect()
// .then(()=> console.log("connect to postgress db"))
// .catch((err)=> console.log("fail connection to postgress db",err));