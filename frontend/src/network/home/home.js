import {request} from "../request";

export function getawardMultidata(){
    return request({
        url: 'garbage/integral/award',
        method:'get',
        data:{
        }
    })
}
export function getintegralMultidata(){
    return request({
        url: 'garbage/integral/punish',
        method:'get',
        data:{
        }
    })
}
