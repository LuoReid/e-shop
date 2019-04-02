import BaseButton from './BaseButton.vue'
import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer';

describe('BaseButton', () => {
  // test
  test('click event', () => {
    // test code
    const wrapper = shallow(BaseButton)
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
  test('snapshot',()=>{
    const render = createRenderer()
    const wrapper = shallow(BaseButton,{
      propsData:{
        icon:'add',
        disabled:true,
        badge:'3',
      },
      slots:{
        default:'<span> Add Item</span>',
      },
    })
    render.renderToString(wrapper.vm,(err,str) => {
      if(err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
