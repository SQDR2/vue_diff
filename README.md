# vue_diff
简单的手写了diff算法，用比较简单的方法理解diff算法
# 1.首先生成新虚拟节点 (h.js通过vnode.js生成虚拟节点)

## 2.进行真实节点（旧虚拟节点）和新虚拟节点的对比（h.js中执行patch.js）

### 3.在patch.js中判断传入的是否是真实节点，是的话通过vnode.js转化为虚拟节点（旧虚拟节点），然后新虚拟节点和旧虚拟节点进行对比

#### patch.js中，新旧虚拟节点对比，如果不是同一类型的标签，添加新节点 暴力删除旧节点

#### 如果是同一类型节点，则继续判断新虚拟节点存不存在子节点（在patchVnode.js中判断children属性为不为空）

##### 不存在子节点，继续判断存不存在文本，或者文本需不需要更新

##### 存在子节点，进行最核心的判断，在updateChild.js中传入三个参数（真实节点，旧虚拟节点子节点，新虚拟节点子节点），进行所有子节点对比

###### 在四种匹配前，判断新前和旧前是否都小于等于新后和旧后，否则退出循环（代表新子节点数组或者旧子节点数组存在一个循环完了）

###### 1.新子节点前和旧子节点前比较

- 匹配成功，将新前的虚拟节点插入旧前在真实DOM中的位置，然后新前++  ， 旧前++ ，跳出当前循环继续下一次循环
- 匹配失败，继续下一个比较

###### 2.新子节点前和旧子节点后比较 

- 匹配成功，将新前的虚拟节点插入旧后在真实DOM中的位置，然后新前++，旧后--，跳出当前循环继续下一次循环
- 匹配失败，继续下一个比较

###### 3.新子节点后和旧子节点前比较 

- 匹配成功，将新后的虚拟节点插入旧前在真实DOM中的位置，然后新后--，旧前++，跳出当前循环继续下一次循环
- 匹配失败，继续下一个比较

###### 4.新子节点后和旧子节点后比较 

- 匹配成功，将新后的虚拟节点插入旧后在真实DOM中的位置，然后新后--，旧后--，跳出当前循环继续下一次循环
- 匹配失败，进行最后一个判断（第五点）

###### 5.如果前面四个没有匹配上，在这个判断中，首先判断新旧子节点存不存在key值

- 都存在key值，创建一个对象，存储旧子节点，将新前节点与这个循环匹配，匹配成功判断两个节点是否相同，相同则将该节点插入到真实DOM的最前方，将该旧虚拟节点设置为undefined，否则，将新前拆入到旧虚拟节点的匹配的位置，然后前原本的旧虚拟节点设置为null，新前++
- 上面一种还有一种理解是，新前和旧虚拟节点对象匹配，成功则通过patchVnode.js判断真实节点（旧虚拟节点的一个属性elm）和新前节点，然后插入到真实节点中
- 不存在key值，直接将新子节点插入到真实DOM中
- （ps：这下可以解释为什么v-for的时候需要设置key了，如果没有key那么就只会做四种匹配，就算指针中间有可复用的节点都不能被复用了）
