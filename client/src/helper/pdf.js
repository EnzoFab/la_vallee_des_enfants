import FileService from "../services/FileService";

let pdf = {
  contratPdf (num_contrat) {
    let table = ''  // boucle sur les jours 
    let html =
      `<html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: Arial, Helvetica, sans-serif; background-color: 	#FFFFF0;">
                <div style="text-align: center;">
                    <h1 style=" color:#4B0082;">Contrat de ${nom_complet_enfant}</h1>
                    <img src="/static/logo.jpg" height="200px" />
                </div>
                <h2 style="text-align: center;">Renseignements personnels</h2>
                <p>Identifiant de l'employeur: </p>
                <ul style="list-style-type: none;">
                    <li>Nom de naissance :</li>
                    <li>Nom d'usage :</li>
                    <li>Adresse :</li>
                    <li>Telephone du domicile :</li>
                    <li>Couriel :</li>
                    <li>
                        <table style="border-collapse: collapse; padding: 15px;">
                            <tr font-weight: bold;>
                               <th>${pere || mere}</th>
                               <th>${nom_complet}</th>
                            </tr>
                            <tr>
                               <td>Profession</td>
                               <td>${profession}</td>
                            </tr>
                             <tr>
                               <td>Telephone</td>
                               <td>${telephone}</td>
                            </tr>
                             <tr>
                               <td>Telephone professionnel</td>
                               <td>${tel_pro || 'Aucun telephone'}</td>
                            </tr>
                        </table>
                    </li>
                </ul>
                <p>Et la salariée: </p>
                 <ul style="list-style-type: none;">
                    <li>Nom de naissance :</li>
                    <li>Nom d'usage :</li>
                    <li>Née le : ${date_naissance}</li>
                    <li>Lieu de naissance :</li>
                    <li>Numero de SS :</li>
                    <li>Agrément délivré le :</li>
                    <li>Assurance "Responsabilité Civile Professionnelle" :</li>
                    <li>Numéro de Police: </li>
                </ul>
                <h2>Les termes du contrat</h2>
                <p>
                    <div style="text-align: center">
                      Il est conclu un contrat de travail régi par les dispositions de la convention collective nationale 
                      de travail des assistantes maternelles du particulier employeur. L'employeur s'assure que le salarié
                       possède un exemplaire de cette convention à jour.<br>
                       <span style="font-style: oblique;">
                         Ce contrat de travail à durée indéterminée est établi pour l'enfant : ${nom_complet_enfant}
                         Né(e) le : ${date_naissance}
                      </span>
                      <p>
                      <h2 style="font-style: italic;">DATE D'EFFET DU CONTRAT</h2> 
                      (à compter du premier jour de la période d'essai) :${date_periode_essaie}
                      </p>
                    </div>
                </p>
                <div style="text-align: center">
                Période d'essai :
                <ul>
                    <li>Durée :</li>
                    <li>Modalités de la période d'adaptation :</li>
                </ul>
                Durée et horaire d'accueil :
                <ul><li>Horaire hebdomadaire :</li></ul>
                nombre d'heures : ${nb_h_semaine} /semaine, selon le planning suivant :
                </div>
                <table style="width: 95%;">
                    <tr style="font-weight: bold;">
                        <th>Jour</th>
                        <th>Heure d'arrivée</th>
                        <th>Heure de départ</th>
                    </tr>
                     ${table}
                </table>
            </body> 
        </html>` // TODO a finir
    return FileService.createPDF({
        nom: 'contrat_' + num_contrat,
        html: html}
      )
  },

  facturePdf (numcontrat, mois, annee) {
    let html =
      `<html>
            
        </html>`
    return FileService.createPDF({
      nom: 'facture_' + numcontrat + '_' + mois + '-' + annee,
      html: html}
    )
  }
}

module.exports = pdf
