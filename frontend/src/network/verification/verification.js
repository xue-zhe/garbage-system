import {request} from "../request";
export function getVerificationMultidata(){
    return request({
        url: 'verification',
        method:'get',
    })
}