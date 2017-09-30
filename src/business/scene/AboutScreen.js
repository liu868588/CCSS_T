/**
 * 关于页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity} from 'react-native';
import MyButton from 'apsl-react-native-button';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色

class AboutScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '关于',
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });
    state:{
    }
    constructor(props: Object){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginBottom:50}}>
                    <Image source={require('../../img/icon.png')} style={styles.iconImg}/>
                    <View style={{marginLeft:12}}>
                        <Text>音视频报警系统</Text>
                    </View>
                </View>
                <View>
                    <MyButton style={{backgroundColor: '#0099ff',borderColor: '#0099ff',width:200}}
                              textStyle={{fontSize: 18,color:'white'}}
                              onPress={()=>this._update()}>
                        检测更新
                    </MyButton>
                </View>
            </View>
        );
    }
    _update(){
        alert('更新');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 系统图标
    iconImg:{
        // marginLeft: 5,
        // marginRight: 5,
        marginBottom:10,
        width: 120,
        height: 120,
        //resizeMode: 'stretch'
    },
});

export default AboutScreen;