import './App.css';
import { useState, useEffect, useRef } from 'react';

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
  if(!url){
    defaultParserResult.protocol= '';
    defaultParserResult.hostname= '';
    defaultParserResult.port= '';
    defaultParserResult.pathname= '';
    defaultParserResult.search= '';
    defaultParserResult.hash= '';
    defaultParserResult.params={}
    return 
  };
  url = decodeURIComponent(url)
  // url = new URL(url);
  // defaultParserResult.protocol= url.protocol;
  // defaultParserResult.hostname= url.hostname;
  // defaultParserResult.port= url.port;
  // defaultParserResult.pathname= url.pathname;
  // defaultParserResult.search= decodeURIComponent(url.search);
  // defaultParserResult.hash= url.hash;
  // defaultParserResult.params= Object.fromEntries(decodeURIComponent(url?.search)?.substr(1)?.split('&').map(item => {
  //   let [_, key, value] = item.match(/(.*)=(.*)/);
  //   return [key,value]
  // }) || []);
  // 或者
  const [protocol, host, ...pathname ] = url.split('/').filter(item => item)
  defaultParserResult.protocol = protocol || '';
  defaultParserResult.host = host || '';
  defaultParserResult.hostname= host?.split(':')[0] || '';
  defaultParserResult.port= host?.split(':')?.[1] || '';
  defaultParserResult.pathname= '/' + pathname.join('/').split('?')[0]?.split('#')[0] || '/';
  defaultParserResult.hash=url.match(/#(.*)$/)?.[1] ? '#' + url.match(/#(.*)$/)?.[1] : '';
  defaultParserResult.search = !defaultParserResult.hash && pathname.join('/').split('?')[1] ? `?${pathname.join('/').split('?')[1]}` : '';
  defaultParserResult.params= !defaultParserResult.hash ? Object.fromEntries(decodeURIComponent(defaultParserResult?.search)?.substr(1)?.split('&').map(item => {
    let [_, key, value] = item.match(/(.*)=(.*)/) || [];
    return [key,value]
  })): {};
  return defaultParserResult;
};

// 测试用例
parserUrl('https://baidu.com:443/s?wd=hello');
// 输出结果：{ protocol: 'https:', hostname: 'baidu.com', port: '443', pathname: '/s', params: { wd: 'hello' };hash: '' }


function App() {
  const [result, setResult] = useState(defaultParserResult);
  const inputRef = useRef();
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        console.log('这里 处理 Enter 事件');
        parserUrl(inputRef.current.value);
        setResult(defaultParserResult);
      }
    }
    document.addEventListener('keydown', onKeyDown, false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现 App.js 中 parserUrl 方法，当用户在输入框中输入url时，</div>
        <div>点击解析按钮（或者按 enter 快捷键）能够识别出 url 各个组成部分</div>
        <div>并将结果渲染在页面上（tips: 请尽可能保证 parserUrl 的健壮性和完备性）</div>
      </header>
      <section className="App-content">
        <input ref={inputRef} type="text" placeholder="请输入 url 字符串" />
        <button id="J-parserBtn" onClick={() => { setResult({...parserUrl(inputRef.current.value)}) }}>解析</button>
      </section>
      <section className="App-result">
        <h2>解析结果</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
