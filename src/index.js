class TimeoutHandler {
  constructor(){
    this.store = {}
    this.metadata = {}
  }
  setTimeout(key, func, time){
    this.setSomething('setTimeout', key, func, time)
  }
  setInterval(key, func, time){
    this.setSomething('setInterval', key, func, time)
  }
  setSomething(type, key, func, time) {
    if (!(typeof key === 'string') || !(typeof func === 'function') || (key.length === 0) || (time && typeof time !== 'number')) {
      throw new Error('setTimeout takes: (key:string, func:function, time:int:optional')
    }
    if (this.store[key]) {
      clearTimeout(this.store[key])
      clearInterval(this.store[key])
    }
    this.metadata[key] = {type, func, time} // Metadata
    const timerFunc = type === 'setInterval' ? setInterval : setTimeout
    this.store[key] = timerFunc(()=>{
      this.store[key] = null
      this.metadata[key] = null // metadata
      func()
    }, time)
  }
  cancel(key){
    if (this.store[key]) {
      clearTimeout(this.store[key])
      clearInterval(this.store[key])
      this.store[key] = null

      this.metadata[key] = null // metadata
    }
  }
  getTimers(){
    return this.metadata
  }
}

module.exports = TimeoutHandler
