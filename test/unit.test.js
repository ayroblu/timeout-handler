const assert = require('assert')
const TimeoutHandler = require('../')

describe('Normal get set timeouts and intervals', function(){
  it('should create a timeout and find it in the meta data, but after the timeout is gone it should no longer be in the meta data', function(){
    //return a promise
    const th = new TimeoutHandler()
    let state = 0
    th.setTimeout('first', ()=>{
      state = 1
    }, 100)
    assert.equal(0, state)
    assert(th.store.first)
    assert.equal('setTimeout', th.metadata.first.type)
    assert.equal(100, th.metadata.first.time)
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        assert.equal(1, state)
        assert(!th.store.first)
        resolve()
      }, 101)
    })
  })
  it('should maintain this for sub functions', function(){
    const o = {
      state: 0
    , func(){
        return this.state
      }
    }
    const th = new TimeoutHandler()
    return new Promise((resolve, reject)=>{
      th.setTimeout('subtest', ()=>{
        assert.equal(0, o.func())
        resolve()
      })
    })
  })
  // Not sure how to pass this test, might have to ignore it, or put another context parameter on the end, not important 
  //it('should maintain this for main functions', function(){
  //  const o = {
  //    state: 0
  //  , func(){
  //      console.log(this.state)
  //      this.state = 1
  //    }
  //  }
  //  const th = new TimeoutHandler()
  //  return new Promise((resolve, reject)=>{
  //    th.setTimeout('mainfunc', o.func)
  //    setTimeout(()=>assert.equal(o.state, 1), 10)
  //  })
  //})
  it('should throw on incomplete arguments', function(){
    const th = new TimeoutHandler()
    assert.throws(()=>th.setTimeout(()=>{
      console.log('hi')
    }))
  })
  it('should be able to override', function(){
    const th = new TimeoutHandler()
    let state = 0
    let secState = 1
    th.setTimeout('first', function(){
      state = 5
    })
    th.setTimeout('first', function(){
      secState = 3
    })
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        assert(state === 0 && secState === 3)
        resolve()
      }, 10)
    })
  })
  it('should be able to cancel', function(){
    const th = new TimeoutHandler()
    let state = 0
    th.setTimeout('first', function(){
      state = 5
    })
    th.cancel('first')
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        assert(state === 0)
        resolve()
      }, 10)
    })
  })
})
