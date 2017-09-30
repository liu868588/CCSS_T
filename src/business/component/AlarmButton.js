/**
 * Created by liuzy on 2017/8/9.
 */

import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity} from 'react-native';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
var Button = require('./widget/Button')

class AlarmButton extends Component{
    static defaultProps = {
        infos: []
    }
    render() {
        return (
                <View style={styles.bottomView}>
                    {this.props.infos.map((info, index) => (
                        <Button
                            info={info}
                            key={index}
                            onPress={() => this.props.onButtonClick(index)} />
                    ))}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    // 报警按钮View
    bottomView:{
        //width:(screen.width/8)*4,
        height:(screen.height/10)*3-15,
        backgroundColor:color.contentColor,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:3,
        // marginRight:5,
        // marginLeft:5
        paddingLeft:20,
        paddingRight:20,
        //alignItems:'center'
        //backgroundColor:'blue'
    }
});

// 输出组件类
module.exports = AlarmButton;