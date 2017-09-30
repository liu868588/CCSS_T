/**
 * 主页内容
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image} from 'react-native';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
import WeatherView from './WeatherView'      // 天气的View
import AlarmBottomView from './AlarmBottomView'      // 报警button的View
import InformationBottomView from './InformationBottomView'     // 底部button的View
import EducationView from './EducationView';   // 宣传教育的View
import OrderAlarmList from './OrderAlarmList';     // 治安警报的list

class HomeContent extends Component{
    render() {
        return (
            <View style={styles.container}>
                {/* 内容左边View */}
                <View style={styles.contentLeftView}>
                    {/* 天气+宣传教育+报警按钮 */}
                    <View style={styles.contentMiddleView}>
                        {/* 天气信息 */}
                        <WeatherView/>
                        <View>
                            {/* banner图（宣传教育） */}
                            <View style={styles.publicEducationView}>
                                <EducationView navigation={this.props.navigation}/>
                            </View>
                            {/* 报警按钮View */}
                            <AlarmBottomView navigation={this.props.navigation}/>
                        </View>
                    </View>
                    {/* 底部按钮 */}
                    {/*<View style={styles.bottomView}>
                    </View>*/}
                    <InformationBottomView navigation={this.props.navigation}/>
                </View>
                {/* 内容右部（治安警报列表） */}
                <View style={styles.contentRightView}>
                    <OrderAlarmList navigation={this.props.navigation}/>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:screen.width,
        height:(screen.height/10)*9+100,
        //backgroundColor:color.contentColor,
       // backgroundColor:'red',

    },
    // 内容左部(天气+宣传教育+报警+底部按钮)
    contentLeftView:{
        //width:(screen.width/8)*6,
        //height
       // backgroundColor:'blue',
       //marginRight:8
    },
    //内容右部（治安警报列表）
    contentRightView:{
        width:(screen.width/8)*2,
        height:(screen.height/10)*9+6,
         backgroundColor:color.contentColor,
        marginLeft:8
        //backgroundColor:'black'
    },
    // 内容中部（天气+宣传教育+报警按钮）
    contentMiddleView:{
        //width:
        height:(screen.height/10)*7-10,
        //backgroundColor:'blue',
        flexDirection:'row',
        //marginLeft:2,
        marginBottom:2
    },

    // 正中部（宣传教育+报警按钮）
    middleView:{

    },
    // 宣传教育
    publicEducationView:{
        width:(screen.width/8)*4,
        height:(screen.height/10)*4+2,
        // backgroundColor:'pink',
        backgroundColor:color.contentColor,
        // marginBottom:2
    },
    // 报警
    alarmView:{
        width:(screen.width/8)*4,
        height:(screen.height/10)*3,
        backgroundColor:'purple'
    },
});

export default HomeContent;