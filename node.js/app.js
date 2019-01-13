var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var tyoController = require('./tyoController');
var hbs = require("express-handlebars");
var mysql = require('mysql');
var session = require('express-session');

//SQL-yhteys
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laiterekisteri'
});
var sqlQuery;
connection.connect();

var app = express();

//Portti
var portVar = 3001;

var sessio;

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//View engine
app.engine("html", hbs({ extname: "html", layoutsDir: __dirname + "/views/layouts" }));
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/scripts'));


//Global vars
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
})

//Express validator
app.use(expressValidator());


/*******************
***** Reititys *****
********************/

//Tervehdys
app.get("/", function (req, res) {
    res.render("login", {
        message: "Tervehdys, netissä kulkija",
    });
})

app.get("/laite", function (req, res) {
    if (req.session.username == "admin") {
        res.render("laite", {
        });
    }
    else {
        res.render("eioikeutta", {
        });
    }
})

app.get("/hallinta", function (req, res) {
    if (req.session.username == "admin") {
        res.render("hallinta", {
        });
    }
    else {
        res.render("eioikeutta", {
        });
    }
})

app.get("/varaus", function (req, res) {

    res.render("varaus", {
    });
})
app.get("/yleis", function (req, res, sessio) {

    res.render("yleis", {
    });
})

//Uloskirjautuminen. Poistaa session käytöstä ja lähettää kirjautumis sivun selaimelle
app.get("/signout", function (req, res) {

    req.session.destroy();
    res.render("login", {
        message: "Kiitos käynnistä!"
    })
})

//Sisäänkirjautuminen
app.post("/login", function (req, res) {


    /*Jos käyttäjä on jo kirjautunut, niin päästetään hänet 
    takaisin kotisivulle käyttäjätietojen muokkauksen jälkeen.
    Käytetään siis kirjautumiseen käyttäjän id:tä, joka saadaan sessiosta*/
    if (req.session.numero != null)
        sqlQuery = 'SELECT * FROM kayttaja WHERE id = "' + req.session.numero + '"';
    /*Muuten otetaan data sisäänkirjautumisen bodystä */
    else
        sqlQuery = 'SELECT * FROM kayttaja WHERE tunnus = "' + req.body.username + '" AND salasana="' + req.body.password + '"';

    console.log("Sisäänkirjautuminen:\n " + sqlQuery);

    connection.query(sqlQuery, function (error, results, fields) {
        if (error) {
            console.log("Virhe haettaessa dataa kayttaja-taulusta, syy: " + error);
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            res.render("login", {
                message: "Kirjautuminen epäonnistui. Kysely tietokantaan epäonnistui.",
                condition: false,
            })
        }
        else if (results[0] == undefined) {
            console.log("Käyttäjää ei löytynyt");
            res.render("login", {
                message: " Tunnusta ei löytynyt, tai salasana ei vastaa käyttäjää.",
                condition: false,
                data: results,

            })
        }
        else {
            console.log("Löydettiin käyttäjä:\n" + JSON.stringify(results));

            res.statusCode = 200;

            req.session.username = results[0].tunnus;
            req.session.numero = results[0].id;
            req.session.password = results[0].salasana;
            req.session.realname = results[0].nimi;
            sessio = req.session;
            if (req.session.username == "admin") {
                res.render("kotisivuAdmin", {
                    title: "Kirjautuminen onnistui",
                    condition: true,
                    data: results,
                    loggedUser: req.session.username,
                    loggedUserNumero: req.session.numero,
                })
            }
            else {
                res.render("kotisivu", {
                    title: "Kirjautuminen onnistui",
                    condition: true,
                    data: results,
                    loggedUser: req.session.username,
                    loggedUserNumero: req.session.numero,

                })
            }
        }
    })
})

app.post("/createUser", function (req, res) {

    console.log("body (CREATE): " + JSON.stringify(req.body));
    var username = req.body.newusername;
    var password = req.body.newpassword;
    var realname = req.body.newrealname;


    connection.query('INSERT INTO kayttaja (tunnus, salasana, nimi) VALUES ("' + username + '", "' + password + '", "' + realname + '" )',
        function (error, results, fields) {
            console.log(error);
            if (error != null) {
                if (error.errno == 1062) {
                    res.render("login", {
                        message: "Käyttäjätunnus on käytössä.",
                        condition: false,
                    })
                }
            } else if (error) {
                res.render("login", {
                    message: "Tuntematon virhe.",
                    condition: false,
                })
            }
            else {
                console.log("Data = " + JSON.stringify(results));
                res.statusCode = 201;
                res.render("login", {
                    message: "Uusi käyttäjätunnus luotiin.",
                    condition: false,
                })
            }
        });
})

