const template=require("./template");
const fs = require('fs');
const pdf = require('html-pdf');
const options = { format: 'Letter' };


fs.readFile('./businesscard.html',(err,data)=>{

    if (err){console.log(err)
    return };

    console.log(data);
    pdf.create(data, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/businesscard.pdf' }
    })

});