import Vue from 'vue'
import Alert from './Alert.vue'
import { mount, shallowMount } from '@vue/test-utils'

// const instance = new Vue({
//   render: (h) => {
//     return h(Alert, {})
//   }
// })

// const vm = instance.$mount()

describe('Item.vue', () => {
  test('sanity test', () => {
    // expect(wrapper.vm.$el.textContent).toContain('Alert')  
    const wrapper = shallowMount(Alert, {sync: false})
    debugger
    expect(wrapper.text()).toContain('Alert')
    return
  })
  test('has the expected html structure', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
  test('assert test', () => {
    expect(true).toBe(true)
  })
  
})