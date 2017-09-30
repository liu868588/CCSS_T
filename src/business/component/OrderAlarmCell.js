import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native'

class OrderAlarmCell extends PureComponent {
    render() {
        let {info} = this.props

        return (
                <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
                    <View style={styles.cellViewStyle}>
                        <View style={styles.rightViewStyle}>
                            <Text style={styles.titleStyle}>{this.subStringTitle(info.title)}</Text>
                            <Text style={styles.subTitleStyle}>{this.subStringContext(info.digest)}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:6}}>{this.subStringTime(info.lmodify)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }
    subStringTitle(title){
        if(title.length>10)
            return title.substring(0,10)+"...";
        else
            return title
    }
    subStringContext(context){
        if(context)
        {
            if(context.length>15)
                return context.substring(0,15)+"...";
        }

    }
    subStringTime(time){
        if(time)
            return time.substring(0,10);
    }
}

const styles = StyleSheet.create({
    cellViewStyle:{
        // 确定主轴的方向
        flexDirection:'row',
        // 设置侧轴的对齐方式
        // alignItems:'center',
        padding:5,
        // 设置下边框
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:0.5
    },

    rightViewStyle:{
        width: 100,
        marginLeft:2
    },

    titleStyle:{
        fontSize:8,
        marginBottom:5,
        color:'coral'
    },

    subTitleStyle:{
        fontSize:6,
        color:'gray'
    },
})

export default OrderAlarmCell
