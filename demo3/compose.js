// //组合函数
// function compose(...[first,...other]){
//    console.log(first,other)
//    return (...arg)=>{
//    let res = first(...arg)
//     other.forEach(fn=>{
//         console.log('res',res)
//         res = fn(res)
//     })
//     return res
//    }
// }

// const f1 = (a,b)=> a+b
// const f2 = (b)=>  b * b
// // const f2 = (b)=> { //如果有异步就会出现问题
// //     setTimeout(() => {
// //        return b * b
// //     }, 1000);
// // }
// const f3 = (c) => c + 1

// const fn = compose(f1,f2,f3) //普通函数组合是执行完一个再执行另外一个，如果有异步就会出现问题
// console.log(fn(1,2))


//洋葱模式是执行函数的一半就执行另外一个 
function compose1(middleware){
   return function(){
       function dispatch(i){
           let fn = middleware[i]
           if(!fn){
               return Promise.resolve()
           }
           return Promise.resolve(
               fn(
               function next(){ 
                return dispatch(i+1)} //定义一个函数传递下去，回调吧
               )
           )
       }
      return dispatch(0)
   }
}


function f1(next){
    setTimeout(() => {
        console.log('f1')
    }, 1000);
    next()
}

function f2(next){
    console.log('f2')
}

function f3(next){
    setTimeout(() => {
        console.log('f3')
    }, 1000);
}

// let res = compose1([f1,f2,f3])
// res()


//函数柯力化


//十进制转换成二进制
function decToBin(num){
    let stack = []
    let bin
    let res = ''
    while(num>0){
        bin = num % 2
        stack.push(bin)
        num = Math.floor(num / 2)
    }
    while(stack.length > 0){
        res += stack.pop()
    }
    console.log('res',res)
    return res
}


decToBin(10)
decToBin(256)
decToBin(2)
decToBin(8)