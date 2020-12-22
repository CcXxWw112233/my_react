let element = {
  type: "div",
  props: {
    id: "A1",
    children: [
      {
        type: "div",
        props: {
          id: "B1",
          children: [
            {
              type: "div",
              props: { id: "C1" },
            },
            {
              type: "div",
              props: { id: "C2" },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          id: "B2",
          children: [
            {
              type: "div",
              props: { id: "D1" },
            },
            {
              type: "div",
              props: { id: "D2" },
            },
          ],
        },
      },
    ],
  },
};
export default element;
