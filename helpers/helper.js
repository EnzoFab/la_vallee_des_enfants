function handleError(e, rst, message){
    if(e){
        return {
            statut: 500,
            erreur: {
                texte: e.toString()
            }
        }
    }else if(rst.rows == undefined  || rst.rows.length == 0){
        return {
            statut: 404, // bad request
            erreur: {
                texte: message
            }
        }
    }else{
        return {
            statut: null,
            erreur:null
        }
    }
}

module.exports = {handleError};