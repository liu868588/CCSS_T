/**
 * 首页的button
 */

import React, { Component ,PropTypes} from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity} from 'react-native';

class Button extends Component{
    static propTypes = {
        onPress: PropTypes.func,
        img:PropTypes.string,  // 图片
        title:PropTypes.string // 标题
        // onPress: Callback,
        // img:string,  // 图片
        // title:string // 标题
    }
    static defaultProps = {
        onPress() { },
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.buttonView}>
                    <Image source={this.props.info.img} style={{width:25,height:25,marginBottom:5}}/>
                    <Text style={{fontSize:10}}>{this.props.info.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonView:{
        alignItems:'center'
    }
});

// 输出组件类
module.exports = Button;