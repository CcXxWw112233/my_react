import Component from './component'
function createElement(tag, attrs, ...childrens) {
    return {
        tag,
        attrs,
        childrens,
        key: attrs ? attrs.key : null
    }
}

const React = {
    createElement,
    Component
}

export default React;