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
    constructor(props) {
        super(props)
        this.state = {
            number: 1
        }
    }
    componentWillMount() {
        // console.log('组件将要加载')
    }
    componentWillReceiveProps(props) {
        // console.log('props')
    }
    componentWillUpdate() {
        // console.log('组件将要更新')
    }
    componentDidUpdate() {
        // console.log('组件更新完成')
    }
    componentDidMount() {
        for (let i = 0; i < 10; i++) {
            // this.setState((prevState, prevProps) => {
            //     console.log(prevState.number, 'a')
            //     return {
            //         number: prevState.number + 1
            //     }
            // })
            // this.setState({
            //     number: this.state.number + 1
            // })
        }

        // console.log('组件加载完成')
    }
    handleClick() {
        this.setState({
            number: this.state.number + 1
        }, () => {
            console.log(this.state.number)
        })
    }
    render() {
        return (
            <div className='active' title='123' onClick={this.handleClick.bind(this)}>
                hahahha
                <h3 className='title'>hello react <p>aa{this.state.number}</p></h3>
            </div>
        )
    }
}

// console.log('function', <Home name={'active'}></Home>)
// console.log('class', <Main name={'active'}></Main>)
// console.log('ele', ele)
ReactDom.render(<Main name={'active'} />, document.querySelector('#root'))
// creactElement(tag, attrs, child1, child2)
// 为什么ReactDom.render必须要引入react? ==> 因为要先将jsx对象转化成js对象