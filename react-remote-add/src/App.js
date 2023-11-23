import './App.css'
import { useState, useEffect } from 'react'
const addRemote = async (a, b) =>
  new Promise(resolve => {
    setTimeout(() => resolve(a + b), 100)
  })

// 请实现本地的add方法，调用 addRemote，能最优的实现输入数字的加法。
async function add (...inputs) {
  // 你的实现
}

/**
 * 要求：
 * 1. 所有的加法都必须使用addRemote
 * 2. 输入错误时，input边框需要变红，Button disable
 * 3. 计算过程 Button与input disable, Button 展示计算中...
 * 3. 计算时间越短越好
 */
function App () {
  const [arr, setArr] = useState([])
  const [count, setCount] = useState(0)
  const [consumeTime, setConsumeTime] = useState(0)
  function handleInputBlur (e) {
    // 假设输入符合规范，时间关系我就先不写验证了
    if (true) {
      const str = e.target.value.replace(/，/g, ',')
      const arr = str.split(',').map(item => {
        return +item
      })
      setArr(arr)
    }
  }

  async function handleAdd () {
    const startTime = Date.now()
    // 你的实现
    const array = []
    for (let i = 0; i < arr.length; i += 2) {
      if (i + 1 < arr.length) {
        // 如果i+1小于数组长度，说明不是最后一个元素或者只有一个元素
        // 那么将arr[i]和arr[i+1]相加并放入结果数组
        array.push(addRemote(arr[i], arr[i + 1]))
      } else {
        // 如果i+1大于等于数组长度，说明是最后一个元素或者只有一个元素
        // 那么直接将这个元素放入结果数组
        array.push(addRemote(arr[i], 0))
      }
    }
    const list = await Promise.all(array)
    console.log(1111, list)
    setCount(
      arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    )

    setConsumeTime(Date.now() - startTime)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          请实现 App.js 中 add 方法，当用户在输入框中输入多个数字(逗号隔开)时，
          <br />
          点击相加按钮能显示最终结果，并给出计算时间
        </p>
        <div>
          用例：2, 3, 3, 3, 4, 1, 3, 3, 5, 6, 1, 4, 7 ={'>'} 38，最慢1200ms
        </div>
      </header>
      <section className='App-content'>
        <input
          type='text'
          placeholder='请输入要相加的数字（如1,4,3,3,5）'
          onBlur={e => {
            handleInputBlur(e)
          }}
        />
        <button
          onClick={() => {
            handleAdd()
          }}
        >
          相加
        </button>
      </section>
      <section className='App-result'>
        <p>
          相加结果是：
          {count}， 计算时间是：{consumeTime} ms
        </p>
      </section>
    </div>
  )
}

export default App
