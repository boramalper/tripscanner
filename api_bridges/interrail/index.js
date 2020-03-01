const interrail = require('interrail');
const express = require('express');

const app = express();
app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.render('index.pug', { youAreUsingPug: true })
});

app.get("/api/stations", function (req, res) {
    const query = req.query.query;

    interrail.stations.search(query, { results: 1 }).then(response => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});

app.get("/api/journeys", function (req, res) {
    const fromStationId = req.query.from;
    const toStationId = req.query.to;
    const isoDate = req.query.date;

    interrail.journeys(fromStationId, toStationId, { when: new Date(isoDate), results: 1 }).then(response => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});



const berlin = '8065969'; // station id
const ljubljana = { // FPTF station
    type: 'station',
    id: '7942300',
    name: 'Ljubljana'
    // …
};



app.listen(3000);
