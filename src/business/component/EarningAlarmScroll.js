/**
 * 首页头部滚动信息（预警信息）
 */

import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image} from 'react-native';
//import screen from '../../commom/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
import api from '../../api'                // 引入网络请求api
import {getEarlyWarningList} from '../service/EarningAlarmService'
import EarningTitleScroll from './EarningTitleScroll'

class EarningAlarmScroll extends Component {
    state:{
        ScrollViewArray:Array<Object>, // 预警信息（滚动文字）的数据
    }
    constructor(){
        super();
        this.state = {
            ScrollViewArray:[], // 滚动文字数组
        }
        this.lock = false;

    }

    // 请求网络数据
    componentDidMount(){
        this.requestData();
    }

    requestData(){
        // 治安警报
        this._getEarlyWarningList();
    }

    _getEarlyWarningList(){
        getEarlyWarningList().then((responseData)=>{
            /*this.setState({
                ScrollViewArray:responseData['T1348647853363'],
            })*/
            this.toggleLoading(responseData['T1348647853363']);
        }).catch((error)=>{
            alert(error)
        }).done();
    }

    toggleLoading(test){
        if(!this.lock){
            this.setState({
                ScrollViewArray:test,
            })
        }
    }

    render() {
        return (
            <View style={styles.topView}>
                <Image source={require('../../img/notice.png')} style={styles.voiceIcon}/>
                <EarningTitleScroll
                    textDataArr = {this.state.ScrollViewArray}
                    onTextClick={(index)=>this.onTextClick(index)}
                />
            </View>
        );
    }

    onTextClick(index:number){
        let earningAlarm = this.state.ScrollViewArray[index];
        let earningAlarmID_ = earningAlarm.docid;
        let earningAlarmTitle_ = earningAlarm.title;
        this.props.navigation.navigate('EarningAlarmDetail',{earningAlarmID:earningAlarmID_,earningAlarmTitle:earningAlarmTitle_})
    }

    //组件将被卸载
    componentWillUnmount(){
        this.lock = true;
    }
}

const styles = StyleSheet.create({
    // 头部view样式
    topView:{
        flexDirection:'row',
        alignItems:'center',
        // width:screen.width,
         //height:50,
         // backgroundColor:color.TopColor
         //backgroundColor:'red'
        marginTop:1
    },
    // 左边声音图片样式
    voiceIcon: {
        marginLeft: 5,
        marginRight: 5,
        marginTop:2,
        marginBottom:2,
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
});

export default EarningAlarmScroll;