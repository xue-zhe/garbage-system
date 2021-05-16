const Router = require('koa-router');
const bodyparser = require('koa-bodyparser'); 
const https = require('https')
const cheerio = require('cheerio');
const knowledge = new Router();

knowledge.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据

knowledge.post('/', async(ctx)=>{
    let myindex = ctx.request.body.index;  //获取前端传来搜索的值
    let result = await new Promise((resolve,reject)=>{
        return https.get('https://lajifenleiapp.com/sk/'+`${myindex}`, function (res) {
           // console.log('Got response: ' + res.statusCode);
            res.on('data', function (chunk){   
            //console.log('BODY: ' + chunk);
            const $ = cheerio.load(chunk)
            /**
             * 相关搜索
             **/
            let relateContent = [];//相关搜索数组
            let relateTitle = $("body > div.container > div:nth-child(7) > div > span").text()    //相关搜索标题
            $("body > div.container > div:nth-child(7) > div > a").each(function(i, elem) {  //相关搜索内容
                relateContent[i] = $(this).text();
            });
            /**
             * 属性标题
             * **/
            let natureTitle = $("body > div.container > div:nth-child(10) > div > div:nth-child(1) > h1").text()
            /**
             *垃圾图片 
            **/
            let imgs = $("body > div.container > div:nth-child(10) > div > div.visible-xs > img").attr('src');
            /**
             * 垃圾分类知识
             **/
            let knowlegeTitle = []; //垃圾分类知识标题数组
            $("body > div.container > div > div > div > div > h3").each(function(i, elem) {  //标题
                knowlegeTitle[i] = $(this).text();
            });
            /**
             * 垃圾的定义 
             **/
            let definition = $("body > div.container > div:nth-child(12) > div > div > div:nth-child(2)").text()
            /** 
             *垃圾内容 
            **/
            let content =  $("body > div.container > div:nth-child(13) > div > div > div:nth-child(2)").text()
            /**
             * 垃圾分类的条件
             **/
            let condition = [];
            $("body > div.container > div:nth-child(14) > div > div:nth-child(2) > div > ul > li").each(function(i, elem) {  
                condition[i] = $(this).text();
            }); 
            /**
             * 近期查询
             **/  
            let recentTitle =  $("body > div.container > div:nth-child(16) > div > span").text() //近期查询标题
            let recentContent = []; //近期查询的内容
            $("body > div.container > div > div > a").each(function(i, elem) {  
                recentContent[i] = $(this).text();
            }); 
            let obj = {
                msg: '查找成功！',
                status:'200',
                relateTitle,  
                relateContent,
                natureTitle,
                imgs,
                knowlegeTitle,
                definition,
                content,
                condition,
                recentTitle,
                recentContent
            }
            resolve(obj)    
            });
        }).on('error', function (e) {
            console.log('Got error: ' + e.message);
            });  
    })
    ctx.body = result
})

module.exports = knowledge 