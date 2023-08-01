<script>
export default {
  name: 'MenuItem',
  functional: true,  // 函数化组件
  props:{
    icon: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }
  },
  render(h, context){ // render函数生成的内容相当于template的内容，使用render函数时，需要先把template标签去掉，只保留逻辑层
    const { icon, title } = context.props
    const vnodes = []
    if(icon){
        vnodes.push(<svg-icon icon-class={icon}/>)
    }
    if(title){
        if(title.length > 5) {
            vnodes.push(<span title={(title)}>{(title)}</span>)
        }else{
            vnodes.push(<span>{(title)}</span>)
        }
    }
    return vnodes //虚拟DOM内容
  }

}
</script>
