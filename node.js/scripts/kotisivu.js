//Globaalit muuttujat
var IsAjaxExecuting = false;
var url;
var laiteId;

//Formatoidaan tietokannan päivämäärä suomalaiseen muotoon
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('.');
}
//Formatoidaan suomalainenpäivämäärä tietokantamuotoon
function formatoiPaiva(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
//Vie varaus tauluun uuden arvon statukseen
function merkkaaPalautetuksi(varausID) {
    if (IsAjaxExecuting) return;
    IsAjaxExecuting = true;
    $.post("http://localhost:3001/haeyksi/varaus/" + varausID + "/")
        .done(function (data, status, error) {
            IsAjaxExecuting = false; // new code
            console.log("Lähetys onnistui" + error);
            haeVaraukset();
        })
}
function historiaLaite(laiteId) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/laiteHistoria/" + laiteId + "/";
        resolve();
    })
    urlinTeko
        .then(function () {
            $.get(url)
                .done(function (data, status, error) {
                    console.log(data.response[0]);

                    $("#laiteHistoriaTaulu").children().remove();
                    //Luodaan taulu saadusta datasta
                    var ylaRivi =
                        "<thead><tr><th>Varaus</th>" +
                        "<th>Varaaja</th>" +
                        "<th>Alkupvm</th>" +
                        "<th>Loppupvm</th>" +
                        "<th>Status</th>" +
                        "</tr></thead><tbody>";
                    $("#laiteHistoriaTaulu").append(ylaRivi);
                    for (var i = 0; i < data.response.length; i++) {
                        var id = data.response[i].varausid;
                        var varaaja = data.response[i].varaaja;
                        var merkki = data.response[i].merkki;
                        var malli = data.response[i].malli;
                        var alkupvm = data.response[i].alkupvm;
                        var loppupvm = data.response[i].loppupvm;
                        var kategoria = data.response[i].kategoria;
                        var status = data.response[i].status.data[0];
                        var varausstatus = data.response[i].varausstatus;
                        var laiteId = data.response[i].laiteid;

                        alkupvm = formatDate(alkupvm);
                        loppupvm = formatDate(loppupvm);

                        var rivi =
                            '<tr><td>' + id +
                            "</td><td>" + varaaja +
                            "</td><td>" + alkupvm +
                            "</td><td>" + loppupvm;
                        if (varausstatus == 1)
                            rivi += "</td><td>Palautettu";
                        else if (varausstatus == 2)
                            rivi += "</td><td>Lainassa";

                        else if (varausstatus == 0)
                            rivi += "</td><td>Varattu";

                        rivi += '</td></tr>';


                        $("#laiteHistoriaTaulu").append(rivi);
                    }
                })
                .fail(function (error) {
                    console.log(error);
                })

        })
};

//Avataan muokkaa formi 
function muokkaaLaite(laiteId) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/haeyksi/" + "laite/" + laiteId;
        resolve();
    })
    urlinTeko
        .then(function () {
            //Käydään laitekategoriat selectiin
            $.get("http://localhost:3001/haetaulu/kategoria")
                .done(function (data, status, error) {
                    console.log(data);

                    //Populeitataan select
                    var $dropdown = $("#laiteKategoriat");
                    $.each(data.response, function () {
                        $dropdown.append($("<option />").val(this.id).text(this.kategoria));
                    });
                })
                .fail(function (error) {
                    console.log(error);
                })

            //Käydään omistajat selectiin
            $.get("http://localhost:3001/haetaulu/omistaja/")
                .done(function (data, status, error) {
                    console.log(data);

                    //Populeitataan select
                    var $dropdown = $("#laiteOmistaja");
                    $.each(data.response, function () {
                        $dropdown.append($("<option />").val(this.id).text(this.nimi));
                    });
                })
                .fail(function (error) {
                    console.log(error);
                })

            /*
             * Pohjustetaan formi
             */
            $.get(url)
                .done(function (data, status, error) {
                    console.log("Data käyty formiin\n:" + data.response[0]);

                    var i = 1;
                    //Täytetään text inputit
                    $("#laiteMuokkausTaulu input[type=text]").each(function () {
                        i++;
                        this.value = Object.values(data.response[0])[i];
                    });

                    //Valitaan oikea vaihtoehto selectistä
                    $("#laiteKategoriat").val(data.response[0].kategoria_id);
                    $("#laiteOmistaja").val(data.response[0].omistaja_id);
                })
                .fail(function (error) {
                    console.log(error);
                })

        })

    /*
    *Lähetetään muokattu data
    */
    $("#laiMuokSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti
        var lahetys = $("#laiteMuokkausFormi").serialize();

        console.log("Data lähtee \n" + lahetys);
        $.post(url, lahetys)
            .done(function (data, status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);
                $('#suljeMuokkausDialog').click();
                haeLaitteet();
            })
            .fail(function (error) {
                console.log(error);
            })
            .always(function () {
            })
    })
};

