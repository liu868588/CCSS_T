/**
 * Created by liuzy on 2017/8/9.
 */

import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image} from 'react-native';

import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色

class WeatherView extends Component {
    render() {
        return (
            <View style={styles.weatherView}>
                <Text>北京</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:5,marginBottom:5}}>
                    <Image source={require('../../img/w_rain.png')} style={{width:20,height:20,marginLeft:5,marginRight:9}}/>
                    <Text style={{fontSize:8}}>雨  21°C/27°C</Text>
                </View>
                <View style={styles.weatherTemperature}>
                    <Text style={{fontSize:25}}>28°C</Text>
                </View>
                {/*日期*/}
                <View style={{marginLeft:90}}>
                    <Text style={{fontSize:8}}>2017/08/09</Text>
                </View>
                <View style={styles.wind}>
                    <Image source={require('../../img/w_wind.png')} style={{width:20,height:20,marginLeft:5,marginRight:9}}/>
                    <Text style={{fontSize:8}}>3-4级</Text>
                </View>

                {/* 未来天气 */}
                <View style={styles.futureWeather}>
                    <View>
                        <Text style={{fontSize:10}}> 明天</Text>
                        <Image source={require('../../img/w_sunny.png')} style={{width:20,height:20}}/>
                        <Text style={{fontSize:8}}>30-35°C</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:10}}>后天</Text>
                        <Image source={require('../../img/w_sunny.png')} style={{width:20,height:20}}/>
                        <Text style={{fontSize:8}}>30-35°C</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // 天气
    weatherView:{
        width:(screen.width/8)*2,
        height:(screen.height/10)*7-10,
        backgroundColor:color.contentColor,
        marginRight:3,
    },
    // 上部的温差
    diffTemperature:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:8,
        marginBottom:8
    },
    // 中间的温度View
    weatherTemperature:{
        marginLeft:55,
        marginBottom:5
    },
    // 中下部的风
    wind:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:8,
        marginBottom:8
    },
    // 未来天气View
    futureWeather:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    // 明天天气
    tomorrowWeather:{
        alignItems:'center'
    },
    // 后天天气
    afterTomorrowWeather:{
        alignItems:'center'
    }
});

export default WeatherView;