import {request} from "../request";
export function getRegisterMultidata(account,password){
    return request({
        url: 'register',
        method:'post',
        data:{
            account,
            password
        }
    })
}