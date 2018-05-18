var facture =` <!doctype html>
<html>
<head>
<meta charset="utf-8">
  <title>A simple, clean, and responsive HTML invoice template</title>

<style>
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, .15);
  font-size: 16px;
  line-height: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td{
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
.invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

.invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>
</head>

<body>
<div class="invoice-box">
  <table cellpadding="0" cellspacing="0">
  <tr class="top">
  <td colspan="2">
  <table>
  <tr>
  <td class="title">
  <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
  </td>

  <td>
  Période du : ${facture.debutPeriode} <br>
Au : ${facture.finPeriode}
</td>
</tr>
</table>
</td>
</tr>

<tr class="information">
  <td colspan="2">
  <table>
  <tr>
  <td>
  Madame ${facture.nomAssMat + ' ' + facture.prenomAssMat}<br>
  ${facture.rueAssMat + ' ' + facture.cpAssMat + ' ' + facture.villeAssMat}<br>
  </td>


  <td>
  ${facture.nomEmployeur + ' ' + facture.prenomEmployeur}<br>
  ${facture.rueEmployeur + ' ' + facture.cpEmployeur + ' ' + facture.villeEmployeur}<br>
  </td>
  </tr>
  </table>
  </td>
  </tr>

  <tr class="heading">
  <td>
  Eléments pris en compte
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

<tr class="heading">
  <td>
  Volet Social
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

<tr class="heading">
  <td>
  Indemnités
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


<tr class="heading">
  <td>
  SALAIRE NET
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
${facture.congePaye10%}
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

<tr class="heading">
  <td>
  MONTANT NET A PAYER
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
