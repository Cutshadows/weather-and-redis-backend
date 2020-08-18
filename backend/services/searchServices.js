const axios =require('axios');
const {clientRedis}=require('../config/redis');
const NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: 'google',
 // fetch: 'GET',
  apiKey: process.env.API_KEY_GOOGLE, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);


exports.searchLocation=async(req, res)=>{
    clientRedis.on("error", (error)=>{
        console.warn(error);
    })
    const [busqueda]=req.body;
    const {lat, lng, time}=busqueda;

    const geocodeReverse = await geocoder.reverse({
        lat,
        lon:lng
    });
    
    const {country, countryCode, administrativeLevels} =geocodeReverse[0];
    const location=`${administrativeLevels.level2long}, ${country} ${countryCode}`;
    const api_key=process.env.API_KEY_WEATHER;
    const fecha=`${new Date().toLocaleDateString().split("/")}T00`;
    const urlApi=new URL(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?aggregateHours=24&combinationMethod=aggregate&startDateTime=${fecha}%3A00%3A00&endDateTime=${fecha}%3A00%3A00&collectStationContributions=true&maxStations=1&maxDistance=16093.4&includeNormals=false&contentType=json&unitGroup=us&locationMode=array&key=${api_key}&locations=${location}`);

    
    try{
        clientRedis.get(busqueda, async(err, recipient)=>{
            if(recipient){
                return res.status(200).json({
                    msg:`respuesta desde el cache ${recipient}`,
                    busqueda:JSON.parse(recipient)
                })
            }else{
                

                const requestAxios=await axios.get(urlApi.href);
                console.log(requestAxios.data);
                //clientRedis.set(busqueda, requestAxios.locations)

                res.status(200).json({
                    msg:"busqueda desde la api",
                });

            }

        })

       

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
 
}