import { _setAttribute, setComponentProps, ceateComponent } from './index'

export function diff(dom, vnode, container) {
    // 对比节点变化
    const ret = diffNode(dom, vnode)
    if (container) {
        container.appendChild(ret)
    }
    return ret
}

export function diffNode(dom, vnode) {
    console.log(dom, vnode)
    let out = dom //接收器
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return ''
    if (typeof vnode === "number") vnode = String(vnode)
    //如果是字符串
    if (typeof vnode === 'string') {
        //创建文本节点
        if (typeof vnode === 'string') {
            if (dom && dom.nodeType === 3) {
                if (dom.textContent !== vnode) {
                    // 更新文本内容
                    dom.textContent = vnode
                }
            } else {
                out = document.createTextNode(vnode)
                if (dom && dom.parentNode) {
                    dom.parentNode.replaceNode(out, dom)
                }
            }
        }
        return out
    }

    if (typeof vnode.tag === 'function') {
       return diffComponent(out, vnode)
    }

    // 非文本dom
    if (!dom) {
        out = document.createElement(vnode.tag)
    }
    // 比较子节点
    if (
        (vnode.childrens && vnode.childrens.length > 0) ||
        (out.childNodes && node.childNodes.length > 0)
    ) {
        diffChildren(out, vnode.childrens)
    }

    diffAttribute(out, vnode)
    return out
}

function diffComponent(dom, vnode) {
    let comp = dom
    // 如果组件没有变化，重新设置props
    if (comp && comp.constructor === vnode.tag) {
        //重新设置props
        setComponentProps(comp, vnode.attrs)
        dom = comp.base
    } else { //组件类型发生变化
        if (comp) {
            umountComponent(comp) //卸载吊
            comp = null
        }
        // 创建新组件
        comp = ceateComponent(vnode.tag, vnode.attrs)
        // 设置组件属性
        setComponentProps(comp, vnode.attrs)
        // 给当前挂载base
        dom = comp.base

    }
    return dom
}

function umountComponent(comp) {
    _removeNode(comp.base)
}

function _removeNode(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeNode(dom)
    }
}

function diffAttribute(dom, vnode) {
    // 保存之前的dom的所有属性
    const oldAttrs = {}
    const newAttrs = vnode.attrs
    // dom是原有节点的对象
    const domAttrs_ = dom.attributes
    const domAttrs = [...domAttrs_]

    domAttrs.forEach(item => {
        oldAttrs[item.name] = oldAttrs[item.value]
    });

    // 比较，如果原来的属性跟新的属性对比，不在新的属性中，则将其移除（属性值设置为undefined）
    for (let key in oldAttrs) {
        if (!(key in newAttrs)) {
            _setAttribute(dom, key, undefined)
        }
    }
    for (let key in newAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            _setAttribute(dom, key, newAttrs[key])
        }
    }
}

// 子节点比较未实现
function diffChildren(out, vchildrens) {

}