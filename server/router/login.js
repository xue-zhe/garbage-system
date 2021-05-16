const Router = require('koa-router');
const login = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');
login.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据

login.post('/', async(ctx)=>{      //登录
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let mypassword = ctx.request.body.password; //获取前端传来的密码
    //判断数据库里到底有没有这个账号，如果有就验证密码，如果没有就注册一条记录
    let myradio = ctx.request.body.radio
    if(myradio == 1){
        let serachsql = `select * from t_superadmin where account = '${myaccount}'`;
        let result = await new Promise((resolve,reject)=>{
         return  db.query(serachsql,(err,data)=>{
                if(err) throw err;
                resolve(data)
            })
            
        })
        if(result.length>0){
            if(result[0].password == mypassword){
                ctx.body = {
                    msg:'登录成功',
                    status:'205',
                    token: myarr[0].token,
                    account: myarr[0].account
                }
             }   
           ctx.body = result
        }else{
            ctx.body={
                msg:'身份错误',
                status:'206',
            }
        } 
    }else{
        let serachsql = `select * from t_users where account = '${myaccount}'`;
        let myarr = await new Promise((resolve,reject)=>{
            return db.query(serachsql,(err,data)=>{
                if(err) throw err;
                resolve(data);
            })
        })
        //数组长度是否大于0
        if(myarr.length > 0){ 

            //证明有这个账号，验证密码
            if(myarr[0].password == mypassword){
                ctx.body = '账号密码都正确';
                ctx.body = {
                    msg:'登录成功',
                    status:'200',
                    token: myarr[0].token,
                    account: myarr[0].account
                }
            }else{
                ctx.body = '账号或密码错误';
            }
        }else{
            ctx.body = {
                status:'201',
                msg:'该账号不存在，请注册!'
            }
        }  
    }
})

login.post('/forget', async(ctx)=>{     //忘记密码
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let mynewpassword = ctx.request.body.newpassword;  //获取前端传来的新密码
    let mypassword = ctx.request.body.password; //获取前端传来的新密码
    //判断数据库里到底有没有这个账号，如果有就验证密码，如果没有就注册一条记录
    let serachsql = `select * from t_users where account = '${myaccount}'`;
    let updateaql = `update t_users set password = '${mynewpassword}' where account = '${myaccount}'`;
    let myarr = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    //数组长度是否大于0
    if(myarr.length > 0){ 
        //证明有这个账号，验证密码
        if(mynewpassword == mypassword){
            let result = await new Promise((resolve,reject)=>{
                return db.query(updateaql,(err,data)=>{
                    if(err) throw err;
                    let obj ={
                        msg:'修改成功',  
                        status:'200',
                        data
                    }
                    resolve(obj);
                })
            })
            ctx.body = result
        }else{
            console.log(1)
            ctx.body = '密码不一致，请重新输入';
        }
    }else{
        console.log(2)
        ctx.body = '该账号不存在，请前往注册'
    }  
})

login.post('/amends', async(ctx)=>{     //修改密码密码 
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let myoldpassword = ctx.request.body.oldpassword  //获取前端传来的旧密码
    let mynewpassword = ctx.request.body.newpassword;  //获取前端传来的新密码
    let mypassword = ctx.request.body.password; //获取前端传来的新密码
    //判断数据库里到底有没有这个账号，如果有就验证密码，如果没有就注册一条记录
    let serachsql = `select * from t_users where account = '${myaccount}'and password = '${myoldpassword}'`;
    let updateaql = `update t_users set password = '${mynewpassword}' where account = '${myaccount}'`;
    let myarr = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    //数组长度是否大于0
    if(myarr.length > 0){ 
        //证明有这个账号，验证密码
        if(mynewpassword == mypassword){
            let result = await new Promise((resolve,reject)=>{
                return db.query(updateaql,(err,data)=>{
                    if(err) throw err;
                    let obj ={
                        msg:'修改成功',
                        status:'200',
                        data
                    }
                    resolve(obj);
                })
            })
            ctx.body = result
        }else{
            ctx.body = '密码不一致，请重新输入';
        }
    }else{
        ctx.body = '密码错误!'
    }  
})


module.exports = login