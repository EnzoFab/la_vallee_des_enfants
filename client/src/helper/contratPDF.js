import Jspdf from 'jspdf'

export default {
  createContratPdf (employeur, tuteurs, assMat, enfant, contrat, presences) {
    // Créer le tableau des tuteurs
    var t = ''
    t += '<table id="t03">'
    t += '<tr>'
    for (var i = 0; i < tuteurs.length; i++) {
      t += `<th>${tuteurs[i].nom_type_tuteur} : ${tuteurs[i].prenom_tuteur + ' ' + tuteurs[i].nom_tuteur} </th>`
    }
    t += '</tr>'
    t += '<tr>'
    for (var j = 0; j < tuteurs.length; j++) {
      t += `<td> Profession : ${tuteurs[j].profession} </td>`
    }
    t += '</tr>'
    t += '<tr>'
    for (var k = 0; k < tuteurs.length; k++) {
      t += `<td> Téléphone : ${tuteurs[k].telephone} </td>`
    }
    t += '</tr>'
    t += '<tr>'
    for (var l = 0; l < tuteurs.length; l++) {
      t += `<td> Téléphone professionnel : ${tuteurs[l].telephone_pro} </td>`
    }
    t += '</tr>'
    t += '</table>'

    // Créer le tableau des présences
    var p = ''
    p += '<table id="t01">'
    p += '<tr>'
    p += '<th>Jour</th>'
    p += '<th> Lundi </th>'
    p += '<th> Mardi</th>'
    p += '<th> Mercredi</th>'
    p += '<th> Jeudi</th>'
    p += '<th> Vendredi</th>'
    p += '<th> Samedi</th>'
    p += '<th> Dimanche</th>'
    p += '</tr>'
    p += '<tr>'
    p += '<td> <p> Heure d arrivée </p> </td> '
    for (var m = 0; m < presences.length; m++) {
      if (presences[m].heureArrivee != null) {
        var heureA = presences[m].heureArrivee.split(':', 2)
        p += `<td> ${heureA[0] + ':' + heureA[1]} </td>`
      } else {
        p += `<td>  </td>`
      }
    }
    p += '</tr>'
    p += '<tr>'
    p += '<td> Heure de départ </td> '
    for (var n = 0; n < presences.length; n++) {
      if (presences[n].heureDepart != null) {
        var heureD = presences[n].heureDepart.split(':', 2)
        p += `<td> ${heureD[0] + ':' + heureD[1]} </td>`
      } else {
        p += `<td>  </td>`
      }
    }
    p += '</tr>'
    p += '</table>'

    var nbSemaineAccueil = 52 - assMat.nombreSemaineConges - employeur.nombreSemSupp
    var salaireMensuelNet = (contrat.nb_heures_semaine * contrat.tarif * nbSemaineAccueil) / 12
    var htmlP1 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <center><h2><u>Renseignements personnels</u></h2></center>
    <p> <u> Identification de l'employeur :</u> <i> En qualité de : </i></p>
    <p><i>  <span> Nom de Naissance : ${employeur.nomNaissanceEmp} </span> &nbsp; <span> Nom d'usage : ${employeur.nomUsageEmp}</span> &nbsp; <span> Prénom : ${employeur.prenomEmp} </span> </i> </p>
    <p><i>  Adresse :  ${employeur.rueEmp + ' ' + employeur.codePEmp + ' ' + employeur.villeEmp}</i> </p>
    <p><i>  <span> Téléphone du domicile : ${employeur.telephoneEmp}</span> &nbsp; <span> Courriel : ${employeur.emailEmp}</span> </i> </p>
    ${t}
    <p> <u> Et la salariée :</u>
    <p><i>  <span> Nom de Naissance : ${assMat.nomNaissanceAssMat}</span> &nbsp; <span> Nom d'usage : ${assMat.nomUsageAssMat}</span> &nbsp; <span> Prénom : ${assMat.prenomAssMat} </span> </i> </p>
    <p><i> <span> Née le : ${assMat.dateNaissanceAssMat}</span> &nbsp; <span> à : ${assMat.villeNaissanceAssMat}</span>  </i> </p>
    <p><i>  Numéro de SS : ${assMat.numeroSS} </i> </p>
    <p><i>  <span>  Agrément délivré le : ${assMat.dateAgrement} </span> &nbsp; <span> Référence de l'agrément : ${assMat.referenceAgrement} </span> </i> </p>
    <p><i>  <span> Assurance "Responsabilité Civile Professionnelle" : ${assMat.assurance} </span></i> </p>
    <p><i>  Numéro de Police : ${assMat.numeroPolice} </i> </p>
`
    let htmlP2 = `
    <center><h2><u>Les termes du contrat :</u></h2></center>
    <p> Il est conclu un contrat de travail régi par les dispositions de la convention collective nationale de travail des assistantes maternelles du particulier employeur. L'employeur s'assure que le salarié possède un exemplaire de cette convention à jour. </p>
    <p><i> <span>Ce contrat de travail à durée indéterminée est établi pour l'enfant : ${enfant.prenomEnfant + ' ' + enfant.nomEnfant} </span> &nbsp; <span> Né(e) le : ${enfant.dateNaissanceEnfant}</span> </i> </p>
    <p> <i> <b> DATE D'EFFET DU CONTRAT </b> (à compter du premier jour de la période d'essai) : ${contrat.dateDebAdapt} </i> </p>
    <p> <u> Période d'essai : </u> </p>
    <ul>
        <li>Durée :  </li>
        <li>Modalités de la période d'adaptation : </li>
    </ul>
    <p> <u> Durée et horaire d'accueil : </u> </p>
    <ul>
        <li>Horaire hebdomadaire : </li>
            <p> nombre d'heures : &nbsp;${contrat.nb_heures_semaine} /semaine, selon le planning suivant : </p>
${p}
        <li>Accueil annuel : </li>
            <p> Nombre de semaine d'accueil : ${nbSemaineAccueil} semaines </p> 
    </ul>`
    let htmlP3 = `
    <p> <u> Rémunération : </u> </p>
    <ul>
        <li>Salaire horaire de base </li>
            <p> Salaire horaire net de base : ${contrat.tarif} euros </p> 
        <li>Salaire de base : le salaire est mensualisé. </li>
            <p> Salaire mensuel net : ${salaireMensuelNet} euros </p> 
        <li>Salaire majoré (à partir de la 46ème heure hebdomadaire) : </li>
            <p> Montant de la majoration : ${contrat.taux_majore} %  Salaire net horaire majoré :  </p>
        <li> Date de paiement du salaire : <b> le ${contrat.jour_paiement} de chaque mois </b> Mode de paiement du salaire : ${contrat.modeDePaiementContrat} </li>
    </ul>
    <p> <u> Congés payés : </u> </p>
    <ul>
        <li> Les parties conviennent que l'assistante maternelle prend des congés avant la fin de la première année </li> de référence. Si l'assistante maternelle prend plus de jours que ceux convenu au contrat. Elle les prend sans rémunération. Il est convenu d'un accord commun pour :
            <p> Le salarié :  ${assMat.nombreSemaineConges} semaine de congé annuel </p>
            <p>L'employeur : ${employeur.nombreSemSupp} semaine de congé annuel en plus de son assistante maternelle  </p> 
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
        <li> Le parent confie son enfant à une assistante maternelle exerçant en Maison d'Assistantes Maternelles, </li> il autorise cette assistante à déléguer l'accueil de son enfant à d'autres assistantes maternelles exerçant dans la M.A.M Loulou Trottinette.
    </ul> `
    let htmlP4 = `
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
    <p> Le : </p>
    
    <p> <b> Signature du salarié </b> </p> 
    <p>(Précédée de la mention "Lu et approuvé")</p>
    <p> A  : </p>
    <p> Le : </p>
    
</head>
<body>
</body>
</html>`
    let pdfName = 'contrat'
    var doc = new Jspdf('p', 'pt', 'letter')
    var margins = {
      bottom: 60,
      left: 40,
      width: 522
    }
    doc.fromHTML(htmlP1, margins.left, {width: margins.width}, margins)
    doc.addPage()
    doc.fromHTML(htmlP2, margins.left, {width: margins.width}, margins)
    doc.addPage()
    doc.fromHTML(htmlP3, margins.left, {width: margins.width}, margins)
    doc.addPage()
    doc.fromHTML(htmlP4, margins.left, {width: margins.width}, margins)
    doc.save(pdfName + '.pdf')
  }
}
