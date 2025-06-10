import printMe from './print.js';
import { cube } from './math.js';
import './styles.css';

function component() {
  const element = document.createElement('pre');
  const btn = document.createElement('button');

  element.innerHTML = ['你好 webpack！', '5 的立方等于 ' + cube(5)].join(
    '\n\n'
  );

  return element;
}

document.body.appendChild(component());
