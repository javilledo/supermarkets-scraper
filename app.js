const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
require('dotenv').config();
const fs = require('fs');
const writeStream = fs.createWriteStream('devBlog.csv');

const port = process.env.PORT || 4000;

const app = express();


axios.get('https://dev.to/')
    .then(res => {
        const $ = cheerio.load(res.data)
        $('.crayons-story').each((index, element) => {

            const author = $(element).find('.profile-preview-card__trigger').text().replace(/\s\s+/g, '')
            const blogTitle = $(element).find('.crayons-story__title').text().replace(/\s\s+/g, '')
            const blogLink = $(element).find('a').attr('href');
            const readTime = $(element).find('.crayons-story__tertiary').text()
            const dev = 'https://dev.to'
            const joinedBlogLink = `${dev}` + `${blogLink}`;
        });


    }).catch(err => console.error(err))

app.get('/', function(req, res) {
res.json({ mensaje: '¡Hola Mundo!' })   
})

//Listen to server
app.listen(port, () => {
    console.log(`Server Established and  running on Port ⚡${port}`)
})