import {request} from "../request";
/**
 * 查看垃圾投放情况
 * */
export function getBannerListMultidata(curPage,pageSize){
    return request({
        url: 'admin/refer/banner',
        method:'post',
        data:{
            curPage,pageSize
        }
    })
}

export function getbannerdeleteMultidata(id){
    return request({
        url: 'admin/delete/banner',
        method:'post',
        data:{
            id
        }
    })
}

export function getbannereditMultidata(id,banner){
    return request({
        url: 'admin/amend/banner',
        method:'post',
        data:{
            id,
            banner
        }
    })
}
