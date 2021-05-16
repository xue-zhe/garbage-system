import {request} from "../request";
/**
 * 查看垃圾投放情况
 * */
export function getTextListMultidata(curPage,pageSize){
    return request({
        url: 'admin/refer/adminannouncement',
        method:'post',
        data:{
            curPage,pageSize
        }
    })
}


export function gettexteditMultidata(id,announcement){
    return request({
        url: 'admin/amend/adminannouncement',
        method:'post',
        data:{
            id,
            announcement
        }
    })
}
