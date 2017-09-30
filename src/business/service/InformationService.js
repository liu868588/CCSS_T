/**
 * 信息中心
 */
import {getNetResult,getNetResultNoPromise} from '../../common/FetchURL'
import {informationDetail,informationList} from '../../api'

// 获取信息中心列表
export function getInformationList(type) {
    /*let a = getNetResultNoPromise(informationList(type))
    debugger
    return getNetResultNoPromise(informationList(type));*/
    return getNetResult(informationList(type));
}

// 获取信息中心详情
export function getInformationDetail(id) {
    return getNetResult(informationDetail(id));
}