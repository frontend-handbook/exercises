import "./App.css";
import { useState } from 'react';
const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 100);
  });

// 请实现本地的add方法，调用 addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  let result = {}
  let sum = 0
  // 你的实现
  let startTime = performance.now(); // 记录开始时间  
  for (let i = 0; i < inputs.length; i += 2) { // 每次只取两个值进行相加，适用于addRemote一次只接受两个值的要求  
    if (i + 1 < inputs.length) { // 检查是否还有下一个值可以进行相加  
        const a = inputs[i];  
        const b = inputs[i + 1];  
        const res = await addRemote(a, b);   
        sum += res; 
    } else {
        break;  
    }  
}  
  const endTime = performance.now(); // 记录结束时间  
  const duration = endTime - startTime; // 计算相加的时间  
  result.sum = sum;  
  result.time = duration.toFixed(2); 

  return result
}

/**
 * 要求：
 * 1. 所有的加法都必须使用addRemote
 * 2. 输入错误时，input边框需要变红，Button disable
 * 3. 计算过程 Button与input disable, Button 展示计算中...
 * 3. 计算时间越短越好
 */
function App() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState({sum: 0, time: 0});
  const clickSum = async () =>{
    setResult( await add(...value.split(',').map(item => Number(item.trim?.()))))
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          请实现 App.js 中 add 方法，当用户在输入框中输入多个数字(逗号隔开)时，
          <br />
          点击相加按钮能显示最终结果，并给出计算时间
        </p>
        <div>
          用例：2, 3, 3, 3, 4, 1, 3, 3, 5, 6, 1, 4, 7 ={">"} 38，最慢1200ms
        </div>
      </header>
      <section className="App-content">
        <input onChange={(e) => { setValue(e.target.value) }} value={value} className={value.split(',').every(isNaN) ? 'input inputErro' : 'input'} type="text" placeholder="请输入要相加的数字（如1,4,3,3,5）" />
        <button onClick={clickSum} disabled={value.split(',').every(isNaN)}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：
          {result.sum}， 计算时间是：{result.time} ms
        </p>
      </section>
    </div>
  );
}

export default App;
