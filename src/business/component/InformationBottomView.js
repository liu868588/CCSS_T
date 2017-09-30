/**
 * Created by liuzy on 2017/8/9.
 */

import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image} from 'react-native';

import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色

var InformationButton = require('./InformationButton')

class BottomView extends Component {
    render() {

        return (
            <InformationButton
                infos={this.getDataList()}
                onButtonClick={(index) => this.onButtonClick(index)}
            />
        );
    }

    /*
     index = 0:知识信息
     1:法律法规
     2:通知公告
     3:社区治安
     4:社区风险
     */
    onButtonClick(index: number) {
        let information_title;
        if(index == 0){
            information_title = "知识信息"
        }else if(index == 1){
            information_title = "法律法规"
        }else if(index == 2){
            information_title = "通知公告"
        }else if(index == 3){
            information_title = "社区治安"
        }else if(index == 4){
            information_title = "社区风险"
        }
        /*this.props.navigation.navigate('InformationList',{informationTitle:information_title})*/
        this.props.navigation.navigate('InformationList',{informationTitle:information_title,informationType:index})
    }

    getDataList(){
        return(
            [
                {img: require('../../img/btm_knowledge.png'), title:'知识信息', },
                {img: require('../../img/btm_law.png'), title:'法律法规', },
                {img: require('../../img/btm_notice.png'), title:'通知公告', },
                {img: require('../../img/btm_police.png'), title:'社区治安', },
                {img: require('../../img/btm_danger.png'), title:'社区风险', },
            ]
        )
    }
}

const styles = StyleSheet.create({
    // 底部按钮View
    /*bottomView:{
        width:(screen.width/8)*6+5,
        height:(screen.height/10)*2+9,
        backgroundColor:color.contentColor,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:1,

        paddingLeft:20,
        paddingRight:20
    }*/
});

export default BottomView;