function poistaLaite(laiteId) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/haeyksi/" + "laite/" + laiteId;
        resolve();
    })
    urlinTeko
        .then(function () {
            $.get(url)
                .done(function (data) {

                    console.log("Käytiin poistettava laite:\n" + JSON.stringify(data));
                    var poistettavanLaitteenTiedot;
                    poistettavanLaitteenTiedot =
                        data.response[0].merkki + " " + "id:" +
                        data.response[0].id + " " +
                        data.response[0].malli;
                    $('#poistettavaLaite').text(poistettavanLaitteenTiedot);
                })
        })
    $("#laiPoisSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti
        console.log("Poisto kutsu lähtee");
        $.ajax({
            url: url,
            type: 'delete',
            success: function (status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);
                $('#suljePoistoDialog').click();
                haeLaitteet();
            }
        })
            .fail(function (error) {
                console.log(error);
            })
    })

};

function lisaaLaite() {
    let url = "http://localhost:3001/lisaaYksi/" + "laite/";
    //Käydään laitekategoriat selectiin
    $.get("http://localhost:3001/haetaulu/kategoria")
        .done(function (data, status, error) {
            console.log(data);

            //Populeitataan select
            var $dropdown = $("#laiteLisKategoria");
            $.each(data.response, function () {
                $dropdown.append($("<option />").val(this.id).text(this.kategoria));
            });
        })
        .fail(function (error) {
            console.log(error);
        })

    //Käydään omistajat selectiin
    $.get("http://localhost:3001/haetaulu/omistaja/")
        .done(function (data, status, error) {
            console.log(data);

            //Populeitataan select
            var $dropdown = $("#laiteLisOmistaja");
            $.each(data.response, function () {
                $dropdown.append($("<option />").val(this.id).text(this.nimi));
            });
        })
        .fail(function (error) {
            console.log(error);
        })


    /*
    *Lähetetään muokattu data
    */
    $("#laiLisSub").click(function () {
        if (IsAjaxExecuting) return; // new code
        IsAjaxExecuting = true; // new code        // $('#muokkaus').modal('toggle'); //or  $('#IDModal').modal('hide');
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti
        var lahetys = $("#laiteLisaysFormi").serialize();

        console.log("Data lähtee \n" + lahetys);
        $.post(url, lahetys)
            .done(function (data, status, error) {
                IsAjaxExecuting = false; // new code
                console.log("Lähetys onnistui" + error);
                $("#lisays").hide();
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                haeLaitteet();
            })

            .fail(function (error) {
                console.log(error);
            })
            .always(function () {
            })
    });

};

function poistaVaraus(varausId) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/haeyksi/" + "varaus/" + varausId;
        resolve();
    })
    urlinTeko
        .then(function () {
            $.get(url)
                .done(function (data) {
                })
        })
    $("#varPoisSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti

        console.log("Poisto kutsu lähtee");
        $.ajax({
            url: url,
            type: 'delete',
            success: function (status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);
                $('#poistoVaraus').click();
                haeMenneetVaraukset();
                haeNykyVaraukset();
            }
        })
            .fail(function (error) {
                console.log(error);
            })
    })
};

