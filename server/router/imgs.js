const Router = require('koa-router');
const fs = require('fs')
const imgs = new Router();
const bodyparser = require('koa-bodyparser'); 
const koaBody = require('koa-body')
const path = require('path')

imgs.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据
imgs.use(koaBody({
    //支持文件格式
    multipart: true,
    formidable:{
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));

imgs.post('/upload',async(ctx) => {
    const file = ctx.request.files.file;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../assets/imgs/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    console.log(upStream)
    // 可读流通过管道写入可写流
    let url = 'http://localhost:3000/'+'imgs/'+`${file.name}`;
    reader.pipe(upStream);
    //return ctx.body = "上传成功！";
    let restul = {
        msg:'上传成功！',
        url
    }
    ctx.body =restul
})
module.exports = imgs