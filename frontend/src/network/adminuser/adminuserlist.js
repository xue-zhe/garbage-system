import {request} from "../request";
/**
 * 查找用户信息
 * */
export function getUserListMultidata(curPage,pageSize){
    return request({
        url: 'admin/refer/person',
        method:'post',
        data:{
            curPage,pageSize
        }
    })
}
/**
 * 模糊查询用户信息
 * */
export function getuserlistMultidata(curPage,pageSize,index){
    return request({
        url: 'admin/dimrefer/person',
        method:'post',
        data:{
            curPage,pageSize,index
        }
    })
}

/**
 *修改用户信息
 * */
export function getusereditMultidata(account,name,studentno, college, major,dormitoryno ){
    return request({
        url: 'admin/amend',
        method:'post',
        data:{
            account,name,studentno, college, major,dormitoryno
        }
    })
}


/**
 * 删除用户
 **/
export function getuserdeleteMultidata(account){
    return request({
        url: 'admin/delete',
        method:'post',
        data:{
            account
        }
    })
}


/**
 * 添加用户
 **/
export function getuseraddMultidata(name, account, password, studentno, college,major,dormitoryno){
    return request({
        url: 'admin/add',
        method:'post',
        data:{
            name, account, password, studentno, college,major,dormitoryno
        }
    })
}