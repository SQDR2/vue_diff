//生成虚拟节点的函数
export default function vnode(realDom=undefined,sel=undefined, data={}, children=[], text='', elm=undefined) {
    //节点标签 节点属性(对象) 子节点 文本 真是节点
  if(realDom){
    sel=realDom.tagName.toLowerCase()
    for (const child of realDom.children) {
      children.push(vnode(child))
    }
    text=realDom.firstChild.nodeValue==='\n    '?undefined:realDom.firstChild.nodeValue
    data={key:text}
    elm=realDom
    let key=data?.key
  }
  // console.log({ sel, data, children, text, elm ,key:data.key});
  return { sel, data, children, text, elm ,key:data.key}
}