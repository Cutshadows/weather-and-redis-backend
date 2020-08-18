const express=require('express');
const cors=require('cors');
const app=express();
const {config}=require('./config');


//use bodyparser
app.use(cors());
app.use(express.json({extended:true}));
//puerto de la app


//pagina principal
const searchRoute=require('./routes/search');
app.use('/api/search', searchRoute);


app.listen(config.PORT_CONFIG, ()=>{
    console.log(`Esta funcionando en el puerto ${config.PORT_CONFIG}`);
})
