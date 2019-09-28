/**
 * @param {String} data
 */
exports.runtime = (data, msg) => {
  let point = 0

  /**
   * memory
   * @type {Array<Number>}
   */
  const memory = []
  data = data.split('\n').join(' ')
  data.split(' ').forEach((cnt) => {
    switch (cnt.trim()) {
      case '^+':
        point++
        break

      case '^-':
        point--
        break

      case '<+':
        if (!memory[point]) memory[point] = 0
        memory[point]++
        break

      case '<-':
        if (!memory[point]) memory[point] = 0
        memory[point]--
        break

      case '<+=':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point]
        break

      case '<-=':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point]
        break

      case '<*=':
        if (!memory[point]) memory[point] = 0
        memory[point] *= memory[point]
        break

      case '</=':
        if (!memory[point]) memory[point] = 0
        memory[point] /= memory[point]
        break

      case '<+^':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point - 1]
        break

      case '<+_':
        if (!memory[point]) memory[point] = 0
        memory[point] += memory[point + 1]
        break

      case '<-^':
        if (!memory[point]) memory[point] = 0
        memory[point] -= memory[point - 1]
        break

      case '<-_':
        if (!memory[point]) memory[point] = 0
        memory[point] -= memory[point + 1]
        break

      case '<*^':
        if (!memory[point]) memory[point] = 0
        memory[point] *= memory[point - 1]
        break

      case '<*_':
        if (!memory[point]) memory[point] = 0
        memory[point] *= memory[point + 1]
        break

      case '</^':
        if (!memory[point]) memory[point] = 0
        memory[point] /= memory[point - 1]
        break

      case '</_':
        if (!memory[point]) memory[point] = 0
        memory[point] /= memory[point + 1]
        break

      case '->':
        if (!memory[point]) memory[point] = 0
        msg.channel.send(memory[point])
        break

      case '=>':
        if (!memory[point]) memory[point] = 0
        msg.channel.send(String.fromCharCode(memory[point]))
        break

      case ']':
        return 0

      default:
        break
    }
  })
}
