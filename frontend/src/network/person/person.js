import {request} from "../request";
export function getPersonReferMultidata(phone){
    return request({
        url: 'person/refer',
        method:'post',
        data:{
            phone
        }
    })
}

export function getPersonAmendMultidata(phone,name,studentno, college, major,dormitoryno){
    return request({
        url: 'person/amend',
        method:'post',
        data:{
            phone,name,studentno, college, major,dormitoryno
        }
    })
}

export function getPersonPasswordMultidata(account,oldpassword,newpassword,password){
    return request({
        url: 'login/amends',
        method:'post',
        data:{
            account,
            oldpassword,
            newpassword,
            password
        }
    })
}