function muokkaaVaraus(varausId) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/haeyksi/" + "varausnakyma2/" + varausId;
        resolve();
    })
    urlinTeko
        .then(function () {
            if (IsAjaxExecuting) return;
            IsAjaxExecuting = true;
            //Pohjustetaan formi
            $.get(url)
                .done(function (data, status, error) {
                    console.log("Data käyty formiin\n:" + data.response[0]);
                    IsAjaxExecuting = false;
                    var i = 4;
                    //Täytetään text inputit
                    $("#varausMuokkausTaulu input[type=text]").each(function () {
                        i++;
                        this.value = Object.values(data.response[0])[i];
                        this.value = formatoiPaiva(this.value);
                    });
                    console.log(data.response[0]);
                    //Valitaan oikea vaihtoehto selectistä
                    $("#varausStatus").val(data.response[0].status.data[0]);
                    $("#varausStatus").hide();

                })
                .fail(function (error) {
                    console.log(error);
                })
        })

    /*
    *Lähetetään muokattu data
    */
    $("#varMuokSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti
        var lahetys = $("#varausMuokkausFormi").serialize();

        console.log("Data lähtee \n");
        console.log(lahetys);
        $.post(url, lahetys)
            .done(function (data, status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);
                $('#suljeVarausMuokkausDialog').click();
                haeNykyVaraukset();
            })
            .fail(function (error) {
                console.log(error);
            })
            .always(function () {
            })
    })
};

function adminPoistaVaraus(varausId) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/haeyksi/" + "varaus/" + varausId;
        resolve();
    })
    urlinTeko
        .then(function () {
            $.get(url)
                .done(function (data) {
                })
        })
    $("#adminVarPoisSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti

        console.log("Poisto kutsu lähtee");
        $.ajax({
            url: url,
            type: 'delete',
            success: function (status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);
                $('#adminPoistoVaraus').click();
                haeMenneetVaraukset();
                haeNykyVaraukset();
            }
        })
            .fail(function (error) {
                console.log(error);
            })
    })
};

function adminMuokkaaVaraus(varausId) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/haeyksi/" + "varausnakyma2/" + varausId;
        resolve();
    })
    urlinTeko
        .then(function () {
            if (IsAjaxExecuting) return;
            IsAjaxExecuting = true;
            //Pohjustetaan formi
            $.get(url)
                .done(function (data, status, error) {
                    console.log("Data käyty formiin\n:" + data.response[0]);
                    IsAjaxExecuting = false;
                    var i = 4;
                    //Täytetään text inputit
                    $("#adminVarausMuokkausTaulu input[type=text]").each(function () {
                        i++;
                        this.value = Object.values(data.response[0])[i];
                        this.value = formatoiPaiva(this.value);
                    });
                    console.log(data.response[0]);
                    //Valitaan oikea vaihtoehto selectistä
                    $("#varausStatus").val(data.response[0].status.data[0]);
                })
                .fail(function (error) {
                    console.log(error);
                })
        })

    /*
    *Lähetetään muokattu data
    */
    $("#adminVarMuokSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti
        var lahetys = $("#varausAdminMuokkausFormi").serialize();

        console.log("Data lähtee \n");
        console.log(lahetys);
        $.post(url, lahetys)
            .done(function (data, status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);
                $('#adminSuljeVarausMuokkausDialog').click();
                haeVaraukset();
            })
            .fail(function (error) {
                console.log(error);
            })
            .always(function () {
            })
    })
};

