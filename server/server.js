const express = require("express");
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

const bodyParser = require("body-parser");

const app = express();

var http = require("http").createServer(app);

//get database input
const sqliteJson = require('sqlite-json');
// var db = new sqlite3.Database('./mydb.sqlite3');
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

let db = new sqlite3.Database('slab.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ocs database.');
});

exporter = sqliteJson(db);

exporter.tables(function (err, tables) {

  console.log(tables)
  // tables === ['foo', 'bar', 'baz']
});



// db.serialize(() => {
//   db.each(`SELECT athlete_id as id,
//                   name as name
//            FROM Athlete`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
//   });
// });

let confirmOrder = "";

app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());


app.get(`/athlete`, async (req, res) => {
  exporter.json('SELECT * FROM Athlete INNER JOIN Game ON Game.game_id = AthleteResult.game_id INNER JOIN AthleteResult ON AthleteResult.athlete_id = Athlete.athlete_id INNER JOIN AthletePhoto ON Athlete.photo_id = AthletePhoto.photo_id ORDER BY AthleteResult.gold ASC, AthleteResult.silver ASC, AthleteResult.bronze ASC;', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    console.log(JSON.parse(json))
  });

});

app.get(`/athleteID`, async (req, res) => {

  exporter.json('SELECT * FROM Athlete INNER JOIN AthleteResult ON AthleteResult.athlete_id = Athlete.athlete_id INNER JOIN AthletePhoto ON Athlete.photo_id = AthletePhoto.photo_id WHERE Athlete.athlete_id =' + req.query.keywords + ' LIMIT 1', async function (err, idathlete) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(idathlete));
    } catch (err) {
      await res.json(err);
    }
    console.log(req.query.keywords)
    console.log(JSON.parse(idathlete))
  })

});

app.get(`/game`, async (req, res) => {
  exporter.json('select * FROM Game', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    // console.log(JSON.stringify(json))
  });

});

app.get(`/photo`, async (req, res) => {
  exporter.json('select * FROM AthletePhoto', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    // console.log(JSON.stringify(json))
  });

});

app.get(`/result`, async (req, res) => {
  exporter.json('select * FROM AthleteResult', async function (err, json) {
    // handle error or do something with the JSON
    // "[{"foo": 1}, {"foo": 2}, {"foo": 3}]"
    try {
      await res.json(JSON.parse(json));
    } catch (err) {
      await res.json(err);
    }
    // console.log(JSON.stringify(json))
  });

});
app.get("/addArticle", async function (req, res) {
  console.log(req.body.title);
  var foo = req.body
  db.serialize(function () {

    var stmt = db.prepare("INSERT INTO main (title,content) VALUES (" + JSON.stringify(req.body.title) + "," + JSON.stringify(req.body.content) + ")");
    stmt.run();

    stmt.finalize();
  });


  // db.close()
  res.send(JSON.stringify(foo))
})
var server = app.listen(process.env.PORT || 2800, () => {
  console.log("Howdy, I am running at PORT 2800");
});

