import {request} from "../request";
/**
 * 查看垃圾投放情况
 * */
export function getGarbageListMultidata(curPage,pageSize){
    return request({
        url: 'admin/refer/garbage',
        method:'post',
        data:{
            curPage,pageSize
        }
    })
}

/**
 * 模糊垃圾信息
 * */
export function getgarbagelistMultidata(curPage,pageSize,index){
    return request({
        url: 'admin/dimrefer/garbage',
        method:'post',
        data:{
            curPage,pageSize,index
        }
    })
}

export function getgarbagedeleteMultidata(id){
    return request({
        url: 'admin/delete/garbage',
        method:'post',
        data:{
           id
        }
    })
}