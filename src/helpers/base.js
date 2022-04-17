const base = {
  formatText: (name) => {
    return name.replace('-', ' ')
  },
  persenStat: (val, stats) => {
    let top = 0
    stats.map((obj) => {
      if(obj.stat.base_stat[0].value > top) {
        top = obj.stat.base_stat[0].value
      }
    });
    return val / top * 100
  },
  colorStat: (val) => {
    if (val < 35) {
      return '#e57373'
    } else if (val < 70) {
      return '#fff176'
    } else {
      return '#81c784'
    }
  },
  toCm: (inch) => {
    return (inch * 2.54).toFixed(2)
  },
  toKg: (lbs) => {
    return (lbs * 0.453592).toFixed(2)
  }
}

export default base;