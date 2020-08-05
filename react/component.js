
import { enquequeSetState } from './setStateAsync'

class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}

    }
    // 异步setstate 思路 ：队列
    setState(stateChange) {
        // // 直接覆盖
        // Object.assign(this.state, stateChange)
        // // 渲染组件
        // renderComponent(this)
        enquequeSetState(stateChange, this)
    }
}

export default Component