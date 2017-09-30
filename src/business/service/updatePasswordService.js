/**
 * 修改密码
 */
import {getNetResult} from '../../common/FetchURL'
import {updatePassword} from '../../api'

// 修改密码
export function appUpdatePassword(deviceNo,newPassword) {
    return getNetResult(updatePassword(deviceNo,newPassword));
}

