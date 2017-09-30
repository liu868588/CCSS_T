/**
 * 注册页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import { Sae,Fumi,Kohana,Hoshi,Kaede,Akira,Madoka,Jiro} from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import MyButton from 'apsl-react-native-button';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import {checkMobile,isNotEmpty} from '../../common/Check';
import {appRegister} from '../service/RegisterService'
import {_read,_save,_delete} from '../../common/Storage'
import Loading from '../../business/component/widget/Loading'

class RegisterScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    state:{
        number:string,
        address:string,
        username:string,
        password:string,
        surePassword:string,

        verifyFlag:boolean,
        animating:boolean// 是否出现加载图标
    }
    constructor(){
        super()
        this.state = {
            number:'',
            address:'',
            username:'',
            password:'',
            surePassword:'',

            verifyFlag:true,
            animating: true,
        }
    }
    render() {
        // 社区编号，地址，  （id，communityID，注册时间）
        return (
            <ScrollView style={styles.container}>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'社区编号'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    onChangeText={(input) => this._onBlurVerify(input,this.state.address,this.state.username,
                        this.state.password, this.state.surePassword)}
                />
                <View style={{height:5}}></View>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'详细地址'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    onChangeText={(input) => this._onBlurVerify(this.state.number,input,this.state.username,
                        this.state.password, this.state.surePassword)}
                />
                <View style={{height:5}}></View>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'用户名'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    onChangeText={(input) => this._onBlurVerify(this.state.number,this.state.address,input,
                        this.state.password, this.state.surePassword)}
                />
                <View style={{height:5}}></View>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'密码'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    onChangeText={(input) => this._onBlurVerify(this.state.number,this.state.address,this.state.username,
                        input, this.state.surePassword)}
                />
                <View style={{height:5}}></View>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'确认密码'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    onChangeText={(input) => this._onBlurVerify(this.state.number,this.state.address,this.state.username,
                        this.state.password,input)}
                />
                <View style={{height:5}}></View>
                <MyButton style={{backgroundColor: '#0099ff',borderColor: '#0099ff',width:screen.width*1-33}}
                          textStyle={{fontSize: 18,color:'white'}}
                          onPress={()=>this._register()}
                          isDisabled ={this.state.verifyFlag}>
                    注册
                </MyButton>
                <View style={{height:30}}></View>

                {
                    !this.state.animating ? (<Loading/>) : (null)
                }

            </ScrollView>
        );
    }
    // 获取每一次输入的焦点
    _onBlurVerify(number,address,username,password,surePassword){
        this.setState({
            number:number,
            address:address,
            username:username,
            password:password,
            surePassword:surePassword,
        });
        if(isNotEmpty(number) && isNotEmpty(address) && isNotEmpty(username) && isNotEmpty(password)
            && isNotEmpty(surePassword)){
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
    // 注册
    _register(){
        this.setState({
            animating:false
        })
        let number = this.state.number;
        let address = this.state.address;
        let username = this.state.username;
        let password = this.state.password;
        let surePassword = this.state.surePassword;
        if( ! this._equalPassword( password , surePassword ) ){
            alert('密码不一致');
            return false;
        }

        appRegister(number,address,username,password).then((responseData)=>{
            // 得到结果数据
            //debugger
            _save('090921','192.168.1.8','9999');
            //alert("正在注册")
            this.setState({
                animating:true
            })
            // 注册成功，跳转到主页
            this.props.navigation.navigate("Home");
        }).catch((error)=>{
            alert(error)
        }).done();
        //alert("---------注册完成---------");
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

export default RegisterScreen;