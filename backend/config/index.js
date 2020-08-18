require('dotenv').config({path:'.env'});

const config={
    PORT_CONFIG:process.env.PORT || 3000,
    REDIS_PORT:process.env.REDIS_PORT, 
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
}

module.exports={config};