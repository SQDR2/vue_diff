import patchVnode from "./patchVnode.js";
import creteEle from "./createEle.js";
function sameVnoe(vnode1, vnode2) {
  return vnode1?.key === vnode2?.key
}
//参数一：父元素真实节点
//参数二：旧虚拟节点数组
//参数三：新虚拟节点数组
export default function (parentElm, oldCh, newCh) {
  let oldStartIndex = 0;      //旧前指针
  let newStartIndex = 0;      //新前指针

  let oldEndIndex = oldCh.length - 1;        //旧后指针  
  let newEndIndex = newCh.length - 1;        //新后指针A

  let oldStartVnode = oldCh[0];     //旧前虚拟节点a
  let newStartVnode = newCh[0];     //新前虚拟节点

  let oldEndVnode = oldCh[oldEndIndex];     //旧后虚拟节点
  let newEndVnode = newCh[newEndIndex];     //新后虚拟节点

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartVnode === undefined) {
      oldStartVnode = oldCh[++oldStartIndex]
    }
    if (oldEndVnode === undefined) {
      oldEndVnode = oldCh[--oldEndIndex]
    } else if (sameVnoe(oldStartVnode, newStartVnode)) {        //旧前和新前
      console.log(1);
      patchVnode(oldStartVnode, newStartVnode)
      if (newStartVnode) { newStartVnode.elm = oldStartVnode?.elm }
      oldStartVnode = oldCh[++oldStartIndex]
      newStartVnode = newCh[++newStartIndex]

    } else if (sameVnoe(oldEndVnode, newEndVnode)) {    //旧后和新后
      console.log(2);
      patchVnode(oldEndVnode, newEndVnode)
      if (newEndVnode) { oldEndVnode.elm = newEndVnode?.elm }
      oldEndVnode = oldCh[--oldEndIndex]
      newEndVnode = newCh[--newEndIndex]

    } else if (sameVnoe(oldStartVnode, newEndVnode)) {    //旧前和新后
      console.log(3);
      patchVnode(oldStartVnode, newEndVnode)
      if (newEndVnode) { newEndVnode.elm = oldStartVnode?.elm }
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibing)
      oldStartVnode = oldCh[++oldStartIndex]
      newEndVnode = newCh[--newEndIndex]

    } else if (sameVnoe(oldEndVnode, newStartVnode)) {     //旧后和新前
      console.log(4);
      patchVnode(oldEndVnode, newStartVnode)
      if (newStartVnode) { newStartVnode.elm = oldEndVnode?.elm }
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIndex]
      newStartVnode = newCh[++newStartIndex]

    } else {      //以上四种情况都不匹配
      //创建一个对象，存旧虚拟节点，拿来判断新旧有没有相同的节点
      console.log(5);
      const keyMap = {}
      for (let i = oldStartIndex; i <= oldEndIndex; i++) {
        const key = oldCh[i]?.key
        if (key) keyMap[key] = i
      }
      //在旧节点中寻找 新前 指向的节点
      let indexInOld = keyMap[newStartVnode.key]
      // 如果有 说明新旧虚拟节点中都存在该节点 
      if (indexInOld) {
        console.log('都存在')
        const elmMove = oldCh[indexInOld]
        patchVnode(elmMove, newStartVnode)
        //对比处理后的节点，将其在旧虚拟节点中赋值为undefined
        oldCh[indexInOld] = undefined
        parentElm.insertBefore(elmMove.elm, oldStartVnode.elm)
      } else {//如果没有 则说明这个节点是一个新节点 就开始创建
        console.log('不存在');
        parentElm.insertBefore(creteEle(newStartVnode).elm, oldStartVnode.elm)
      }
      newStartVnode = newCh[++newStartIndex]
    }
  }
  //结束while循环 就是两种情况 新增和删除
  // 1.oldStartEnd > oldStartIndex
  // 2.newStartIndex  > oldEndIndex
  if (oldStartIndex > oldEndIndex) {
    const before = newCh[newEndIndex + 1] ? newCh[newEndIndex + 1].elm : null
    for(let i = newStartIndex;i<=newEndIndex;i++){
      console.log(newCh[i])
      parentElm.insertBefore(creteEle(newCh[i]).elm,before)
    }
  } else {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      parentElm.removeChild(oldCh[i].elm)
    }
  }
}