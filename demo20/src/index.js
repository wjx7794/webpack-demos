import _ from 'lodash';
import printMe from './print.js';
// import Icon from './icon.svg';

// import exampleText from './example.txt';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  // const myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);

  // element.style.background = `url(${Icon})`;

  //console.log('exampleText>>>', exampleText);
  //element.textContent = exampleText; // 'Hello world'

  element.appendChild(btn);

  //element.style.background = `url(${Icon})`;

  return element;
}

document.body.appendChild(component());
