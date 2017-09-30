/**
 * 修改密码页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Sae,Fumi,Kohana,Hoshi,Kaede,Akira,Madoka,Jiro} from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import MyButton from 'apsl-react-native-button';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
import {appUpdatePassword} from '../service/updatePasswordService'
import {checkMobile,isNotEmpty} from '../../common/Check';

class UpdatePasswordScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '修改密码',
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });
    state:{
        number:string, // 社区编号
        newPassword:string , // 新密码
        sureNewPassword:string , // 确认新密码

        verifyFlag:boolean,
    }
    constructor(props: Object){
        super(props);
        this.state={
            number:'',
            newPassword:'',
            sureNewPassword:'',
            verifyFlag:true,
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'社区编号'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    value={'020303'}
                    editable={false}
                />
                <View style={{height:5}}></View>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'新密码'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    //value = {'192.168.0.1'}
                    onChangeText={(input) => this._onBlurVerify(input,this.state.sureNewPassword)}
                />
                <View style={{height:5}}></View>

                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'确认新密码'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    //value = {'192.168.0.1'}
                    onChangeText={(input) => this._onBlurVerify(this.state.newPassword,input)}
                />
                <View style={{height:5}}></View>

                <MyButton style={{backgroundColor: '#0099ff',borderColor: '#0099ff',width:screen.width*1-33}}
                          textStyle={{fontSize: 18,color:'white'}}
                          onPress={()=>this._updatePass()}
                          isDisabled ={this.state.verifyFlag}>
                    确定
                </MyButton>
                <View style={{height:30}}></View>
            </ScrollView>
        );
    }

    // 获取每一次输入的焦点
    _onBlurVerify(newPassword,sureNewPassword){
        this.setState({
            newPassword:newPassword,
        });
        if(isNotEmpty(newPassword) && isNotEmpty(sureNewPassword) ){
            this.setState({verifyFlag:false,})//nameTextError:'验证成功'
        }
        else{
            this.setState({verifyFlag:true,})//不能点击,验证失败
        }
    }

    // 判断密码和确认密码是否一致
    _equalPassword(password,surePassword){
        if(password === surePassword){
            return true;
        }
        return false;
    }

    // 修改密码
    _updatePass(){
        let number = this.state.number;
        let newPassword = this.state.newPassword;
        let sureNewPassword = this.state.sureNewPassword;
        if( ! this._equalPassword( newPassword , sureNewPassword ) ){
            alert('密码不一致');
            return false;
        }
        appUpdatePassword(number,newPassword).then((responseData)=>{
            // 得到结果数据
            debugger
            this.props.navigation.navigate("Home");
        }).catch((error)=>{
            alert(error)
        }).done();

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16
    },
});

export default UpdatePasswordScreen;