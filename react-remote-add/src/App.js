import "./App.css";
import { useState } from 'react';

const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 100);
  });

// 请实现本地的add方法，调用 addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  // 你的实现
  let promises = inputs.map(input => addRemote(0, input));
  let results = await Promise.all(promises);
  return results.reduce((a, b) => a + b, 0);
}

/**
 * 要求：
 * 1. 所有的加法都必须使用addRemote
 * 2. 输入错误时，input边框需要变红，Button disable
 * 3. 计算过程 Button与input disable, Button 展示计算中...
 * 3. 计算时间越短越好
 */
function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sum, setSum] = useState(0)
  const [calcTime, setCalcTime] = useState(0);

  //数字相加事件
  const handleAdd = async () => {
    const numbers = input.split(",").map(Number);
    setLoading(true);
    const start = Date.now();
    const sum = await add(...numbers);
    const time = Date.now() - start;
    setSum(sum)
    setCalcTime(time)
    setLoading(false);
  };
  // 检查input输入
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    const numbers = inputValue.split(",").map(Number);
    numbers.some(isNaN) ? setError(true) : setError(false);
  };
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
        <input type="text" placeholder="请输入要相加的数字（如1,4,3,3,5）" value={input}
          onChange={handleInputChange}
          className={error ? "error" : ""} />
        <button onClick={handleAdd} disabled={loading || error}>{loading ? "计算中..." : "相加"}</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：
          {sum}， 计算时间是：{calcTime} ms
        </p>
      </section>
    </div>
  );
}

export default App;
