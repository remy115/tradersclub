const path=require('path')

module.exports={
    entry:'./src/app.js',
    module:{
        rules:[
            {test:/src\/.+\.jsx?$/,use:'babel-loader'}
        ]
    },
    output:{
        path:path.resolve(__dirname,'web/js'),
        filename:'bundle.js'
    }

}