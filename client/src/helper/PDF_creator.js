// import FileService from "../services/FileService";
import FileService from '../services/FileService'


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
    let html =
      `<html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: Arial, Helvetica, sans-serif; background-color: white; text-align: center; 
            margin: 2%; border: solid;">
                <div style="text-align: center;">
                    <h1 style="color:#4B0082;">Contrat de ${data.enfant.nom_complet}</h1>
                    <img src="images/logo.jpg" style="width: 800px; height: 350px" alt="logo"/>
                    <h2 style="color:#4B0082;"> N°<br> <i>${data.contrat.num_contrat}</i></h2>
                </div>
                <h2 style="text-align: center;">Renseignements personnels</h2>
                <p>Identifiant de l'employeur: </p>
                <ul style="list-style-type: none;">
                    <li>Nom de naissance : ${data.employeur.nomNaissanceEmp}</li>
                    <li>Nom d'usage : ${data.employeur.nomUsageEmp}</li>
                    <li>Adresse : 
                            ${data.employeur.rueEmp + ', ' + data.employeur.codePEmp + ', ' + data.employeur.villeEmp}
                     </li>
                    <li>Telephone du domicile : ${data.employeur.telephoneEmp}</li>
                    <li>Couriel : ${data.employeur.emailEmp}</li>
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
                    <div>
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
    return FileService.createPDF({html: html, nom: 'contrat_' + data.enfant.nom_complet})
      .then(function (r) {
        forceDownload (r, data.enfant.nom_complet)
      })
  },

  facturePdf (numcontrat, mois, annee) {
    let html =
      `<html>
            
        </html>`
  }
}

