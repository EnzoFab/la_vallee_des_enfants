import MailService from '../services/MailService'

export default {
  async mailConnexionEmployeur (login, pwd, destinataire) {
    let url = process.env.BASE_URL.split('/api')[0]
    let lien = url + '/employeur/connexion'
    let pageAccueil = `<a href='${lien}'>Page de connexion</a>`
    let texte = 'Bienvenue sur La vallée des enfants</br>' +
      'votre compte a été créé avec succès !</br>' +
      'Pour accéder à votre espace veuillez vous connecter directement sur le site ' +
      pageAccueil + '<br><br>' +
      `Identifiants de connexion : <br>Login: <b>${login}</b><br>` +
      `Mot de passe: <b>${pwd}</b><br> Pensez à changer votre mot de passe dès que possible`

    let data = {
      to: destinataire,
      sujet: 'Compte créé',
      message: texte
    }

    try {
      let response = await MailService.sendMail(data)
      //
      console.log('Mail', response)
      if (response.data.erreur == null) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }
}
