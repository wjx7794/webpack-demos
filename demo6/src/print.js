export default function getButton() {
  const button = document.createElement('button');
  button.innerHTML = 'Add Script';

  button.addEventListener('click', async (e) => {
    // const res = await import(/* webpackPrefetch: true */ './script.js');
    const res = await import(/* webpackPreload: true */ './script.js');
    console.log(res.default); // { name: 'Jack' }
  });

  document.body.appendChild(button);
}
