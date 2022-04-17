const storage = {
  set: (name, data) => {
    let source = JSON.stringify(data);
    return localStorage.setItem(name, source)
  },
  get: (name, defaultEmpty = null) => {
    let source = localStorage.getItem(name);
    if(source) {
      return JSON.parse(source);
    } else {
      return defaultEmpty;
    }
  },
  remove: (name = null) => {
    return new Promise(async (resolve, reject) => {
      if(!!name) {
        localStorage.removeItem(name)
      } else {
        localStorage.clear();
      }
      resolve();
    })
  }
}

export default storage;