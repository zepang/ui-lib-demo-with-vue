/**
 * https://cn.vuejs.org/v2/guide/render-function.html#函数式组件
 */
export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    }

    return ctx.props.render(h, params)
  }
}
