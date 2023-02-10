
// 请勿修改此方法 
export const remoteIncrease = async (a) => new Promise(resolve => {
  setTimeout(() => resolve(a + 1), Math.floor(Math.random() * 1000));
});