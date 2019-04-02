import BaseButton from './BaseButton.vue'
import { shallow } from 'vue-test-utils'

describe('BaseButton', () => {
  // test
  test('click event', () => {
    // test code
    const wrapper = shallow(BaseButton)
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
