var mysql = require('mysql');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
    password: '',
    database: 'laiterekisteri'
});

/**
 * @param {Valmiiksi muodostettu SQL-lause} kysely 
 * @param {Data joka lähetetään selaimelle} res 
 */
function yhdistaTietokantaa(kysely, res) {

    console.log(kysely);

    connection.query(kysely, function (error, results, fields) {
        if (error) {
            console.log("Virhe haettaessa dataa, syy: " + error);
            res.json({ "status": 500, "error": error, "response": null });
        }
        else {
            console.log("Data: ");
            console.table(results);
            res.json({ "status": 100, "error": null, "response": results });
        }
    });
}
module.exports =
    {
        //Käydään hakemassa id:n perusteella dataa taulusta. Parametrit otetaan urlista.
        fetchOne: function (req, res) {
            //Luodaan tietokantakysely saatujen parametrien avulla
            let sqlQuery = 'SELECT * FROM ' + req.params.taulu + ' WHERE id = ' + req.params.id;

            console.log(JSON.stringify(req.params) + '\n' + sqlQuery);

            //Otetaan yhteys tietokantaan
            yhdistaTietokantaa(sqlQuery, res);

        },
        updateLaite: function (req, res) {
            let sqlQuery = 'UPDATE ' + req.params.taulu + ' SET ' +
                'kategoria_id ="' + req.body.kategoria_id + '", ' +
                'merkki ="' + req.body.merkki + '", ' +
                'malli ="' + req.body.malli + '", ' +
                'sijainti ="' + req.body.sijainti + '", ' +
                'omistaja_id ="' + req.body.omistaja_id + '" ' +

                'WHERE laite.id = ' + req.params.id;
            yhdistaTietokantaa(sqlQuery, res);
        },
        //Admin tekee palautuksen
        palautaVaraus: function (req, res) {
            let sqlQuery =
                'UPDATE varaus ' +
                'INNER JOIN laite ON laite.id = varaus.laite_id ' +
                'SET ' +
                'varaus.status = 1 ' + ', ' +
                'laite.status = 0 ' +

                'WHERE varaus.id = ' + req.params.id;

            yhdistaTietokantaa(sqlQuery, res);
        },

        deleteLaite: function (req, res) {
            let sqlQuery = 'DELETE FROM ' + req.params.taulu +
                ' WHERE laite.id = ' + req.params.id;

            yhdistaTietokantaa(sqlQuery, res);
        },
        createLaite: function (req, res) {

            console.log("body (CREATE): " + JSON.stringify(req.body));

            let sqlQuery = 'INSERT INTO ' + req.params.taulu + ' SET ' +
                'kategoria_id ="' + req.body.kategoria_id + '", ' +
                'merkki ="' + req.body.merkki + '", ' +
                'malli ="' + req.body.malli + '", ' +
                'sijainti ="' + req.body.sijainti + '", ' +
                'omistaja_id ="' + req.body.omistaja_id + '" ';
            yhdistaTietokantaa(sqlQuery, res);
        },

        luoVaraus: function (req, res, sessio) {
            let sqlQuery = 'INSERT INTO varaus (laite_id, kayttaja_id, alkupvm, loppupvm) VALUES ("' + req.params.id + '", "' + sessio.numero + '", "' + req.params.alku + '", "' + req.params.loppu + '")';
            yhdistaTietokantaa(sqlQuery, res);
        },

        deleteVaraus: function (req, res) {
            let sqlQuery = 'DELETE FROM ' + req.params.taulu +
                ' WHERE varaus.id = ' + req.params.id;

            yhdistaTietokantaa(sqlQuery, res);
        },

        fetchTaulu: function (req, res) {
            let sqlQuery = "SELECT * FROM " + req.params.taulu;
            yhdistaTietokantaa(sqlQuery, res);
        },

        fetchLaite: function (req, res) {
            let sqlQuery = 'SELECT * FROM laitenakyma';
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchLaitteet: function (req, res) {
            let sqlQuery = 'SELECT * FROM laitenakyma WHERE id LIKE "%' + req.params.haku + '%"OR malli LIKE "%' + req.params.haku + '%" OR merkki LIKE "%' + req.params.haku + '%" OR omistaja LIKE "%' + req.params.haku + '%" OR sijainti LIKE "%' + req.params.haku + '%" OR kategoria LIKE "%' + req.params.haku + '%" ';
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchVaraukset: function (req, res) {
            let sqlQuery = 'SELECT * FROM varausnakyma2 WHERE varausid LIKE "%' + req.params.haku + '%"OR malli LIKE "%' + req.params.haku + '%" OR merkki LIKE "%' + req.params.haku + '%" OR varaaja LIKE "%' + req.params.haku + '%"';
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchVarauksetNyky: function (req, res, sessio) {
            let sqlQuery = 'SELECT * FROM varausnakyma2 WHERE DATE(loppupvm) > CURDATE() AND kayttajaid = ' + sessio.numero;
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchVarauksetMennyt: function (req, res, sessio) {
            let sqlQuery = 'SELECT * FROM varausnakyma2 WHERE DATE(loppupvm) < CURDATE() AND kayttajaid = ' + sessio.numero;
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchVaraus: function (req, res) {
            let sqlQuery = 'SELECT * FROM varausnakyma2';
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchAdminVaraus: function (req, res) {
            let sqlQuery = 'SELECT * FROM varausnakyma2 WHERE varausid =' + req.params.id;
            yhdistaTietokantaa(sqlQuery, res);
        },

        fetchkayttaja: function (req, res, sessio) {
            console.log(sessio);

            //Luodaan tietokantakysely saatujen parametrien avulla
            let sqlQuery = 'SELECT * FROM ' + req.params.taulu + ' WHERE id = ' + sessio.numero;

            console.log(JSON.stringify(req.params) + '\n' + sqlQuery);

            //Otetaan yhteys tietokantaan
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchLaiteVaraukset: function (req, res) {
            console.log('\x1b[36m%s\x1b[0m', "Tulit hakemaan varaukset")
            let sqlQuery = 'SELECT * FROM varaus' + ' WHERE laite_id = ' + req.params.id;
            yhdistaTietokantaa(sqlQuery, res);
        },
        fetchLaiteHistoria:function(req,res){
            let sqlQuery = 'SELECT * FROM varausnakyma2' + ' WHERE laiteid = ' + req.params.id;
            yhdistaTietokantaa(sqlQuery, res);

        },

        updateKayttaja: function (req, res, sessio) {

            //Päivitetään sessio saaduilla tiedoilla
            req.session.username = req.body.tunnus;
            req.session.realname = req.body.nimi;
            req.session.password = req.body.salasana;

            let sqlQuery = 'UPDATE ' + req.params.taulu + ' SET ' +
                'tunnus ="' + req.body.tunnus + '", ' +
                'salasana ="' + req.body.salasana + '", ' +
                'nimi ="' + req.body.nimi + '" ' +
                'WHERE kayttaja.id = ' + sessio.numero;

            yhdistaTietokantaa(sqlQuery, res);

        },

        updateVaraus: function (req, res) {

            let sqlQuery =
                'UPDATE ' + 'varaus ' +
                'INNER JOIN laite ON laite.id = varaus.laite_id ' +
                'SET ' +

                'varaus.alkupvm ="' + req.body.alkupvm + '" ' + ',' +
                'varaus.loppupvm ="' + req.body.loppupvm + '" ' + ',' +
                'laite.status = ' + req.body.status + ' ' + ',' ;
            if (req.body.status == 1) {
                sqlQuery += 'varaus.status = ' + "2" + ' ' +
                    'WHERE varaus.id = ' + req.params.id + ';';
            } else 
            sqlQuery += 'varaus.status = ' + "0" + ' ' +
                'WHERE varaus.id = ' + req.params.id + ';';


            yhdistaTietokantaa(sqlQuery, res);
        }
    }
