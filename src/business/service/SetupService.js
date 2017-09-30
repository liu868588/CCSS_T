/**
 * 设置
 */
import {getNetResult} from '../../common/FetchURL'
import {setup,setInfo} from '../../api'

// 设置
export function setUp(ip,port,number) {
    return getNetResult(setup(ip,port,number));
}

// 获取设置信息  number:设备编号
export function getSetInfo(number) {
    return getNetResult(setInfo(number));
}
