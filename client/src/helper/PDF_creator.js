// import FileService from "../services/FileService";
import FileService from '../services/FileService'
import DateHelper from './DateHelper'
import FonctionMath from './FonctionMath'

function forceDownload(response, name) {
  if (!window.navigator.msSaveOrOpenBlob){
    // BLOB NAVIGATOR
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contrat_${name}.pdf`);
    document.body.appendChild(link);
    link.click();
  }else{
    // BLOB FOR EXPLORER 11
    const url = window.navigator.msSaveOrOpenBlob(new Blob([response.data]), `contrat_${name}.pdf`);
  }
}
export default {
  contratPdf (data) {
    let table = ''  // boucle sur les jours
    let gouter = ''
    let nbSemaineAccueil = 52 - data.assmat.nombreSemaineConges - data.employeur.nombreSemSupp
    let salaireMensuelNet =
      FonctionMath.arrondi((data.contrat.nb_heures_semaine * data.contrat.tarif * nbSemaineAccueil) / 12, 2)
    for (let i = 0; i < data.presences.length; i++) {
      if (data.presences[i].heureArrivee != null) {
        gouter = 'Oui'
        if (!data.presences[i].gouter) {
          gouter = 'Non'
        }
        table += `<tr>
                <td style="color: white; background-color: #ffab40">${data.presences[i].libelle_jour}</td>
                <td>${DateHelper.formatTime(data.presences[i].heureArrivee)}</td>
                <td>${DateHelper.formatTime(data.presences[i].heureDepart)}</td>
                <td>${gouter}</td>
            </tr>`
      }
    }
    let html =
      `<html>
            <head>
                <meta charset="UTF-8">
            </head>
            <style>
                h2 {
                 margin-bottom: 3%;
                 color: #d87c47;
                 font-weight: bold;
                 text-decoration: underline;
                }
                th {
                  background-color: #d87c47;
                  color: white;
                  font-weight: bold;
                }
                table {
                margin: 2%;
                text-align: center;
                border-collapse: collapse;
                border-radius: 4px;
                border: 2px solid black;
                }
                th, td {
                    border-bottom: 1px solid black;
                    padding: 1%;
                }
                td{
                   background-color: whitesmoke;
                }
                ul {
                list-style-type: none;
                }
            </style>
            <body style="font-family: Arial, Helvetica, sans-serif; background-color: white; text-align: center; 
            margin: 2%; border: solid; padding: 6%;">
                <div style="text-align: center; margin-bottom: 3%;">
                    <h1 style="color:#4B0082;">Contrat de ${data.enfant.nom_complet}</h1>
                    <img src="images/logo.jpg" style="width: 800px; height: 500px; margin-bottom: 4%;" alt="logo"/>
                    <h3 style="color:#4B0082; "> N°<br> <i>${data.contrat.num_contrat}</i></h3>
                    <img src="images/maternelle_enfant.png" style="width: 35%" alt="maternelle"/>
                </div>
                <h2 style="text-align: center;">Renseignements personnels</h2>
                <p>Identifiant de l'employeur: </p>
                <ul>
                    <li>Nom de naissance : ${data.employeur.nomNaissanceEmp}</li>
                    <li>Nom d'usage : ${data.employeur.nomUsageEmp}</li>
                    <li>Adresse : 
                            ${data.employeur.rueEmp + ', ' + data.employeur.codePEmp + ', ' + data.employeur.villeEmp}
                     </li>
                    <li>Telephone du domicile : ${data.employeur.telephoneEmp}</li>
                    <li>Couriel : ${data.employeur.emailEmp}</li>
                </ul>
                <p>Et la salariée: </p>
                 <ul style="page-break-after: always;">
                    <li>Nom de naissance : ${data.assmat.nomNaissanceAssMat}</li>
                    <li>Nom d'usage : ${data.assmat.nomUsageAssMat}</li>
                    <li>Née le : ${data.assmat.dateNaissanceAssMat}</li>
                    <li>Lieu de naissance : ${data.assmat.villeNaissanceAssMat}</li>
                    <li>Numero de SS : ${data.assmat.numeroSS}</li>
                    <li>Agrément délivré le : ${data.assmat.dateAgrement}</li>
                    <li>Assurance "Responsabilité Civile Professionnelle" : ${data.assmat.assurance}</li>
                    <li>Numéro de Police: ${data.assmat.numeroPolice}</li>
                </ul>
                <img src="images/plume.png" alt="contrat" style="width: 35%; margin-top: 2%;"/>
                <h2>Les termes du contrat</h2>
                <p>
                    <div>
                      Il est conclu un contrat de travail régi par les dispositions de la convention collective nationale 
                      de travail des assistantes maternelles du particulier employeur. L'employeur s'assure que le salarié
                       possède un exemplaire de cette convention à jour.<br>
                       <span style="font-style: oblique;">
                         Ce contrat de travail à durée indéterminée est établi pour l'enfant : ${data.enfant.nom_complet}
                         Né(e) le : ${data.enfant.dateNaissanceEnfant}
                      </span>
                      <p>
                      <h3 style="font-style: italic;">DATE D'EFFET DU CONTRAT</h3> 
                      (à compter du premier jour de la période d'essai) : ${data.contrat.dateDebAdapt}
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
                    <tr>
                        <th>Jour</th>
                        <th>Heure d'arrivée</th>
                        <th>Heure de départ</th>
                        <th>Gouter</th>
                    </tr>
                     ${table}
                </table>
                 <p> <u> Rémunération : </u> </p>
    <ul style="page-break-after: always;">
        <li>Salaire horaire de base </li>
            <p> Salaire horaire net de base : ${data.contrat.tarif} euros </p> 
        <li>Salaire de base : le salaire est mensualisé. </li>
            <p> Salaire mensuel net : ${salaireMensuelNet} euros </p> 
        <li>Salaire majoré (à partir de la 46ème heure hebdomadaire) : </li>
            <p> Montant de la majoration : ${data.contrat.taux_majore} %  Salaire net horaire majoré :  </p>
        <li> Date de paiement du salaire : <b> le <u>${data.contrat.jour_paiement}</u> de chaque mois </b>
         Mode de paiement du salaire : <u><b>${data.contrat.modeDePaiementContrat}</b></u> </li>
    </ul>
    <p> <u style="margin-top: 15%"> Congés payés : </u> </p>
    <ul>
        <li> Les parties conviennent que l'assistante maternelle prend des congés avant la fin de la première année </li> de référence. Si l'assistante maternelle prend plus de jours que ceux convenu au contrat. Elle les prend sans rémunération. Il est convenu d'un accord commun pour :
            <p> Le salarié :  ${data.assmat.nombreSemaineConges} semaine de congé annuel </p>
            <p>L'employeur : ${data.employeur.nombreSemSupp} semaine de congé annuel en plus de son assistante maternelle  </p> 
        <li> Le délai de prévenance du congé principal est à fixer au plus tard le 1er mars. </li> Si les dates ne sont pas connues à la signature du contrat, un délai de prévenance est fixé : 1 mois <br>
        <li> Modalités de paiement des congés en cas d'année incomplète : Chaque mois. </li> La méthode des 10% est appliquée sur le salaire net. <br>
        <li> Modalités de paiement des congés en cas d'année complète : <u> déjà inclus dans la mensualisation </u> </li>
    </ul>
    <p> <u> Jours fériés : </u> </p>
    <ul>
        <li> Seul le 1er mai est chômé et payé, si ce jour précis est habituellement travaillé. </li> La Maison d'Assistantes Maternelles étant fermée les autres jours fériés, aucun accueil ne sera effectué. Cependant le chômage des jours habituellement travaillés ne pourra être la cause d'une diminution de la rémunération. 
    </ul>
    <p> <u> Indemnités d'entretien et de frais de repas : </u> </p>
    <ul>
        <li> Indemnité d'entretien, montant journalier : 4 euros par jour de présence. </li> Les indemnités d'entretien sont mensualisées <br>
        <li> Goûter, montant journalier : 1 euro par jour de présence </li>
    </ul>
    <p> <u> Délégation : </u> </p>
    <ul>
        <li> Le parent confie son enfant à une assistante maternelle exerçant en Maison d'Assistantes Maternelles, </li> 
        il autorise cette assistante à déléguer l'accueil de son enfant à d'autres assistantes maternelles exerçant dans la M.A.M Loulou Trottinette.
    </ul>
     <p> <u> Modification du contrat en cours : </u> </p>
    <ul>
        <li> Le contrat de travail peut être modifié. Toutefois, aucune modification ne pourra être décidée. </li> 
        Il est tenu de laisser un délai suffisant d'un minimum de 15 jours, pour connaître son refus ou son acceptation. Les deux parties répondent par écrit : s'ils sont d'accord, il y aura un avenant du conrat, s'il n'y a pas d'accord il peut y avoir rupture de contrat. Soit démission de l'assistante maternelle. Soit licenciement par employeur. <br>
        <li> Si l'assistante maternelle n'accepte pas le changement, l'employeur peut revenir </li>
         aux conditions initiales du contrat ou y mettre fin. Le fait pour le salarié de ne pas avoir accepté la modification proposée ne le prive pas de préavis. <br>
        <li> Toute modification doit faire l'objet d'un avenant impérativement daté et signé par les deux contractants. </li>
    </ul> 
    <p> <b> Signature de l'employeur </b> </p> 
    <p>(Précédée de la mention "Lu et approuvé")</p>
    <p> A  : </p>
    <p style="margin-bottom: 10%"> Le : </p>
    
    <p> <b> Signature du salarié </b> </p> 
    <p>(Précédée de la mention "Lu et approuvé")</p>
    <p> A  : </p>
    <p style="margin-bottom: 10%"> Le : </p>
            </body> 
        </html>`
    return FileService.createPDF({html: html, nom: 'contrat_' + data.enfant.nom_complet})
      .then(function (r) {
        forceDownload (r, data.enfant.nom_complet)
      })
  },

  facturePdf (numcontrat, mois, annee) {
    let html =
      `<html>
            
        </html>` // TODO a finir
    return FileService.createPDF({html: html, nom: 'facture_' + mois + '-' + annee})
      .then(function (r) {
        forceDownload (r, data.enfant.nom_complet)
      })
  }
}

