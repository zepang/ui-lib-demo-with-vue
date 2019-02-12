import { findParent, findChild } from '../../utils'
export default {
  methods: {
    broadcase (compName, eName, params) {
      let child = findChild(this, compName)
      if (child) child.$emit(eName, params)
    },
    dispatch (compName, eName, params) {
      let parent = findParent(this, compName)
      if (parent) parent.$emit(eName, params)
    }
  }
}