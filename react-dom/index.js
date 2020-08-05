import Component from '../react/component'

const ReactDom = {
    render
}

function render(vnode, container) {
    return container.appendChild(_render(vnode))
}

function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return ''
    if (typeof vnode === "number") vnode = String(vnode)
    //如果是字符串
    if (typeof vnode === 'string') {
        //创建文本节点
        const textNode = document.createTextNode(vnode)
        return textNode
    }


    //如果是函数组件
    if (typeof vnode.tag === 'function') {
        // 创建组件
        const comp = ceateComponent(vnode.tag, vnode.attrs)
        // 设置组件属性
        setComponentProps(comp, vnode.attrs)
        // 组件渲染节点对象返回
        return comp.base
    }

    // 否则就是虚拟dom
    const { tag, attrs, childrens = [] } = vnode
    const dom = document.createElement(tag)
    // 设置属性
    if (attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key]
            _setAttribute(dom, key, value)
        });
    }
    childrens.forEach(child => render(child, dom))
    return dom
}

export function renderComponent(comp) {
    let base
    const renderer = comp.render()
    base = _render(renderer)
    if (comp.base && comp.componentWillUpdate) {
        comp.componentWillUpdate()
    }
    if (comp.base) {
        if (comp.componentDidUpdate) {
            comp.componentDidUpdate()
        }
    } else if (comp.componentDidMount) {
        comp.componentDidMount()
    }

    // 作state修改后，节点替换
    if (comp.base && comp.base.parentNode) {
        comp.base.parentNode.replaceChild(base, comp.base)
    }

    comp.base = base
}

function setComponentProps(comp, props) {
    if (!comp.base) { //当组件实例还没有挂载的时候
        if (comp.componentWillMount) comp.componentWillMount()
    } else if (comp.componentWillReceiveProps) {
        comp.componentWillReceiveProps()
    }
    comp.props = props
    renderComponent(comp)
}
function ceateComponent(comp, props) {
    let inst;
    // 如果是类定义的组件，则创建实例，返回 class A extends React.Component
    if (comp.prototype && comp.prototype.render) {
        inst = new comp(props)
    } else {
        // 如果是函数组件，将函数组件扩展成类组件，方便后面统一管理
        inst = new Component(props)
        inst.constructor = comp
        inst.render = function () {
            return this.constructor(props)
        }
    }
    return inst
}

function _setAttribute(dom, key, value) {
    // 将属性名className转化成class
    if (key === 'className') {
        key = 'class'
    }
    // 如果是事件 onClick...
    if (/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom[key] = value || ''
    } else if (key === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            for (let k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px'
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else {
        if (key in dom) {
            dom[key] = value || ''
        }
        if (value) {
            dom.setAttribute(key, value)
        } else {
            dom.removeAttribute(key)
        }
    }
}
export default ReactDom