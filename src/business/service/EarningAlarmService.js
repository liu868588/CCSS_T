/**
 * 预警信息
 */
import {getNetResult} from '../../common/FetchURL'
import api,{earlyWarningDetail} from '../../api'

// 获取预警信息列表
export function getEarlyWarningList() {
    return getNetResult(api.early_warning);
}

// 获取预警信息详情
export function getEarlyWarningDetail(id) {
    // let alarmDetail = FetchURL(earlyWarningDetail(id));
    return getNetResult(earlyWarningDetail(id));
}