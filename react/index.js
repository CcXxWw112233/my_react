
function createElement(tag, attrs, ...childrens) {
    return {
        tag,
        attrs,
        childrens
    }
}

const React = {
    createElement
}

export default React;