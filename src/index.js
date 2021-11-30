console.log(1233333);
console.log('123');

import './assets/images/haoqianggf.svg';
import './assets/images/icon_role.png';
import './assets/styles/index.scss';
import './assets/styles/style.css';
import './echarts';


async function getComponent() {
  // Lodash, now imported by this script
  try {
    const { default: _ } = await import("lodash");
    const element = document.createElement("div");

    element.innerHTML = _.join(["Hello", "webpack"], " ");
    return element;
  } catch (error) {
    return "An error occurred while loading the component";
  }
}

const button = document.createElement("button");

button.innerHTML = "Click me ";

button.onclick = () => {
  getComponent().then((component) => {
    document.body.appendChild(component);
  });
};

document.body.appendChild(button);