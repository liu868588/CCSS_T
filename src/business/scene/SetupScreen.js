/**
 * 设置页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Sae,Fumi,Kohana,Hoshi,Kaede,Akira,Madoka,Jiro} from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import MyButton from 'apsl-react-native-button';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
import {getSetInfo,setUp} from '../service/SetupService'
import {checkMobile,isNotEmpty} from '../../common/Check';

class SetupScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '设置',
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });
    state:{
        ip:string,
        port:string,
        number:string, // 社区编号
        verifyFlag:boolean,
    }
    constructor(props: Object){
        super(props);
        this.state={
            ip:'',
            port:'',
            number:'',
            verifyFlag:true,
        }
    }

    componentDidMount() {
        this.requestData();
    }

    requestData = () => {
        getSetInfo('CT33M5E700018HKM').then((responseData)=>{
            //var jsonData = responseData['CT33M5E700018HKM'];

            this.setState({
                // ip:jsonData.ec,
                port:'8090',
                //number:jsonData.docid,
            })
        }).catch((error)=>{
            alert("error:"+error)
        }).done();
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
                {/* ip : （ipv4 ipv6 域名）*/}
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'IP(服务器地址)'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    //value = {'192.168.0.1'}
                    onChangeText={(input) => this._onBlurVerify(input,this.state.port)}
                />
                <View style={{height:5}}></View>
                <Jiro
                    style = {{backgroundColor:'#ffffff',marginRight:10}}
                    label={'PORT'}
                    labelStyle={{ color: '#1B82D2' }}
                    borderColor={'#ffffff'}
                    inputStyle={{ color: '#000000' }}
                    value={this.state.port}
                    onChangeText={(input) => this._onBlurVerify(this.state.ip,input)}
                />
                <View style={{height:5}}></View>

                <MyButton style={{backgroundColor: '#0099ff',borderColor: '#0099ff',width:screen.width*1-33}}
                          textStyle={{fontSize: 18,color:'white'}}
                          onPress={()=>this._setup()}
                          isDisabled ={this.state.verifyFlag}>
                    设置
                </MyButton>
                <View style={{height:30}}></View>
            </ScrollView>
        );
    }

    // 获取每一次输入的焦点
    _onBlurVerify(ip,port){
        this.setState({
            ip:ip,
            port:port,
        });
        if(isNotEmpty(ip) && isNotEmpty(port)){
            this.setState({verifyFlag:false,})//nameTextError:'验证成功'
        }
        else{
            this.setState({verifyFlag:true,})//不能点击,验证失败
        }
    }

    // 设置
    _setup(){
        let ip = this.state.ip;
        let port = this.state.port;
        let number = this.state.number;
        setUp(ip,port,number).then((responseData)=>{
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

export default SetupScreen;