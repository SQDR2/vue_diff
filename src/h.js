//生成虚拟DOM
import vnode from "./vnode.js"
import patch from "./patch.js";
export default function h(){
  // const vnode1 = vnode('div',{},undefined,'虚拟节点更改结果',undefined)
  // const vnode1 = vnode('h1',{},undefined,'hello',undefined)
  // const vnode1 = vnode('ul',{},[
  //   vnode('li',{},undefined,'a',undefined),
  //   vnode('li',{},undefined,'b',undefined),
  //   vnode('li',{},undefined,'c',undefined)
  // ],
  // '',undefined)
  //vnode(realDom=undefined,sel=undefined, data={}, children=[], text='', elm=undefined)
  //a b c d e
  //c b e a d
    // const vnode1 = vnode(undefined,'div',{},[
    //      vnode(undefined,'li',{key:'c'},undefined,'c',undefined),
    //      vnode(undefined,'li',{key:'b'},undefined,'b',undefined),
    //      vnode(undefined,'li',{key:'e'},undefined,'e',undefined),
    //      vnode(undefined,'li',{key:'a'},undefined,'a',undefined),
    //      vnode(undefined,'li',{key:'d'},undefined,'d',undefined),
    //      vnode(undefined,'li',{key:'f'},undefined,'f',undefined)
    //    ],'',undefined)

    const vnode1 = vnode(undefined,'div',{},[
      vnode(undefined,'li',{key:'a'},undefined,'a',undefined),
      vnode(undefined,'li',{key:'b'},undefined,'b',undefined),
      vnode(undefined,'li',{key:'c'},undefined,'c',undefined),
      vnode(undefined,'li',{key:'d'},undefined,'d',undefined),
    ],'',undefined)

  const div_hello = document.getElementById('hello');
  patch(div_hello,vnode1)
}