const {config}=require('./index');
const redis=require('redis');


const clientRedis=redis.createClient({
    port:config.REDIS_PORT,
    host:config.REDIS_HOST,
    no_ready_check: true,
    auth_pass:config.REDIS_PASSWORD
})

clientRedis.on("error", (error) => {
    console.error(error);
   });
clientRedis.on('connect', () => {   
    console.log("connected");
});


module.exports={clientRedis};