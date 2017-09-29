const https=require('https');
const querystring=require('querystring');
const bodyParser=require('body-parser');
const express=require('express');
const app=express();

app.use(express.static('./web'));
app.use(bodyParser.urlencoded({extended:true}));
// app.get('/',function(req,res) {

// });

app.get('/veiculos',function(req,res) {
    res.set('Content-Type','application/json');
    console.log(req.query);
    const query=req.query;
    var path='';
    if(query.filters) {
        // path='/?filters='+query.filters;
        path='/?'+querystring.stringify(query);
    }
    const req2=https.request({
        hostname:'consulta-veiculos.nimble.com.br',
        path:'/v1/veiculos'+path
    },(res2)=>{
        res2.pipe(res);
    });

    req2.end();
});

app.put('/veiculos',function(req,res) {
    // res.json(req.body);
    res.set('Content-Type','application/json');
    const id=req.body.id;
    const data=querystring.stringify(req.body);
    // https://consulta-veiculos.nimble.com.br/v1/veiculos/592323288c1747deadc89ad8
    const req2=https.request({
        hostname:'consulta-veiculos.nimble.com.br',
        path:'/v1/veiculos/'+id,
        method:'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    },(res2)=>{
        res2.pipe(res);
    });
    req2.write(data);
    req2.end();
});

app.post('/veiculos',function(req,res) {
    // res.json(req.body);
    res.set('Content-Type','application/json');
    const data=querystring.stringify(req.body);
    // https://consulta-veiculos.nimble.com.br/v1/veiculos/592323288c1747deadc89ad8
    const req2=https.request({
        hostname:'consulta-veiculos.nimble.com.br',
        path:'/v1/veiculos',
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    },(res2)=>{
        res2.pipe(res);
    });
    req2.write(data);
    req2.end();
});

app.listen(3010,()=>{
    console.log('Listening on 3010');
});