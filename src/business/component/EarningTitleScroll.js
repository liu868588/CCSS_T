import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,ListView,TouchableOpacity,Animated, Easing,} from 'react-native';
import EarningAlarmCell from './EarningAlarmCell'

class EarningTitleScroll extends Component{
    // 设置固定值
    props:{
        textDataArr: [],
    }

    // 设置可变的和初始值
    state:{
        //translateX:number,
    }
    constructor(){
        super()
        this.state = {
            // translateX:new Animated.Value(0), // 离左边屏幕的距离
            //translateX:0, // 离左边屏幕的距离
        }
    }
    componentWillMount() {
        this.translateX = new Animated.Value(1);

        this.textWidth = 1000;// 所有文字的长度(首次滚动设置的值，之后会改变)
        this.bgViewWidth = 0;
        setTimeout(this.measureAllTextView.bind(this));
    }
    componentDidMount() {
        console.log('componentDidMount完成')
        this.showHeadBar();
    }

    // 测量文字View的长度
   measureAllTextView(){
        if(this.refs.allTextView){
            this.refs.allTextView.measure((a, b, width, height, px, py) =>
                this.textWidth = width,
            );
        }
    }

    showHeadBar() {
        console.info("全部text的值为："+this.textWidth)
        if(!this.textWidth){ // 判断，防止this.textWidth为undefined的情况(在没有网络的时候会出现)
            this.textWidth = 1000;
        }
        let durationT = this.textWidth * 40; //每次滚动所需的时间
        // this.state.translateX.setValue(this.bgViewWidth);// 首次向左滚动多少距离
        this.translateX.setValue(this.bgViewWidth);// 首次向左滚动多少距离
        Animated.timing(this.translateX, {
            toValue: -this.textWidth,          // 终值
            duration: durationT,                        // 一次动画的持续时间 毫秒为单位
            Easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {                          //每一个动画结束后的回调
            console.log('Animated.timing start');
            this.showHeadBar();  //循环动画
        })
    }

    textOnLayout(e) {
        this.textWidth = e.nativeEvent.layout.width;
    }
    bgViewOnLayout(e) {
        this.bgViewWidth = e.nativeEvent.layout.width;
    }

    render() {
        return (
            <View style={styles.container} onLayout={(event) => this.bgViewOnLayout(event)}>
                <View ref = 'textView' style={{opacity: 1,}}>
                    <Animated.View style={{transform: [{translateX: this.translateX}]}}
                        onLayout={(event) => this.textOnLayout(event)}>
                        <View ref='allTextView' style={{flexDirection:'row'}}>
                            {this.props.textDataArr.map((info, index) => (
                                <EarningAlarmCell
                                    info={info}
                                    key={index}
                                    onPress={() => this.props.onTextClick(index)} />
                            ))}
                        </View>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll',
    },

    barText: {
        marginLeft: 5,
        color: '#ff7e00',
        fontSize: 14,
    },
});

module.exports =  EarningTitleScroll;