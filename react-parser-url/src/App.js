import './App.css';
import { useState, useEffect } from 'react';

const defaultParserResult = {
  protocol: '',
  hostname: '',
  port: '',
  pathname: '',
  params: {},
  hash: ''
}

const parserUrl = (url) => {
  // 你的实现
  try {
    // 检查URL是否包含协议名
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = 'http://' + url;
    }
    const urlObj = new URL(url);
    const params = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    let port = urlObj.port;
    if (!port) {
      port = urlObj.protocol === 'https:' ? '443' : urlObj.protocol === 'http:' ? '80' : '';
    }
    return {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: port,
      pathname: urlObj.pathname,
      params: params,
      hash: urlObj.hash
    };
  } catch (error) {
    console.error(error);
    return defaultParserResult;
  }
};

// 测试用例
parserUrl('https://baidu.com:443/s?wd=hello');
// 输出结果：{ protocol: 'https:', hostname: 'baidu.com', port: '443', pathname: '/s', params: { wd: 'hello' },  hash: '' }


function App() {
  const [result, setResult] = useState(defaultParserResult);
  const [url, setUrl] = useState('');
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        console.log('这里 处理 Enter 事件');
        setResult(parserUrl(url));
      }
    }
    document.addEventListener('keydown', onKeyDown, false);
    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    }
  }, [url]);
  const parserBtn = () => {
    setResult(parserUrl(url))
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>请实现 App.js 中 parserUrl 方法，当用户在输入框中输入url时，</div>
        <div>点击解析按钮（或者按 enter 快捷键）能够识别出 url 各个组成部分</div>
        <div>并将结果渲染在页面上（tips: 请尽可能保证 parserUrl 的健壮性和完备性）</div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入 url 字符串" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button id="J-parserBtn" onClick={parserBtn}>解析</button>
      </section>
      <section className="App-result">
        <h2>解析结果</h2>

        <pre>{JSON.stringify(result, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