function muokkaaKayttaja(loggedUserNumero) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/haeyksi/" + "kayttaja/" + loggedUserNumero;
        resolve();
    })
    urlinTeko
        .then(function () {
            /*
             * Pohjustetaan formi
             */
            $.get(url)
                .done(function (data, status, error) {
                    console.log("Data käyty formiin\n:" + data.response[0]);

                    var i = 0;
                    //Täytetään text inputit
                    $("#kayttajaMuokkaus input[type=text]").each(function () {
                        i++;
                        this.value = Object.values(data.response[0])[i];
                    });

                })
                .fail(function (error) {
                    console.log(error);
                })

        })

    /*
    *Lähetetään muokattu data
    */
    $("#kaytmuokSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        //Serialize hakee formista vain ne kentät, joilla on name atribuutti
        var lahetys = $("#kayttajaMuokkausFormi").serialize();

        console.log("Data lähtee \n" + lahetys);
        $.post(url, lahetys)
            .done(function (data, status, error) {
                IsAjaxExecuting = false; // new code
                console.log("Lähetys onnistui" + error);
                $('#suljeKaytMuokkausDialog').click();
                location.reload();

            })

            .fail(function (error) {
                console.log(error);
            })
            .always(function () {
            })
    })
};

function haeLaitteet() {
    $.get("http://localhost:3001/fetchLaite/")
        .done(function (data, status, error) {
            LaiteTaulunLuonti(data);
            VarattavaTaulunLuonti(data);
        })
        .fail(function (xhr, status, error) {
            Console.log(xhr.status);
        });

}
function hakuMuuttui(haku) {
    console.log(haku);
    $.get("http://localhost:3001/fetchLaitteet/" + haku)
        .done(function (data, status, error) {
            LaiteTaulunLuonti(data);
        })
        .fail(function (xhr, status, error) {
            console.log(xhr.status);
        });
}
function varattavaHakuMuuttui(haku) {
    console.log("Hakukriteeri oli: " + haku);
    $.get("http://localhost:3001/fetchLaitteet/" + haku)
        .done(function (data, status, error) {
            VarattavaTaulunLuonti(data);
        })
        .fail(function (xhr, status, error) {
            console.log(xhr.status);
        });
}
//Haku adminin varausnäkymälle
function varausHakuMuuttui(haku) {
    console.log("Hakukriteeri oli: " + haku);
    $.get("http://localhost:3001/fetchVaraukset/" + haku)
        .done(function (data, status, error) {
            VarausTaulunLuonti(data);
        })
        .fail(function (xhr, status, error) {
            console.log(xhr.status);
        });
}
function haeNykyVaraukset() {

    $.get("http://localhost:3001/fetchVarauksetNyky/")
        .done(function (data, status, error) {
            nykyVarausTaulunLuonti(data);
        })
        .fail(function (xhr, status, error) {
            console.log(xhr.status);
        });
}
function haeMenneetVaraukset() {

    $.get("http://localhost:3001/fetchVarauksetMennyt/")
        .done(function (data, status, error) {
            mennytVarausTaulunLuonti(data);
        })
        .fail(function (xhr, status, error) {
            console.log(xhr.status);
        });
}
function haeVaraukset() {
    $.get("http://localhost:3001/fetchVaraus")
        .done(function (data, status, error) {
            VarausTaulunLuonti(data);
        })
        .fail(function (xhr, status, error) {
            Console.log(xhr.status);
        });

}
function LaiteTaulunLuonti(data) {
    $("#laiteTaulu").children().remove();
    //Luodaan taulu saadusta datasta
    var ylaRivi =
        "<thead><tr><th>Kategoria</th>" +
        "<th>Merkki</th>" +
        "<th>id</th>" +
        "<th>Malli</th>" +
        "<th>Sijainti</th>" +
        "<th>Omistaja</th></tr></thead><tbody>";
    $("#laiteTaulu").append(ylaRivi);

    //Tehdään datasta rivi
    for (var i = 0; i < data.response.length; i++) {
        var id = data.response[i].id;
        var kategoria = data.response[i].Kategoria;
        var merkki = data.response[i].Merkki;
        var malli = data.response[i].Malli;
        var sijainti = data.response[i].Sijainti;
        var omistaja = data.response[i].Omistaja;
        var laiteStatus = data.response[i].Status.data[0];


        // Lisätään rivi taulukkoon. Viimeinen <td> sisältää napin muokkausta varten.
        //onClick eventtiin on muokattava kutsuttava funktioon.
        var rivi =
            "<tr><td>" + kategoria +
            "</td><td>" + merkki +
            "</td><td>" + id +
            "</td><td>" + malli +
            "</td><td>" + sijainti +
            "</td><td>" + omistaja;
        //Jos laite on lainassa, estetään muokkaaminen
        if (laiteStatus == 0)
            rivi += '<td><button onClick="muokkaaLaite(' + id + ')" data-toggle="modal" data-target="#muokkausLaite" class="btn btn-primary">▼</button></td>';

        rivi += '<td><button onClick="poistaLaite(' + id + ')" data-toggle="modal" data-target="#poistoLaite" class="btn btn-primary">Ꭓ</button></td>';
        rivi += '<td><button onClick="historiaLaite(' + id + ')" data-toggle="modal" data-target="#historiaLaite" class="btn btn-primary">H</button></td></tr>';


        $("#laiteTaulu").append(rivi);
    }
}

