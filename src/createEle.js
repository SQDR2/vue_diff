//将虚拟节点转化为真实节点等一系列操作
export default function creteEle(vnode){
  //虚拟节点转化为真实节点
  const realNode = document.createElement(vnode.sel)
  if(vnode.text && (vnode.children == undefined || (vnode.children && vnode.children.length == 0))){
    //真实节点添加文本
    realNode.innerText = vnode.text;
  }else if(Array.isArray(vnode.children) && vnode.children.length > 0){
    for (const child of vnode.children) {
      //递归虚拟子节点 转化为真是子节点
      const childNode = creteEle(child)
      //将真实子节点添加到节点下
      realNode.appendChild(childNode.elm)
    }
  }
  // 补充vnode的elm属性
  vnode.elm = realNode
  return vnode
}