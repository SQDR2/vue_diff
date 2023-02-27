import creteEle from "./createEle.js";
import updateChild from './updateChild.js'
//如果旧虚拟节点和新虚拟节点的标签是相同的 在这个函数里面在继续判断
export default function patchVnode(oldVnode, newVnode) {
  //如果新节点没有子节点
  if (newVnode.children === undefined) {
    //新节点里面的文本与旧节点文本不相同
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {//新节点有子节点
    //新节点有字节点 旧节点也有子节点
    if (oldVnode.children !== undefined) {
      //最复杂的情况 diff算法核心
      updateChild(oldVnode.elm, oldVnode.children, newVnode.children);

    } else {//旧节点没有字节点
      oldVnode.elm.innerText = '';
      for (const child of newVnode.children) {
        let childDom = creteEle(child);
        oldVnode.elm.appendChild(childDom.elm)
      }
    }
  }
}