
function interval(functions) {
  let timer = 1
  setInterval(
    () => {
      functions.forEach(fn => fn(timer))
      timer++
    }
    , 2000)
}

class Logger {
  static log(data) {
    console.log(data)
  }
}

class LoggerObserver {
  constructor() {
    this.log = Logger.log
    this.subscribers = []
  }
  //subscribe to logger
  subscribe(fn) {
    this.subscribers.push(fn)
  }
  //execute all subscribers and log data
  executeAndLog = (data) => {
    this.subscribers.forEach(subscriber => this.log(subscriber(data)))
  }
}

function saveCToSessionStorage(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  return data;
}

function saveDToSessionStorage(data) {
  console.log('[reader D]', data)
  const storageData = { data }
  sessionStorage.setItem('D', JSON.stringify(storageData))
  return data;
}
let logger = new LoggerObserver()
logger.subscribe(saveCToSessionStorage)


interval([saveDToSessionStorage, logger.executeAndLog]);
