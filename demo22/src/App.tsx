import React, { useState, lazy, Suspense, } from 'react'
// import '@/app.css'
import '@/app.less'
import Class from '@/components/Class'
import smallImg from '@/assets/imgs/5kb.png';
import bigImg from '@/assets/imgs/22kb.png';
import Demo1 from '@/components/Demo1';
import Demo2 from '@/components/Demo2';

// prefetch
const PreFetchDemo = lazy(() => import(
  /* webpackChunkName: "PreFetchDemo" */
  /*webpackPrefetch: true*/
  '@/components/PreFetchDemo'
))
// preload
const PreloadDemo = lazy(() => import(
  /* webpackChunkName: "PreloadDemo" */
  /*webpackPreload: true*/
  '@/components/PreloadDemo'
 ))

const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源

function App() {
  // 热更新
  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }

  // 懒加载
  const [ show, setShow ] = useState(false)
  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    import('./app.css')
    setShow(true)
  };

  return (
    <>
      {/* 懒加载 */}
      <h2 onClick={onClick}>展示</h2>
      {/* show 为 true 时加载 LazyDemo 组件 */}
      {show && 
        <>
          <Suspense fallback={null}><PreloadDemo /></Suspense>
          <Suspense fallback={null}><PreFetchDemo /></Suspense>
          <Suspense fallback={null}><LazyDemo /></Suspense>
        </>
      }

      {/* tree shaking */}
      <Demo1/>

      {/* react 热更新 */}
      <p>受控组件 {count}</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />

      {/* 引入字体 */}
      <div className="hello">fonts test</div>

      {/* 组件内引用图片 */}
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />

      {/* css内引入图片 */}
      <div className='smallImg'></div> {/* 小图片背景容器 */}
      <div className='bigImg'></div> {/* 大图片背景容器 */}

      {/* 引入css, less */}
      <h2>webpack5-react-ts</h2>
      <Class />
    </>
  )
}
export default App