/**
 * 治安警报
 */
import {getNetResult} from '../../common/FetchURL'
import api,{orderAlarmDetail} from '../../api'

export function getOrderAlarmList() {
    return getNetResult(api.order_alarm);
}

export function getOrderAlarmDetail(id) {
    // let alarmDetail = FetchURL(API.url_api,id);
    return getNetResult(orderAlarmDetail(id));
}
