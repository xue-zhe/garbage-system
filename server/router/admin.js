const Router = require('koa-router');
const admin = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');
const jwt = require('jsonwebtoken');


admin.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据


//用户信息
admin.post('/refer/person', async(ctx)=>{   //查看用户信息
    let mycurPage = ctx.request.body.curPage
    let mypageSize = ctx.request.body.pageSize
    let selectsql = `select * from t_studentinformations limit ${(mycurPage-1)*mypageSize},${mypageSize};`;
    let totalsql = `select count(*) as total from t_studentinformations`
    let result = await new Promise((resolve,reject)=>{
        return db.query(selectsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功查询！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body={
        result,
        total
    }
})

admin.post('/dimrefer/person', async(ctx)=>{   //模糊查询用户信息
    let myindex = ctx.request.body.index;  //获取前端传来的值
    let mycurPage = ctx.request.body.curPage
    let mypageSize = ctx.request.body.pageSize
    let serachsql = `select * from t_studentinformations where name  like '%${myindex}%' or studentno  like '%${myindex}%' or phone like '%${myindex}%' limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_studentinformations  where name like '%${myindex}%' or studentno like '%${myindex}%' or phone like '%${myindex}%' `;
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功查询！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body={
        result,
        total
    }
})
admin.post('/amend', async(ctx)=>{    //修改个人信息
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let myname = ctx.request.body.name; //获取前端传来的用户姓名
    let mystudentno = ctx.request.body.studentno; //获取前端传来的学号
    let mycollege = ctx.request.body.college; //获取前端传来的学院
    let mymajor = ctx.request.body.major; //获取前端传来的专业
    let mydormitoryno = ctx.request.body.dormitoryno; //获取前端传来的宿舍号

    let updatesql = `update t_studentinformations set 
    name='${myname}', 
    studentno='${mystudentno}', 
    college='${mycollege}', 
    major='${mymajor}',
    dormitoryno='${mydormitoryno}'
    where phone = '${myaccount}'`;

    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功修改！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body= result
})

admin.post('/add', async(ctx)=>{    //添加用户
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let mypassword = ctx.request.body.password;  //获取前端传来的账号
    let myname = ctx.request.body.name; //获取前端传来的用户姓名
    let mystudentno = ctx.request.body.studentno; //获取前端传来的学号
    let mycollege = ctx.request.body.college; //获取前端传来的学院
    let mymajor = ctx.request.body.major; //获取前端传来的专业
    let mydormitoryno = ctx.request.body.dormitoryno; //获取前端传来的宿舍号

    let serachsql = `select * from t_users where account = '${myaccount}'`;
    /**
     * 检查是存在这个账号
     */
    let myarr = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })

    //数组长度是否大于0
    if(myarr.length>0){
        //证明有这个账号，验证密码
        ctx.body = {
            status:'200',
            msg:'该账号已存在！',
        }
    }else{
        //创建一个token
        let mytoken = jwt.sign({ myaccount: myaccount,mypassword: mypassword }, 'secret', {expiresIn:3000});
        let myintegral = 0;
        let insertsql = `insert into t_studentinformations (name,studentno, college, major, dormitoryno, phone)values 
        ('${myname}', '${mystudentno}',  '${mycollege}', '${mymajor}', '${mydormitoryno}', '${myaccount}')`;
        let insertsql1 = `insert into t_users (account, password, token )values('${myaccount}', '${mypassword}', '${mytoken}')`;
        let insertsql2 = `insert into t_garbagemanagements (account,integral)values('${myaccount}', '${myintegral}')`;
        let result = await new Promise((resolve, reject)=>{
            return db.query(insertsql, (err, data)=>{
                 if(err) throw err;
                 let obj = {
                     status:'200',
                     msg:'添加成功！',
                     data
                 }
                 resolve(obj)
               })
           })
           if(result.data.protocol41){
            await new Promise((resolve,reject)=>{
                return db.query(insertsql1,(err,data)=>{
                    if(err) throw err;
                    resolve(data);
                })
            })
            await new Promise((resolve,reject)=>{
                return db.query(insertsql2,(err,data)=>{
                    if(err) throw err;
                    resolve(data);
                })
            })
        }
        ctx.body = result;
    }
})

admin.post('/delete', async(ctx)=>{    //删除用户
    let myaccount = ctx.request.body.account;  //获取前端传来的账号 
    let deletesql = `delete from t_studentinformations where phone = '${myaccount}'`
    let deletesql1 = `delete from t_users where account = '${myaccount}'`
    let deletesql2 = `delete from t_garbagemanagements where account = '${myaccount}'`

    let myarr = await new Promise((resolve,reject)=>{
        return db.query(deletesql, (err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })

    if(myarr.protocol41){
        await new Promise((resolve,reject)=>{
            return db.query(deletesql2, (err,data)=>{
                if(err) throw err;
                resolve(data);
            })
        })
        let result = await new Promise((resolve,reject)=>{
            return db.query(deletesql1,(err,data)=>{
                if(err) throw err;
                let obj = {
                    msg: '删除用户成功！',
                    status:'200',
                    data
                }
                resolve(obj)
            })
       })
       ctx.body = result
   }
})


//垃圾的投放管理
admin.post('/refer/garbage', async(ctx)=>{   //查看垃圾投放情况
    let mycurPage = ctx.request.body.curPage;
    let mypageSize = ctx.request.body.pageSize;
    let serachsql = `select * from t_garbages limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_garbages`

    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '查询成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body=ctx.body={
        result,
        total
    }
})

admin.post('/dimrefer/garbage', async(ctx)=>{   //模糊查询垃圾情况
    let myindex = ctx.request.body.index;  //获取前端传来的值
    let mycurPage = ctx.request.body.curPage;
    let mypageSize = ctx.request.body.pageSize;
    let serachsql = `select * from t_garbages where garbagename like '%${myindex}%' or account like '%${myindex}%'  or type like '%${myindex}%' limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_garbages  where garbagename like '%${myindex}%' or type like '%${myindex}%'or account like '%${myindex}%' `
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '查询成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    console.log(total)
    ctx.body={
        result,
        total
    }
})

admin.post('/delete/garbage', async(ctx)=>{    //删除垃圾的记录
    let myid = ctx.request.body.id;  //获取前端传来的id
    console.log(myid)
    let deletesql = `delete from t_garbages where id = '${myid}'`

    let result = await new Promise((resolve,reject)=>{
        return db.query(deletesql, (err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '删除记录成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})



// 轮播图
admin.post('/refer/banner', async(ctx)=>{   //查看轮播图
    let mycurPage = ctx.request.body.curPage;
    let mypageSize = ctx.request.body.pageSize;
    let serachsql = `select * from t_banners limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_banners`
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '成功查看！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body=ctx.body={
        result,
        total
    }
})


admin.post('/add/banner', async(ctx)=>{   //添加轮播图
    let mybanner = ctx.request.body.banner;  //获取前端传来的轮播图路径
    let insertsql = `insert into t_banners (banner)values ('${mybanner}')`;
    let restult = await new Promise((resolve,reject)=>{
        return db.query(insertsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '添加成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body= restult
})

admin.post('/amend/banner', async(ctx)=>{   //修改轮播图
    let myid = ctx.request.body.id   //获取前端传来的id
    let mybanner = ctx.request.body.banner;  //获取前端传来的轮播图路径
    let updatesql = `update t_banners set banner = '${mybanner}' where id = '${myid}'`
    let retult = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '修改成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body= retult
})

admin.post('/delete/banner', async(ctx)=>{   //删除轮播图
    let myid = ctx.request.body.id   //获取前端传来的id
    console.log(myid)
    let deletesql = `delete from t_banners where id = '${myid}'`
    let result = await new Promise((resolve,reject)=>{
        return db.query(deletesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '删除成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})


//公告
admin.post('/refer/adminannouncement', async(ctx)=>{   //查看公告
    let mycurPage = ctx.request.body.curPage;
    let mypageSize = ctx.request.body.pageSize;
    let serachsql = `select * from t_announcements limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_announcements`
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '查看成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body=ctx.body={
        result,
        total
    }
})

admin.post('/add/adminannouncement', async(ctx)=>{   //添加公告
    let myannouncement = ctx.request.body.announcement;  //获取前端传来的公告文本
    let insertsql = `insert into t_announcements (text)values ('${myannouncement}')`;
    let result = await new Promise((resolve,reject)=>{
        return db.query(insertsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '添加成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})


admin.post('/amend/adminannouncement', async(ctx)=>{   //修改文本
    let myid = ctx.request.body.id   //获取前端传来的id
    let myannouncement = ctx.request.body.announcement;  //获取前端传来的文本
    let updatesql = `update t_announcements set text = '${myannouncement}' where id = '${myid}'`
    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '修改成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result 
})

admin.post('/delete/adminannouncement', async(ctx)=>{   //删除文本
    let myid = ctx.request.body.id   //获取前端传来的id
    let deletesql = `delete from t_announcements where id = '${myid}'`
    let result = await new Promise((resolve,reject)=>{
        return db.query(deletesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '删除成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})


//积分的查询
admin.post('/refer/integar', async(ctx)=>{   //查看所有人的积分情况 
    let mycurPage = ctx.request.body.curPage;
    let mypageSize = ctx.request.body.pageSize;
    let serachsql = `select * from t_garbagemanagements limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_garbagemanagements`;
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
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body=ctx.body={
        result,
        total
    }
})

//奖品发放
admin.post('/amend/prize', async(ctx)=>{ 
    let myaccount = ctx.request.body.account;
    let myprize = ctx.request.body.prize;
    console.log(myprize)
    console.log(1)
    console.log(myaccount)
    let updatesql = `update t_garbagemanagements set prize = '${myprize}',punish =' '  where account = '${myaccount}'`
    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '发放成功！',
                status:'200',
                data,
            }
            resolve(obj)
        })
    })
    ctx.body = result
})

//公布惩罚
admin.post('/amend/punish', async(ctx)=>{ 
    let myaccount = ctx.request.body.account;
    let mypunish = ctx.request.body.punish;
    let updatesql = `update t_garbagemanagements set prize = ' ',punish ='${mypunish}'  where account = '${myaccount}'`
    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '公布成功！',
                status:'200',
                data,
            }
            resolve(obj)
        })
    })
    ctx.body = result
})


module.exports = admin 