/**
 * Reitityksellä on tarkoitus hoitaa yhden entryn hakeminen, muokkaaminen ja poistaminen tietystä taulusta.
 * Osoitekenttään syötetään taulun nimi ja entryn id. Niitä voidaan käyttää koodissa metodilla req.params.taulu tai req.params.id.
 * Näin säästytään turhalta reitittämiseltä joka taululle erikseen ja tämä on REST-apin hienous.
 * 
 *  ESIMERKKI 
 *      http://localhost:3001/haeyksi/laite/1  
 *      hakee taulusta "laite" id:llä 1 
 */
app.route('/haeYksi/:taulu/:id')
    .get(function (req, res) {

        if (req.params.taulu == "kayttaja") {
            tyoController.fetchkayttaja(req, res, sessio);
        }
        else if (req.params.taulu == "varausnakyma2") {
            tyoController.fetchAdminVaraus(req, res);
        }
        //Käytetään varausten päivämäärien tarkistukseen
        //Tämä on laitettu eläkkeelle, koska bugin takia tämä route ei toiminut
        // else if (req.param.taulu == "varaus") {
        //     tyoController.fetchLaiteVaraukset(req, res);
        // }
        else {
            tyoController.fetchOne(req, res);
        }
    })
    .post(function (req, res) {
        if (req.params.taulu == "laite")
            tyoController.updateLaite(req, res);
        else if (req.params.taulu == "kayttaja")
            tyoController.updateKayttaja(req, res, sessio);
        else if (req.params.taulu == "varausnakyma2")
            tyoController.updateVaraus(req, res);
        else if (req.params.taulu == "varaus")
            tyoController.palautaVaraus(req, res);


    })
    .delete(function (req, res) {
        if (req.params.taulu == "laite")
            tyoController.deleteLaite(req, res);
        if (req.params.taulu == "varaus")
            tyoController.deleteVaraus(req, res);
    })
app.get('/laiteHistoria/:id', function (req, res) {
    tyoController.fetchLaiteHistoria(req, res);
})
app.route('/lisaaYksi/:taulu/:alku/:loppu/:id')
    .post(function (req, res) {
        if (req.params.taulu == "varaus")
            tyoController.luoVaraus(req, res, sessio);
    })

app.route('/lisaaYksi/:taulu/')
    .post(function (req, res) {
        if (req.params.taulu == "laite")
            tyoController.createLaite(req, res);
    })

app.get('/haeTaulu/:taulu', function (req, res) {
    tyoController.fetchTaulu(req, res);
})
//Haetaan varatut laitteet päivämäärien tarkastusta varten
app.get('/haeVaratutLaitteet/:id', function (req, res) {
    tyoController.fetchLaiteVaraukset(req, res);
})

app.route('/kotisivu')
    .get(function (req, res) {
        console.log(req.body.loggedUserTaso);
        tyoController.fetchTyot(req, res);
    })
    .post(function (req, res) {

    })

app.route('/fetchLaite/')
    .get(function (req, res) {
        tyoController.fetchLaite(req, res);
    })

app.route('/fetchLaitteet/:haku')
    .get(function (req, res) {
        tyoController.fetchLaitteet(req, res);
    })
app.route('/fetchVaraukset/:haku')
    .get(function (req, res) {
        tyoController.fetchVaraukset(req, res);
    })
app.route('/fetchVarauksetNyky/')
    .get(function (req, res) {
        tyoController.fetchVarauksetNyky(req, res, sessio);
    })
app.route('/fetchVarauksetMennyt/')
    .get(function (req, res) {
        tyoController.fetchVarauksetMennyt(req, res, sessio);
    })
app.route('/fetchVaraus/')
    .get(function (req, res) {
        tyoController.fetchVaraus(req, res);
    })
app.listen(portVar, function () {
    console.log("Server started at port " + portVar);
});