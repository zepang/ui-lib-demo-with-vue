let uid = 0

function A () {
  this.init()
}

A.prototype.init = function () {
  var vm = this
  vm.name = 123
  vm.event = []
  vm.uid = uid++
  console.log(this);
}

A.prototype.add = function (name) {
  this.event.push(name)
}

// class A {
//   constructor () {
//     this.name = 123
//     this.event = []
//     this.uid = uid++
//   }
//   add (name) {
//     this.event.push(name)
//   }
// }

export default A