const ReactDom = {
    render
}

function render(vnode, container) {
    if (vnode === undefined) return
    //如果是字符串
    if (typeof vnode === 'string') {
        //创建文本节点
        const textNode = document.createTextNode(vnode)
        return container.appendChild(textNode)
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
    return container.appendChild(dom)
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