const Router = require('koa-router');
const garbage = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');


garbage.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据

garbage.post('/amend', async(ctx)=>{   //根据投放垃圾信息
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let myimgs = ctx.request.body.imgs;  //获取前端传来的垃圾图片
    let mytype = ctx.request.body.type;  //获取前端传来的垃圾类型
    let mygarbagename = ctx.request.body.garbagename;  //获取前端传来的垃圾类型
    let insertsql = `insert into t_garbages (account, imgs, type, garbagename)values ('${myaccount}', '${myimgs}', '${mytype}', '${mygarbagename}')`; 
    let result = await new Promise((resolve,reject)=>{
        return db.query(insertsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '投放成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})



//根据投放情况来对积分进行加减

//获取已经有的积分

garbage.post('/refer/integral', async(ctx)=>{   //根据账号来查看相关的信息（个人的） 
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    //判断数据库里到底有没有这个账号
    let serachsql = `select * from t_garbagemanagements where account = '${myaccount}'`;
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '获取成功！',
                status:'200',
                data,
            }
            resolve(obj)
        })
    })
    ctx.body = result
})

//查看积分大于50的账号，和奖励情况
garbage.get('/integral/award', async(ctx)=>{   //根据账号来查看相关的信息（个人的） 
    //判断数据库里到底有没有这个账号
    let serachsql = `select * from t_garbagemanagements where integral>49`;
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '获取成功！',
                status:'200',
                data,
            }
            resolve(obj)
        })
    })
    ctx.body = result
})

//查看积分小于50分的账号，和处罚情况
garbage.get('/integral/punish', async(ctx)=>{   //根据账号来查看相关的信息（个人的） 
    //判断数据库里到底有没有这个账号
    let serachsql = `select * from t_garbagemanagements where integral<-49`;
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '获取成功！',
                status:'200',
                data,
            }
            resolve(obj)
        })
    })
    ctx.body = result
})
//修改积分
garbage.post('/amend/integral', async(ctx)=>{   //根据投放垃圾信息
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let myintegral = ctx.request.body.integral; //获取前端传来的积分
    let insertsql = `update t_garbagemanagements set integral = '${myintegral}' where account = '${myaccount}'`;
    let result = await new Promise((resolve,reject)=>{
        return db.query(insertsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '获取成功！',
                status:'200',
                data,
            }
            resolve(obj)
        })
    })
    ctx.body = result
})


module.exports = garbage 