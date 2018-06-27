const JOURSEMAINE = ['Dimanche', 'Lundi','Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MOIS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
export default {
  getWeekDays () {
    return JOURSEMAINE
  },
  getMonth () {
    return MOIS
  },
  /**
   * Retourne la date en version francaise ex: 1 Janvier 2001
   * @param date
   * @returns {string}
   */
  getDateFr (date) {
    let day = date.getDate()
    let month = MOIS[date.getMonth()]
    let year = date.getFullYear()
    return day + ' ' + month + ' ' + year
  },
  /**
   * Retourne le jour de la semaine ex Lundi
   * @param date
   * @returns {string}
   */
  getWeekDay (date) {
    return JOURSEMAINE[date.getDay()]
  },
  /**
   * retourne la date complete ex: Lundi 1 janvier 2001
   * @param date
   * @returns {string}
   */
  getDateFrExplicit (date) {
    return this.getWeekDay(date) + ', ' + this.getDateFr(date)
  },

  formatDate (date, monthOnly) {
    let m = date.getMonth() + 1
    let format = date.getFullYear() + '-' + m.toString()
    if (!monthOnly) {
      format += '-' + date.getDate()
    }
    return format
  },

  formatTime (time) {
    let split = time.split(':')
    return split[0] + ' h ' + split[1]
  }
}
