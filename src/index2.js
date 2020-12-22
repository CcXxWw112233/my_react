import React from "react";
import ReactDom from "react-dom";

let element = (
  <div id="A1">
    <div id="B1">
      <div id="C1"></div>
      <div id="C2"></div>
    </div>
    <div id="B2"></div>
  </div>
);

console.log(JSON.stringify(element));
const c = {
  type: "div",
  key: null,
  ref: null,
  props: {
    id: "A1",
    children: [
      {
        type: "div",
        key: null,
        ref: null,
        props: {
          id: "B1",
          children: [
            {
              type: "div",
              key: null,
              ref: null,
              props: { id: "C1" },
              _owner: null,
              _store: {},
            },
            {
              type: "div",
              key: null,
              ref: null,
              props: { id: "C2" },
              _owner: null,
              _store: {},
            },
          ],
        },
        _owner: null,
        _store: {},
      },
      {
        type: "div",
        key: null,
        ref: null,
        props: { id: "B2" },
        _owner: null,
        _store: {},
      },
    ],
  },
  _owner: null,
  _store: {},
};
ReactDom.render(element, document.querySelector("#root"));
