let db = require('../config/db');
let helper = require('../helpers/helper');

let post = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.post',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    posts: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun post');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        console.log(1)
                        array.push({
                            id: rslt.rows[i].id_post,
                            date: rslt.rows[i].date_post,
                            texte: rslt.rows[i].texte,
                            image: rslt.rows[i].image,
                            titre: rslt.rows[i].titre
                        });
                        console.log('array', array)
                    }
                    retour.posts = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },
    create: function (post, callback) {
        db.query("INSERT INTO public.post(date_post, texte, image, titre, id_am) VALUES (Date(now()), $1, $2, $3, $4) returning id_post",
            [post.message, post.image, post.titre, post.id_am],
            function (err, result) {
                let retour = {
                    statut: null,
                    erreur: null
                };
                if (err) {
                    retour.statut = 500
                    retour.erreur = err.toString()
                } else {
                    retour.statut = 200
                }
            });
        callback(retour);
    },
    delete: function (idPost, callback) {
        db.query("DELETE FROM public.post WHERE id_post=$1",
            [idPost],
            function (err, result) {
                let retour = {
                    statut: null,
                    erreur: null
                };
                if (err) {
                    retour.statut = 500
                    retour.erreur = err.toString()
                } else {
                    retour.statut = 200
                }
            });
        callback(retour);
    }
}

module.exports = post;