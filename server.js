const unirest = require('unirest')
const express = require('express');
require('dotenv').config() 
const app = express();

//Init Middlewaer
app.use(express.json({ extended: false}));

app.get('/', (req, res) => 
	res.json({msg:'Hello World'})
)

//Define routes
// app.use('/api/users', require('./routes/users'))
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/contacts', require('./routes/contacts'))
app.get('/api/places/:query', (req, res)=>{
	unirest
	.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/NL/EUR/en-US/?query=${req.params.query}`)
	.header("X-RapidAPI-Host", process.env.APIHOST)
	.header("X-RapidAPI-Key", process.env.APIKEY)
	.end(function (result) {
	  res.json(result.body);
	});
})

app.post('/api/browse_price', (req, res)=>{
	unirest
	.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/NL/EUR/en-US/${req.body.selectedDeparture}/${req.body.selectedReturn}/${req.body.departure_date}/${req.body.return_date}`)
	.header("X-RapidAPI-Host", process.env.APIHOST)
	.header("X-RapidAPI-Key", process.env.APIKEY)
	.end(function (result) {
	  res.json(result.body);
	});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))