import Vue from 'vue'
class A {
  constructor () {
    this.name = 123
    this.event = []
  }
  add (name) {
    this.event.push(name)
  }
}
export default new A()