function VarattavaTaulunLuonti(data) {
    $("#varattavaTaulu").children().remove();
    //Luodaan taulu saadusta datasta
    var ylaRivi =
        "<thead><tr><th>Kategoria</th>" +
        "<th>Merkki</th>" +
        "<th>id</th>" +
        "<th>Malli</th>" +
        "<th>Sijainti</th>" +
        "<th>Omistaja</th></tr></thead><tbody>";
    $("#varattavaTaulu").append(ylaRivi);

    //Tehdään datasta rivi
    for (var i = 0; i < data.response.length; i++) {
        var id = data.response[i].id;
        var kategoria = data.response[i].Kategoria;
        var merkki = data.response[i].Merkki;
        var malli = data.response[i].Malli;
        var sijainti = data.response[i].Sijainti;
        var omistaja = data.response[i].Omistaja;

        var rivi =
            '<tr  onclick="swapBG(this)"><td>' + kategoria +
            "</td><td>" + merkki +
            "</td><td class='id'>" + id +
            "</td><td>" + malli +
            "</td><td>" + sijainti +
            "</td><td>" + omistaja + "</td></tr>";
        $("#varattavaTaulu").append(rivi);
    }
}


function tarkistaVaraus() {

    function hideBanners() {
        $("#onnistui").hide();
        $("#varoitusTyhja").hide();
        $("#varoitusPaiva").hide();
        $("#varoitusPvmReserved").hide();
    }

    function pvmCheckError() {
        hideBanners();
        $("#varoitusPvmReserved").show();
        return false;
    };

    hideBanners();
    var alkuDate = new Date($("#startdate").val());
    var loppuDate = new Date($("#enddate").val());
    var valittuId = $(".valittuRivi").find(".id").text();

    if ($("#startdate").val() == "" || $("#enddate").val() == "" || $("tr").hasClass("valittuRivi") != true) {
        $("#varoitusTyhja").show();
        return;
    }
    else if ($("#startdate").val() == "" || $("#enddate").val() == "" || $("tr").hasClass("valittuRivi") != true) {
        $("#varoitusTyhja").show();
        return;
    }
    else if (alkuDate > loppuDate) {
        $("#varoitusPaiva").show();
        return;
    }

    /*Verrataan tietokannasta laitteen varauksiin, että
    onko valittupäivämäärä minkään varauksen alku- tai loppupvm:n välissä.
    Tulostukset olen kommentoinut debuggausta varten.*/
    $.get("http://localhost:3001/haeVaratutLaitteet/" + valittuId + "/")
        .done(function (data, status, error) {

            //Katsotaan onko laitteella ollenkaan varauksia
            if (data.response.length >= 0) {
                for (var i = 0; i < data.response.length; i++) {

                    var alkuDBDate = new Date(data.response[i].alkupvm);
                    var loppuDBDate = new Date(data.response[i].loppupvm);

                    //Katsotaan onko varaus palautettu
                    if (data.response[i].status == 0) {
                        /*Verrataan, että onko käyttäjän valitsema päivä varauksen päivämäärien välissä tai sama.
                          Jos on, niin estetään varauksen luominen ja ilmoitetaan käyttäjälle.*/
                        if (alkuDate >= alkuDBDate && alkuDate <= loppuDBDate) {
                            pvmCheckError();
                            return;
                        }
                        if (loppuDate >= alkuDBDate && loppuDate <= loppuDBDate) {
                            pvmCheckError();
                            return;
                        }
                        if (alkuDate <= alkuDBDate && loppuDate >= loppuDBDate) {
                            pvmCheckError();
                            return;
                        }
                    }
                }
            }
            hideBanners();
            $("#onnistui").show();

            luoVaraus($("#startdate").val(), $("#enddate").val(), valittuId);
            haeMenneetVaraukset();
            haeNykyVaraukset();
            haeVaraukset();

        })
}

