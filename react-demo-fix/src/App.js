import React, { useRef, useState, useEffect, useCallback } from 'react';
import { remoteIncrease } from './utils';
import './App.css';
/**
 * 小明最近在学习 React，他用 React 写了一个异步相加计数器 App Demo：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 * 由于小明是新手，在实现过程中有一些 bug，请帮忙修改以让程序正常运行。
 */

function App() {
  const [count, setCount] = useState(0);
  const loading = useRef(false);

  const increase = useCallback(async () => {
    if (loading.current) {
      return;
    }
    loading.current = true;
    const data = await remoteIncrease(count);
    setCount(data);
    loading.current = false;
  }, [count]);

  const handleClick = (num) => {
    if (num === 1) {
      increase();
    } else if (num === 2) {
      increase();
      increase();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>请按照题目要求，修正以下程序</div>
      </header>
      <section className="App-content">
        <button disabled={loading.current} onClick={() => { handleClick(1); }}>+1</button>
        <button disabled={loading.current} onClick={() => { handleClick(2); }}>+2</button>
        <p>数值：{count}</p>
      </section>
    </div>
  );
}

export default App;
