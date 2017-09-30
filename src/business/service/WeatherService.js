/**
 * 天气
 */
import api from '../api';
import FetchURL from '../common/FetchURL'

// 获取天气信息
export function addReport() {
    let alarmDetail = FetchURL(api.weather);
}