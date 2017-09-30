/**
 * 注册
 */
import {getNetResult} from '../../common/FetchURL'
import {register,isRegister} from '../../api'

// 注册
export function appRegister(communityNumber,communityAddress,username,password) {
    return getNetResult(register(communityNumber,communityAddress,username,password));
}

// 是否注册
export function appIsRegister(imei) {
    return getNetResult(isRegister(imei));
}