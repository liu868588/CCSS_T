import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native'
import screen from '../../../common/screen'  // 引入屏幕的宽和高
import color from '../../../common/color'  // 引入颜色
import font from '../../../common/font'  // 引入字体大小

class InformationCell extends PureComponent {
    render() {
        let {info} = this.props

        return (
                <TouchableOpacity activeOpacity={1} onPress={this.props.onPress} style={{backgroundColor:color.contentColor}}>
                    <View style={styles.cellViewStyle}>
                        <View style={styles.leftViewStyle}>
                            <Text style={styles.titleStyle}>{this.subStringTitle(info.title)}</Text>
                            <Text style={styles.subTitleStyle}>{info.digest}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:font.timeSize,color:'#cccccc'}}>{this.subStringTime(info.lmodify)}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
        )
    }
    subStringTitle(title){
        if(title.length>20)
            return title.substring(0,20)+"...";
        else
            return title
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

    leftViewStyle:{
        width: screen.width * 0.8,
        marginLeft:2
    },

    titleStyle:{
        fontSize:font.titleSize,
        marginBottom:5,
        color:'gray'
    },

    subTitleStyle:{
        fontSize:font.subTitleSize,
        color:'#cccccc',
        height:34  //  控制子标题只有两行
    },
})

export default InformationCell
