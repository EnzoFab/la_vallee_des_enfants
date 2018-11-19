const JOURSEMAINE = ['Dimanche', 'Lundi','Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MOIS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
import moment from 'moment'
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

  formatMomentDate (date) {
    return moment(date).format().split('T')[0]
  },

  formatTimeFr (time) {
    let split = time.split(':')
    let minutes = split[1]
    if (minutes.length < 2) minutes = '0' + minutes
    return split[0] + ' h ' + minutes
  },

  formatTime (time) {
    let split = time.split(':')
    return split[0] + ':' + split[1]
  },

  getCurrentTime (date) {
    if (!date) {
      let d = new Date()
      return d.getHours() + ':' + d.getMinutes()
    } else {
      return date.getHours() + ':' + date.getMinutes()
    }

  },

  /**
   * transforme en format temps
   * @param heure
   * @param minute
   */
  toTime(heure, minute) {
    let h = '' + heure
    let m = '' + minute

    if (h.length === 1) {
      h = '0' + h
    }
    if (m.length === 1) {
      m = '0' + m
    }
    return h + ':' + m
  }
}
