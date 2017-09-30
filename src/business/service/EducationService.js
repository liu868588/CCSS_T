/**
 * 宣传教育
 */
import {getNetResult} from '../../common/FetchURL'
import api,{educationDetail} from '../../api'

// 获取宣传教育列表
export function getEducationList() {
    return getNetResult(api.education);
}

// 获取宣传教育详情
export function getEducationDetail(id) {
    // let alarmDetail = FetchURL(educationDetail(id));
    return getNetResult(educationDetail(id));
}
