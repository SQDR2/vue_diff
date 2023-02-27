//进行虚拟新节点和虚拟旧节点向对比
import creteEle from "./createEle.js";
import vnode from "./vnode.js";
import patchVnode from "./patchVnode.js";
export default function(oldVnode,newVnode){

  //判断第一个参数是这是真实节点还是虚拟节点 如果是真实节点 转化为虚拟节点 再去比对
  if(oldVnode.sel == undefined){
    // oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},undefined,oldVnode.innerText,oldVnode)
    oldVnode = vnode(oldVnode)
  }
  //判断老节点和新节点是同一类型的标签 
  if(oldVnode.sel === newVnode.sel){
    //复杂操作 交给patchNode函数
    patchVnode(oldVnode,newVnode);
  }else{
    //不是同一类型的标签，添加新节点 暴力删除旧节点
    let newDomNode = creteEle(newVnode);
    let oldNode = oldVnode.elm;
    oldNode.parentNode.appendChild(newDomNode.elm);
    oldNode.parentNode.removeChild(oldNode);
  }
}