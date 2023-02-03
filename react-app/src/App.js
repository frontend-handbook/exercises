import { useState } from "react";
import "./App.css";

const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), Math.floor(Math.random() * 100));
  });

// 请实现本地的add方法，调用 addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  // 你的实现
  return new Promise((res) => {
    let sum = 0;
    function fn(ind) {
      if (ind == inputs.length) {
        res(sum);
        return;
      }
      addRemote(sum, inputs[ind]).then((t) => {
        sum = t;
        if (ind < inputs.length) {
          fn(ind + 1);
        }
      });
    }
    fn(0);
  });
}
// 测试用例
add(5, 6).then((result) => {
  console.log(result); // 11
});
add(1, 4, 3, 3, 5).then((result) => {
  console.log(result); // 16
});
add(2, 3, 3, 3, 4, 1, 3, 3, 5).then((result) => {
  console.log(result); // 27
});

function App() {
  const [values, setValues] = useState("");
  const [res, setRes] = useState(0);
  const handleClick = async () => {
    const nums = values.split(",").map((d) => Number(d));
    const res = await add(...nums);
    console.log(res);
    setRes(res);
  };
  const handleInput = (e) => {
    const v = e.target.value;
    setValues(v);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          请实现 App.js 中 add 方法，当用户在输入框中输入多个数字(逗号隔开)时，
        </div>
        <div>点击相加按钮能显示最终结果</div>
      </header>
      <section className="App-content">
        <input
          onInput={handleInput}
          type="text"
          placeholder="请输入要相加的数字（如1,3,4,5,6）"
        />
        <button onClick={handleClick}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：<span>{res}</span>
        </p>
      </section>
    </div>
  );
}

export default App;
