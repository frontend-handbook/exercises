import "./App.css";

const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 100);
  });

// 请实现本地的add方法，调用 addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  // 你的实现
}

/**
 * 基本：正确得到结果
 * 加分：1. ui交互合理，  2. 计算时间越短越好
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          请实现 App.js 中 add 方法，当用户在输入框中输入多个数字(逗号隔开)时，
          <br />
          点击相加按钮能显示最终结果，并给出计算时间
        </p>
        <div>用例：1,4,3,3,5 ={">"} 16</div>
        <div>用例：2, 3, 3, 3, 4, 1, 3, 3, 5, 6, 1, 4, 7 ={">"} 38</div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入要相加的数字（如1,4,3,3,5）" />
        <button>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：
          {"{你的计算结果}"}， 计算时间是：{"{你的计算时间}"} ms
        </p>
      </section>
    </div>
  );
}

export default App;
