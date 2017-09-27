const express=require('express')
const app=express();

app.use(express.static('./web'));

// app.get('/',function(req,res) {

// });

app.listen(3010,()=>{
    console.log('Listening on 3010');
});