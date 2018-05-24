export default {
  /**
   * creer une arrondie
   * @param nombre
   * @param precision
   * @returns {number}
   */
  arrondi (nombre, precision) {
    var factor = Math.pow(10, precision)
    return Math.round(nombre * factor) / factor
  },

  aronndiA05 (nombre) {
    var y = Math.round(2 * nombre) / 2;
  }
}
