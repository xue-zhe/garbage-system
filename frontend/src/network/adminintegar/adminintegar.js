import {request} from "../request";
/**
 * 查看积分情况
 * */
export function getIntegarListMultidata(curPage,pageSize){
    return request({
        url: 'admin/refer/integar',
        method:'post',
        data:{
            curPage,pageSize
        }
    })
}

/**
 * 发放奖品
 * */
export function getprizeMultidata(account,prize){
    return request({
        url: 'admin/amend/prize',
        method:'post',
        data:{
            account,prize
        }
    })
}

/**
 * 公布处罚
 * */
export function getpunishMultidata(account,punish){
    return request({
        url: 'admin/amend/punish',
        method:'post',
        data:{
            account,punish
        }
    })
}
