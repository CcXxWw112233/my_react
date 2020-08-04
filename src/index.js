import React from '../react/index'
import ReactDom from '../react-dom/index'

console.log(React)
function aa() {
    alert(1)
}
const ele = (
    <div className='active' title='123' onClick={aa}>
        hahahha
        <h3 className='title'>hello react <p>aaa</p></h3>
    </div>
)
ReactDom.render(ele, document.querySelector('#root'))
console.log(ele)
// creactElement(tag, attrs, child1, child2)
// 为什么ReactDom.render必须要引入react? ==> 因为要先将jsx对象转化成js对象