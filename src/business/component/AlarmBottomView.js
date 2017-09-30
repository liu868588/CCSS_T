/**
 * Created by liuzy on 2017/8/9.
 */

import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,NativeModules,ToastAndroid,DeviceEventEmitter} from 'react-native';
import StorageModel from '../model/StorageModel'
import {_read,_save,_delete} from '../../common/Storage'
import {callAlarmPolice} from '../service/AlarmService'

//import  '../../common/Storage'

var AlarmButton = require('./AlarmButton')
import screen from '../../common/screen'
let debounce = true; // 防止连续点击多次

class AlarmBottomView extends Component {
    constructor(){
        super()
    }

    // 接受原生回调
    componentDidMount(){
        DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
            //title = "React Native界面,收到数据：" + global.patchImgNames;
            ToastAndroid.show("发送成功"+msg , ToastAndroid.SHORT);
            this._alarm(1,1);
        })
    }

    _readStorage(){
        alert(StorageModel.id+','+StorageModel.ip+','+StorageModel.port)
    }

    render() {
        return (
                <AlarmButton
                    infos={this.getDataList()}
                    onButtonClick={(index) => this.onButtonClick(index)}
                />
        );
    }

    /*
        index = 0:匪警
                1:火警
                2:医疗
                3:上报
     */
    onButtonClick(index: number) {
        // 调用原生，进入视频通话界面
        if(index == 0){
            // 此时应该调用服务，传一个报警类别（匪警，火警，医疗），
            /*let userId = '-98051';
            let ip = 'demo.anychat.cn';
            let port = '8906';
            let name = '清源小区';
            let roomId = '1';
            NativeModules.commModule.rnCallNative_(userId,ip,port,name,roomId);*/
            // NativeModules.commModule.rnCallNative_(phone);
            this._alarm(1,1);
        }else if(index == 1){
            _save('090921','192.168.1.8','9999');
           // this._saveMe()
           // alert("存储信息为："+StorageModel.id+','+StorageModel.ip+','+StorageModel.port)
        }else if(index == 2){
            //this._readMe();
            this._readStorage();
            //alert("医疗")
        }else if(index == 3){
            //_delete();
            this.props.navigation.navigate('Report')
        }
    }

    _alarm(number,type){
        if (debounce) {
            debounce = false;
            callAlarmPolice(number,type).then((responseData)=>{
                setTimeout(() => {
                    debounce = true;
                    }, 500,
                );
                //debounce = true;
                // 得到结果数据
                //debugger
                console.info("heheda")
                //alert("test");
                let userId = '-98051';
                let ip = 'demo.anychat.cn';
                let port = '8906';
                let name = '清源小区';
                let roomId = '1';
                NativeModules.commModule.rnCallNative_(userId,ip,port,name,roomId);
            }).catch((error)=>{
                alert(error)
            }).done();
        }
    }

    getDataList(){
        return(
            [
                {img: require('../../img/btn_bandit.png'), title:'匪警', },
                {img: require('../../img/btn_fire.png'), title:'火警', },
                {img: require('../../img/btn_ambulance.png'), title:'医疗', },
                {img: require('../../img/btn_report.png'), title:'上报', },
            ]
        )
    }
}

export default AlarmBottomView;