import Component from './component'
function createElement(tag, attrs, ...childrens) {
    return {
        tag,
        attrs,
        childrens
    }
}

const React = {
    createElement,
    Component
}

export default React;