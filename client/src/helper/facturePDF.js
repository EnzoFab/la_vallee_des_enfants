import Jspdf from 'jspdf'

export default {
  createFacturePdf (facture) {
    var html = ` <!doctype html>
<html>

<body>
<div class="invoice-box">
  <table>
  <tr>
  <td class="title">
  <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
  </td>
  <td>
  </td>
  <td>
  Période du : ${facture.debutPeriode} <br>
Au : ${facture.finPeriode}
</td>
</tr>
</table>
  <p> </p>

<tr class="information">
  <td colspan="2">
  <table>
  <tr>
  <td>
  Madame ${facture.nomAssMat + ' ' + facture.prenomAssMat}<br>
  ${facture.rueAssMat + ' ' + facture.cpAssMat + ' ' + facture.villeAssMat}<br>
  </td>
  <td>
  </td>
  <td>
  ${facture.nomEmployeur + ' ' + facture.prenomEmployeur}<br>
  ${facture.rueEmployeur + ' ' + facture.cpEmployeur + ' ' + facture.villeEmployeur}<br>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <p> </p>
  
  <table>
  <tr class="heading">
  <td>
  <b> Eléments pris en compte </b>
</td>

<td>

</td>

<td>

</td>

<td>

</td>
</tr>

<tr class="details">
  <td>
  Nombre de jours d'activité
</td>

<td>

</td>

<td>

</td>

<td>
${facture.nombreJoursActivite}
</td>
</tr>

<tr class="details">
  <td>
  Nombre d'heures normales
</td>

<td>

</td>

<td>

</td>

<td>
${facture.nombreHeuresNormales}
</td>
</tr>

<tr class="details">
  <td>
  Nombre d'heures complémentaires ou majorées
</td>

<td>

</td>

<td>

</td>

<td>
${facture.nombreHeuresMajorees}
</td>
</tr>
</table>
<p> </p>
<table>
<tr class="heading">
  <td>
  <b> Volet Social </b>
</td>

<td>

</td>

<td>

</td>

<td>

</td>
</tr>

<tr class="details">
  <td>
  Nombre de jours de congés payés
</td>

<td>

</td>

<td>

</td>

<td>
${facture.nombreJoursCongesPayes}
</td>
</tr>

<tr class="details">
  <td>
  Salaire horaire normal
</td>

<td>

</td>

<td>

</td>

<td>
${facture.salaireHoraireNormal}
</td>
</tr>

<tr class="details">
  <td>
  Date limite de paiement de salaire
</td>

<td>

</td>

<td>

</td>

<td>
${facture.dateLimitePaiement}
</td>
</tr>
</table>
<p> </p>
<table>
<tr class="heading">
  <td>
  <b> Indemnités </b>
  </td>

  <td>
  Montant
  </td>

  <td>
  Jours
  </td>
  <td>
  Total
  </td>
  </tr>

  <tr class="details">
  <td>
  Entretien mensuel
</td>

<td>
${facture.indemnitesMensuelles}
</td>
<td>
1
</td>
<td>
${facture.indemnitesMensuelles}
</td>
</tr>

<tr class="details">
  <td>
  Goûter
  </td>
  <td>
  ${facture.gouter}
  </td>
  <td>
  1
  </td>
  <td>
  ${facture.gouter}
  </td>
  </tr>

  <tr class="details">
  <td>
  Absence
  </td>
  <td>
  ${facture.entretien}
  </td>
  <td>
  ${facture.nbJoursAbsence}
  </td>
  <td>
  ${facture.coutTotalIndemnitesAbs}
  </td>
  </tr>

  <tr class="details">
  <td>
  Jours fériés
</td>
<td>
${facture.entretien}
</td>
<td>
${facture.nbJoursFériés}
</td>
<td>
${facture.coutTotalIndemnitesJoursFeries}
</td>
</tr>

<tr class="details">
  <td>
  Jour(s) supplémentaire(s)
</td>
<td>
${facture.entretien}
</td>
<td>
${facture.nbJoursPresenceExcept}
</td>
<td>
${facture.coutTotalJoursExceptionnels}
</td>
</tr>
</table>

<p> </p>

<table>
<tr class="heading">
  <td>
  <b> SALAIRE NET </b>
</td>

<td>

</td>

<td>

</td>

<td>
${facture.salaireNet}
</td>
</tr>

<tr class="item">
  <td>
  Congé payé 10%
</td>

<td>

</td>

<td>

</td>

<td>
${facture.congePaye10}
</td>
</tr>

<tr class="item">
  <td>
  Indemnité entretien
</td>

<td>

</td>

<td>

</td>

<td>
${facture.indemEntretien}
</td>
</tr>
</table>
<p> </p>
<table>
<tr class="heading">
  <td>
  <b> MONTANT NET A PAYER </b>
</td>

<td>

</td>

<td>

</td>

<td>
${facture.montant}
</td>
</tr>
</table>

</div>
</body>
</html>
`
    let pdfName = 'facture'
    var doc = new Jspdf('p', 'pt', 'letter')
    var margins = {
      bottom: 60,
      left: 40,
      width: 522
    }
    doc.fromHTML(html, margins.left, {width: margins.width}, margins)
    doc.save(pdfName + '.pdf')
  }
}

