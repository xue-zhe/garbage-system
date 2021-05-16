//构造函数
const Koa = require('koa2');
//声明一个实例
const app = new Koa(); 
const port = 3000; //端口号
const router = require('./router/index');
const cors = require('koa2-cors')
const static = require('koa-static')
const path = require('path')


app.use(static(path.join('assets')));   //文件的路径
app.use(cors())
app.use(router.routes() , router.allowedMethods())


//上传文件
//调用中间件
app.use( async (ctx)=>{
    ctx.response.body = "Hello,koa";
})

//ip+端口
app.listen(port, ()=>{
   console.log(`Serve running at http://localhost:${port}`)
})