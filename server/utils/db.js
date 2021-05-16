let mysql = require('mysql')

//连接池
var pool = mysql.createPool({
    host: 'localhost', //连接的服务器（代码托管到线上，需改为内网IP，而非外网）
    Port:3306, //mysql 服务运行的端口
    database:'garbage',  //选择的库
    user:'root',  //用户名
    password:'540239736' //用户密码
})


//对数据库进行增删改查操作的基础
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,function(err,rows){
            callback(err,rows)  
            connection.release()    //中断连接
        })
    })
}

exports.query = query;