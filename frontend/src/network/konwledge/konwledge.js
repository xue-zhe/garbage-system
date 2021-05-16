import {request} from "../request";

export function getkonwledgeMultidata(index){
    return request({
        url: 'knowledge',
        method:'post',
        data:{
            index
        }
    })
}