import Api from '../services/Api'

export default {
  getAllChildrenOfTheDay () {
    var date = new Date()
    var day = date.getDay()
    console.log('tape dessus')
    return Api().get('presencetheo/' + day + '/allchildren')
  }
}
