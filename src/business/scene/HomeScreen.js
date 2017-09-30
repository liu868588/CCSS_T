/**
 * 主页
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity} from 'react-native';
import HomeTop from '../component/HomeTop'
import EarningAlarmScroll from '../component/EarningAlarmScroll'
import HomeContent from '../component/HomeContent'
import { MenuContext } from 'react-native-popup-menu';
import {_read} from '../../common/Storage'
import StorageModel from '../model/StorageModel'

class HomeScreen extends React.Component {
    static navigationOptions = {
        header:null, //隐藏头部
    }
    constructor(){
        super();
        /*console.ignoredYellowBox = [
            'Menu has to contain',
            'menu with name menu-1 does not exist'
        ];*/
    }

    componentDidMount(){
        this._readStorage();
    }
    _readStorage(){
        _read().then((responseData)=>{
            // 得到结果数据
            let id = responseData.id
            let ip = responseData.ip
            let port = responseData.port
            StorageModel.id = id
            StorageModel.ip = ip
            StorageModel.port = port

            //alert("从内存中读的值？？？："+id+','+ip+','+port+'model：'+StorageModel.id)
        }).catch((error)=>{
            alert("error_alarnBottomView"+error)
        }).done();
    }

    render() {
        return (
            <View style={styles.container}>
                {/* 首页头部 */}
                <HomeTop navigation={this.props.navigation}/>
                {/* 首页头部滚动信息 ---- 预警信息*/}
                <EarningAlarmScroll navigation={this.props.navigation}/>
                {/* 首页内容 */}
                <HomeContent navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreen;