import { useState } from "react";
import "./App.css";

const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), Math.floor(Math.random() * 100));
  });

// 请实现本地的add方法，调用 addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  // 基于递归实现，每次处理一个
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

// 基于promise.all, 两个一组、递归实现
function add_PromiseAll(...inputs) {
  return new Promise((res) => {
    const temp = [];
    while (inputs.length) {
      if (inputs.length === 1) {
        temp.push(addRemote(inputs.pop(), 0));
      } else if (inputs.length > 1) {
        temp.push(addRemote(inputs.pop(), inputs.pop()));
      }
    }
    Promise.all(temp).then((inputs) => {
      if (inputs.length > 1) {
        res(add(...inputs));
      } else {
        res(inputs[0]);
      }
    });
  });
}

// 两个一组，使用reduce实现
function add_reduce(...inputs) {
  return new Promise(async (res) => {
    const temp = [];
    while (inputs.length) {
      if (inputs.length === 1) {
        temp.push(addRemote(inputs.pop(), 0));
      } else if (inputs.length > 1) {
        temp.push(addRemote(inputs.pop(), inputs.pop()));
      }
    }

    const ans = temp.reduce(async (a, b) => {
      const sa = await a;
      const sb = await b;
      return addRemote(sa, sb);
    });
    res(ans);
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
  const nums = values.split(",").map((d) => Number(d));

  const handleClick_Base = async () => {
    const res = await add(...nums);
    setRes(res);
  };
  const handleClick_PromiseAll = async () => {
    const res = await add_PromiseAll(...nums);
    setRes(res);
  };
  const handleClick_Reduce = async () => {
    const res = await add_reduce(...nums);
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
        {/* 递归实现 */}
        <button onClick={handleClick_Base}>
          相加(1
        </button>
        {/* promise.all实现 */}
        <button onClick={handleClick_PromiseAll}>
          相加(2
        </button>
        {/* reduce 实现 */}
        <button onClick={handleClick_Reduce}>
          相加(3
        </button>
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
