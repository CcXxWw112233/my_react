import React from '../react/index'
import ReactDom from '../react-dom/index'

function aa() {
    alert(1)
}
const ele = (
    <div className='active' title='123' onClick={aa}>
        hahahha
        <h3 className='title'>hello react <p>aaa</p></h3>
    </div>
)
function Home() {
    return (
        <div className='active' title='123' onClick={aa}>
            hahahha
            <h3 className='title'>hello react <p>aaa</p></h3>
        </div>
    )
}

class MainChild extends React.Component {
    render() {
        return (
            <div className='active' title='123' >
                MainChild
            </div>
        )
    }
}
class Main extends React.Component {
    render() {
        return (
            <div className='active' title='123' onClick={aa}>
                hahahha
                <h3 className='title'>hello react <p>aaa</p></h3>
                <MainChild />
            </div>
        )
    }
}

console.log('function', <Home name={'active'}></Home>)
console.log('class', <Main name={'active'}></Main>)
console.log('ele', ele)
ReactDom.render(<Main name={'active'} />, document.querySelector('#root'))
// creactElement(tag, attrs, child1, child2)
// 为什么ReactDom.render必须要引入react? ==> 因为要先将jsx对象转化成js对象