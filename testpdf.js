const template=require("./template");
const fs = require('fs');
const pdf = require('html-pdf');
const options = { format: 'Letter' };

const html=template.usrProfile("Marco","Asurion","Richmond, VA","Doing cool stuff",1,1,1,1);

pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/businesscard.pdf' }
});