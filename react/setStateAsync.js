import { renderComponent } from '../react-dom'


// 异步更新state，短时间内把多个setState合并成一个 队列（先进先出）
// 一段时间之后再清空队列
function defer(fn) {
    return Promise.resolve().then(fn)
}
const setStateQueue = []  //保存statechange队列
const renderQueue = []  //保存当前组件
// 清空队列
export function enquequeSetState(stateChange, component, calback) {

    // 
    if (setStateQueue.length === 0) {
        defer(flush).then((res) => {
            if (typeof calback === 'function') {
                calback()
            }
        })
    }

    //  短时间内合并多个setState
    setStateQueue.push({
        stateChange,
        component
    })
    // 如果renderQueue里面没有组件，添加到队列中
    let r = renderQueue.some(item => {
        return item === component
    })
    if (!r) { //第一次添加
        renderQueue.push(component)
    }
}
// 一段时间之后
function flush() {
    let item; //每一个setstate动作
    let component;

    while (item = setStateQueue.shift()) {
        const { stateChange, component } = item

        // 保存之前的状态
        if (!component.prevState) {
            component.prevState = Object.assign({}, component.state)
        }

        // 进行新状态更新
        if (typeof stateChange === 'function') {
            Object.assign(component.state, stateChange(component.prevState, component.props))
        } else {
            Object.assign(component.state, stateChange)
        }
        // 保存当前状态
        component.prevState = component.state
    }
    while (component = renderQueue.shift()) {
        renderComponent(component)
    }
}