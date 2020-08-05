import { renderComponent } from '../react-dom'
class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}
        
    }
    setState(stateChange) {
        // 直接覆盖
        Object.assign(this.state, stateChange)
        renderComponent(this)
    }
}

export default Component