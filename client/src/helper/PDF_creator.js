// import FileService from "../services/FileService";
const Grabzit = require('grabzit')
const client = new Grabzit('Y2FhMTM0MjU5MzFiNDJjZGI3MzY0NDIyNjcwODI2Y2I=',
  'STISPz8/F3RIPz8MQDw/Hz8/P2kVfD9SGT8/OHJXPx0=');

let PDF_creator = {
  contratPdf (data) {
    let table = ''  // boucle sur les jours
    let html =
      `<html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: Arial, Helvetica, sans-serif; background-color: 	#FFFFF0;">
                <div style="text-align: center;">
                    <h1 style=" color:#4B0082;">Contrat de ${data.enfant.nom_complet}</h1>
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
                               <th>Nom</th>
                               <th>${data.employeur.nom_complet}</th>
                            </tr>
                             <tr>
                               <td>Telephone</td>
                               <td>${data.employeur.telephoneEmp}</td>
                            </tr>
                        </table>
                    </li>
                </ul>
                <p>Et la salariée: </p>
                 <ul style="list-style-type: none;">
                    <li>Nom de naissance : ${data.assmat.nomNaissanceAssMat}</li>
                    <li>Nom d'usage : ${data.assmat.nomUsageAssMat}</li>
                    <li>Née le : ${data.assmat.dateNaissanceAssMat}</li>
                    <li>Lieu de naissance :${data.assmat.villeNaissanceAssMat}</li>
                    <li>Numero de SS : ${data.assmat.numeroSS}</li>
                    <li>Agrément délivré le : ${data.assmat.dateAgrement}</li>
                    <li>Assurance "Responsabilité Civile Professionnelle" :${data.assmat.assurance}</li>
                    <li>Numéro de Police: ${data.assmat.numeroPolice}</li>
                </ul>
                <h2>Les termes du contrat</h2>
                <p>
                    <div style="text-align: center">
                      Il est conclu un contrat de travail régi par les dispositions de la convention collective nationale 
                      de travail des assistantes maternelles du particulier employeur. L'employeur s'assure que le salarié
                       possède un exemplaire de cette convention à jour.<br>
                       <span style="font-style: oblique;">
                         Ce contrat de travail à durée indéterminée est établi pour l'enfant : ${data.enfant.nom_complet}
                         Né(e) le : ${data.enfant.dateNaissanceEnfant}
                      </span>
                      <p>
                      <h2 style="font-style: italic;">DATE D'EFFET DU CONTRAT</h2> 
                      (à compter du premier jour de la période d'essai) :${data.contrat.dateDebAdapt}
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
                nombre d'heures : ${data.contrat.nb_heures_semaine} /semaine, selon le planning suivant :
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
    console.log(client.html_to_pdf(html, {}))
    client.html_to_pdf(html)
    client.save(function () {
      console.log('SAVED')
    })
  },

  facturePdf (numcontrat, mois, annee) {
    let html =
      `<html>
            
        </html>`
    client.ConvertHTML(html)
  }
}

module.exports = PDF_creator
