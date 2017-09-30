/**
 * 报警
 */
import {getNetResult} from '../../common/FetchURL'
import {callPolice} from '../../api'

// 报警
export function callAlarmPolice(number,type) {
    return getNetResult(callPolice(number,type));
}

