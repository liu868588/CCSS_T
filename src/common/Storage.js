/**
 * Created by liuzy on 2017/8/21.
 * 存储信息到内存中
 */

import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
import StorageModel from '../business/model/StorageModel'

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
})

global.storagelzy = storage;

export function _save(id,ip,port) {
    storage.save({
        key: 'appKey01',  // 注意:请不要在key中使用_下划线符号!
        data: {
            id:id, // 下发ID
            ip: ip,
            port: port,
        },
    });
    StorageModel.id = id;
    StorageModel.ip = ip;
    StorageModel.port = port;
}

export function _read(url) {
    return new Promise((resolve, reject) =>{
        storage.load({
            key: 'appKey01',
        }).then((ret)=>{
            resolve(ret);
        }).catch((error)=>{
            if(error){
                reject(error);
            }
        }).done();
    });

}

export function _delete(url) {
    storage.remove({
        key: 'appKey01'
    });
    //alert("删除成功");
}
