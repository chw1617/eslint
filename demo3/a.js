const http = require('http')
const fs = require('fs')

const serve = http.createServer((req,res)=>{
    res.writeHead(200)
    res.end()
})

serve.listen(3000,()=>{})

// 1.listen \ use
// 2.context 上下文 proxy 代理
// 3.中间件机制，利用洋葱模型，函数组合的方式使用
var obj = {
    info:{
        name:"chw"
    },
    get name(){ // getter 将对象的属性绑定到查询该属性时候调用的函数
        return this.info.name
    },
    getname(){
        return this.info.name
    }
}

const context = {
    get url(){
        return this.request.url
    },
    get body(){
        return this.response.body
    }
}
const request = {
    get url(){
        return this.request.url
    },
    get body(){
        return this.response.body
    }
}
const respose = {
    get url(){
        return this.request.url
    },
    get body(){
        return this.response.body
    }
}

class Koa{
    constructor(){
        // this.callback = null
        this.middleware = []
    }
    listen(...arg){ //收集参数
        const serve = http.createServer((req,res)=>{
             //创建上下文
             let ctx = this.createContext(req,res)
             //监听回调执行
            // this.callback(req,res)
            const fn =  this.compose(this.middleware)
            await fn(ctx)
            //响应
            res.send(ctx.body)
        })
        serve.listen(...arg)
    }
    use(callback){
        //收集函数
        // this.callback = callback //保存业务代码
        this.middleware.push(callback)
    }
    createContext(req,res){
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.req = ctx.resopne.res = res
    }
    //执行组合的中间函数
    compose(middleware){
        return function(ctx){
            function dispatch(i){
                let fn = middleware[i]
                if(!fn){
                    return Promise.resolve
                }
                return Promise.resolve(
                    fn(ctx,function next(){
                        //接着执行
                        return dispatch(i)
                    })
                )
            }
            dispatch(i)
        }
    }
}


// 
// let app = new Koa()
// app.use((req,res)=>{})
// app.listen(8000)


