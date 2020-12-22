import element from "./element";
let container = document.getElementById("root");
const PLACEMENT = "PLACEMENT"; //插入
console.log(element);
// 下一个工作单元
// fiber其实也是一个普通的js对象
//应用的根
let workingInProgressRoot = {
  stateNode: container, //此fiber对应dom节点
  props: { children: [element] }, //fiber的属性
  //   child,
  //   return,
  //   sibling,
};
let nextUnitOfWork = workingInProgressRoot;
function workLoop(deadline) {
  //如果有当前的工作单元，就执行它，并返回下一个工作单元
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // 遍历完了
  if (!nextUnitOfWork) {
    commitRoot();
  }
}
function commitRoot() {
  let currentFiber = workingInProgressRoot.firstEffect;
  while (currentFiber) {
    console.log("commitRoot", currentFiber.props.id);
    if (currentFiber.effectTag == PLACEMENT) {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
    }
    currentFiber = currentFiber.nextEffect;
  }
  workingInProgressRoot = null;
}
/**
 * beginWork 1。创建此fiber的真实dom,通过虚拟dom创建fiber树结构
 * @param {*} workingInProgressFiber
 */
//执行任务工作单元
function performUnitOfWork(workingInProgressFiber) {
  //   debugger;
  // 1创建真实dom,并没有挂载
  // 2.创建fiber子树
  beginWork(workingInProgressFiber);
  if (workingInProgressFiber.child) {
    //如果有子，返回子
    return workingInProgressFiber.child;
  }
  while (workingInProgressFiber) {
    //如果没有儿子，当前节点其实就结束完成了
    completeUnitOfWork(workingInProgressFiber);
    if (workingInProgressFiber.sibling) {
      //如果有弟弟，返回弟弟
      return workingInProgressFiber.sibling;
    }
    //如果没有弟弟，先指向父，去找叔叔
    workingInProgressFiber = workingInProgressFiber.return;
  }
}

function beginWork(workingInProgressFiber) {
  //   debugger;
  console.log("beginWork", workingInProgressFiber.props.id);
  if (!workingInProgressFiber.stateNode) {
    workingInProgressFiber.stateNode = document.createElement(
      workingInProgressFiber.type
    );
    for (let key in workingInProgressFiber.props) {
      if (key !== "children") {
        workingInProgressFiber.stateNode[key] =
          workingInProgressFiber.props[key];
      }
    }
  } //在beginWork不会挂载
  //创建子fiber
  let previousFiber;
  // children是一个虚拟dom的数组

  if (Array.isArray(workingInProgressFiber.props.children)) {
    workingInProgressFiber.props.children.forEach((child, index) => {
      let childFiber = {
        type: child.type,
        props: child.props,
        return: workingInProgressFiber,
        effectTag: PLACEMENT, //这个fiber对应的dom节点需要插入到页面中的父dom中去
        nextEffect: null, //下一个有副作用的节点
      };
      if (index == 0) {
        workingInProgressFiber.child = childFiber;
      } else {
        previousFiber.sibling == childFiber;
      }
      previousFiber = childFiber;
    });
  }
}
function completeUnitOfWork(workingInProgressFiber) {
  console.log("completeUnitOfWork", workingInProgressFiber.props.id);
  //构建副作用练effectList 只有那些有副作用的节点
  let returnFiber = workingInProgressFiber.return; // A1节点
  if (returnFiber) {
    //把当前fiber的有副作用子链表挂载到父亲身上
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = workingInProgressFiber.firstEffect;
    }
    if (workingInProgressFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber.firstEffect;
      }
      returnFiber.lastEffect = workingInProgressFiber.lastEffect;
    }
    //再把自己挂到后面
    if (workingInProgressFiber.effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber;
      } else {
        returnFiber.firstEffect = workingInProgressFiber;
      }
      returnFiber.lastEffect = workingInProgressFiber;
    }
  }
}
requestIdleCallback(workLoop);
