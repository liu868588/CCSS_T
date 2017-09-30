/**
 * 上报
 */
import {getNetResult} from '../../common/FetchURL'
import {report,reportList,reportDetail} from '../../api'
// 增加上报信息
export function addReport(name,sex,phone,title,date,time,address,content) {
    return getNetResult(report(name,sex,phone,title,date,time,address,content));
}
export function getReportList() {
    return getNetResult(reportList());
}

// 获取上报详情
export function getReportDetail(id) {
    return getNetResult(reportDetail(id));
}