function luoVaraus(alku, loppu, id) {
    let varausurl = "http://localhost:3001/lisaaYksi/" + "varaus/" + alku + "/" + loppu + "/" + id + "/";
    $.post(varausurl)
        .done(function (data, status, error) {
            IsAjaxExecuting = false; // new code
            console.log("Lähetys onnistui" + error);
            $("#onnistui").show();
        })

}
function nykyVarausTaulunLuonti(data) {
    $("#nykyVarausTaulu").children().remove();
    //Luodaan taulu saadusta datasta
    var ylaRivi =
        "<thead><tr><th>Varaaja</th>" +
        "<th>Merkki</th>" +
        "<th>Malli</th>" +
        "<th>Alkupvm</th>" +
        "<th>Loppupvm</th>" +
        "<th>Kategoria</th>" +
        "<th>Status</th>" +
        "</tr></thead><tbody>";
    $("#nykyVarausTaulu").append(ylaRivi);

    //Tehdään datasta rivi
    for (var i = 0; i < data.response.length; i++) {
        var id = data.response[i].varausid;
        var varaaja = data.response[i].varaaja;
        var merkki = data.response[i].merkki;
        var malli = data.response[i].malli;
        var alkupvm = data.response[i].alkupvm;
        var loppupvm = data.response[i].loppupvm;
        var kategoria = data.response[i].kategoria;
        var status = data.response[i].status;
        var varausstatus = data.response[i].varausstatus;

        alkupvm = formatDate(alkupvm);
        loppupvm = formatDate(loppupvm);

        var rivi =
            '<tr><td>' + varaaja +
            "</td><td>" + merkki +
            "</td><td>" + malli +
            "</td><td>" + alkupvm +
            "</td><td>" + loppupvm +
            "</td><td>" + kategoria;

        if (varausstatus == 0) {
            rivi += "</td><td>Varattu";
            rivi += '</td><td><button onClick="muokkaaVaraus(' + id + ')" data-toggle="modal" data-target="#muokkausVaraus" class="btn btn-primary">▼</button></td>' +
                '<td><button onClick="poistaVaraus(' + id + ')" data-toggle="modal" data-target="#poistoVaraus" class="btn btn-primary">Ꭓ</button></td></tr>';
        }
        else if (varausstatus == 1) {
            rivi += "</td><td>Palautettu</td></tr>";
        }
        else
            rivi += "</td><td>Lainassa</td></tr>";

        $("#nykyVarausTaulu").append(rivi);
    }
}
function mennytVarausTaulunLuonti(data) {
    $("#mennytVarausTaulu").children().remove();
    //Luodaan taulu saadusta datasta
    var ylaRivi =
        "<thead><tr><th>Varaaja</th>" +
        "<th>Merkki</th>" +
        "<th>Malli</th>" +
        "<th>Alkupvm</th>" +
        "<th>Loppupvm</th>" +
        "<th>Kategoria</th>" +
        "<th>Status</th>" +
        "</tr></thead><tbody>";
    $("#mennytVarausTaulu").append(ylaRivi);

    for (var i = 0; i < data.response.length; i++) {
        var id = data.response[i].varausid;
        var varaaja = data.response[i].varaaja;
        var merkki = data.response[i].merkki;
        var malli = data.response[i].malli;
        var alkupvm = data.response[i].alkupvm;
        var loppupvm = data.response[i].loppupvm;
        var kategoria = data.response[i].kategoria;
        var status = data.response[i].status.data[0];


        alkupvm = formatDate(alkupvm);
        loppupvm = formatDate(loppupvm);

        var rivi =
            '<tr><td>' + varaaja +
            "</td><td>" + merkki +
            "</td><td>" + malli +
            "</td><td>" + alkupvm +
            "</td><td>" + loppupvm +
            "</td><td>" + kategoria +
            "</td><td>" + "Palautettu";


        $("#mennytVarausTaulu").append(rivi);
    }
}
//ADMINILLE!!!!!!!!
function VarausTaulunLuonti(data) {
    $("#varausTaulu").children().remove();
    //Luodaan taulu saadusta datasta
    var ylaRivi =
        "<thead><tr><th>id</th>" +
        "<th>Varaaja</th>" +
        "<th>Merkki</th>" +
        "<th>Malli</th>" +
        "<th>Alkupvm</th>" +
        "<th>Loppupvm</th>" +
        "<th>Kategoria</th>" +
        "<th>Status</th>" +
        "</tr></thead><tbody>";
    $("#varausTaulu").append(ylaRivi);


    console.log(data.response);
    for (var i = 0; i < data.response.length; i++) {
        var id = data.response[i].varausid;
        var varaaja = data.response[i].varaaja;
        var merkki = data.response[i].merkki;
        var malli = data.response[i].malli;
        var alkupvm = data.response[i].alkupvm;
        var loppupvm = data.response[i].loppupvm;
        var kategoria = data.response[i].kategoria;
        var status = data.response[i].status.data[0];
        var varausstatus = data.response[i].varausstatus;
        var laiteId = data.response[i].laiteid;

        alkupvm = formatDate(alkupvm);
        loppupvm = formatDate(loppupvm);

        var rivi =
            '<tr><td>' + id +
            "</td><td>" + varaaja +
            "</td><td>" + merkki +
            "</td><td>" + malli +
            "</td><td>" + alkupvm +
            "</td><td>" + loppupvm +
            "</td><td>" + kategoria;

        //Tarkistetaan varauksen ja laitteen statukset
        if (varausstatus == 1)
            rivi += "</td><td>Palautettu";

        else {
            if (varausstatus == 0) {
                rivi += "</td><td>Varattu";
                rivi += '</td><td><button onClick="adminMuokkaaVaraus(' + id + ')" data-toggle="modal" data-target="#adminMuokkausVaraus" class="btn btn-primary">▼</button></td>' +
                    '<td><button onClick="adminPoistaVaraus(' + id + ')" data-toggle="modal" data-target="#adminPoistoVaraus" class="btn btn-primary">Ꭓ</button></td></tr>';

            }
            else if (varausstatus == 2) {
                rivi += "</td><td>Lainassa";
                rivi += '</td><td><button onClick="merkkaaPalautetuksi(' + id + ')" class="btn btn-primary">Palauta</button>';
                rivi += '</td><td><button onClick="adminMuokkaaVaraus(' + id + ')" data-toggle="modal" data-target="#adminMuokkausVaraus" class="btn btn-primary">▼</button></td>' +
                    '<td><button onClick="adminPoistaVaraus(' + id + ')" data-toggle="modal" data-target="#adminPoistoVaraus" class="btn btn-primary">Ꭓ</button></td></tr>';

            }
        }

        $("#varausTaulu").append(rivi);
    }
}

$(document).ready(function () {
    haeMenneetVaraukset();
    haeNykyVaraukset();
    haeLaitteet();
    haeVaraukset();
});

$('#yleisTeksti').load('/yleis');
$('#laiteTeksti').load('/laite');
$('#varausTeksti').load('/varaus');
$('#hallintaTeksti').load('/hallinta');
