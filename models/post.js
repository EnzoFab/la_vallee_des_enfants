let db = require('../config/db');
let helper = require('../helpers/helper');

let post = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.post ORDER BY date_post DESC, id_post DESC',
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
                            titre: rslt.rows[i].titre,
                            image_id: rslt.rows[i].image_id
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
        db.query("INSERT INTO public.post(date_post, texte, image, titre, id_am, image_id) VALUES (Date(now()), $1, $2, $3, $4, $5) returning id_post, image_id",
            [post.message, post.image, post.titre, post.id_am, post.image_id],
            function (err, result) {
                let retour = {
                    statut: null,
                    erreur: null,
                    id_post: null
                };
                if (err) {
                    console.log(err.toString())
                    retour.statut = 500
                    retour.erreur = err.toString()
                } else {
                    retour.statut = 200
                    retour.id_post = result.rows[0].id_post
                    retour.imageID = result.rows[0].image_id
                }
                callback(retour);
            });

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
                callback(retour);
            });

    }
}

module.exports = post;