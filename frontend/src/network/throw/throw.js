import {request} from "../request";
export function getThrowMultidata(imgs,type,account,garbagename){
    return request({
        url: 'garbage/amend',
        method:'post',
        data:{
            imgs,
            type,
            account,
            garbagename
        }
    })
}

export function getAmendIntegralMultidata(account,integral){
    return request({
        url: 'garbage/amend/integral',
        method:'post',
        data:{
            account,
            integral
        }
    })
}

export function getReferIntegralMultidata(account){
    return request({
        url: 'garbage/refer/integral',
        method:'post',
        data:{
            account
        }
    })
}