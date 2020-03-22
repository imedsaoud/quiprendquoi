const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios')


app.listen(process.env.PORT, () => console.log(`Front app listening on port ${process.env.PORT} !`));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', { title: 'Qui prend quoi ?' });
});



app.post('/party', function(req, res) {
  axios
  .post(`${process.env.API_URL}/party`, req.body)
  .then(({ data }) => res.redirect(`/party/${data._id}`))
  .catch((err) => res.send(err));
});

app.get('/party/:id', function(req, res) {
  axios
  .get(`${process.env.API_URL}/party/${req.params.id}`)
  .then(({ data } ) =>
    res.render('party', {
      party: data,
      title: data.name,
      items: data.items,
      url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`
    }),
  )
  .catch((err) => console.log(err));
});

app.post('/party/:id/item', function(req, res) {
  axios
  .post(`${process.env.API_URL}/party/${req.params.id}/items`, req.body)
  .then( res.redirect(`/party/${req.params.id}`))
  .catch((err) => res.send(err));
});

app.post('/party/:id/items/:itemId/delete', function(req, res) { 
  axios
  .delete(`${process.env.API_URL}/party/${req.params.id}/items/${req.params.itemId}`, req.body)
  .then( res.redirect(`/party/${req.params.id}`))
  .catch((err) => res.send(err));
});




