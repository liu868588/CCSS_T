/**
 * Created by liuzy on 2017/8/9.
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,ActivityIndicator} from 'react-native'
import {appRegister,appIsRegister} from '../service/RegisterService'
import HomeScreen from './HomeScreen'
import RegisterScreen from "./RegisterScreen";

class App extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    state:{
        loaded:boolean,
        isRegister:boolean,
    }
    constructor(){
        super();
        this.state = {
            loaded:false,
            isRegister:false,// 没有注册
        }
    }

    componentDidMount(){
        // 查看是否注册
        appIsRegister().then((responseData)=>{
            let a = responseData['T1348647853363'];
            console.info("方法执行")
            this.setState({
                loaded:true, // 加载完成
                //isRegister:true,
            })

        }).catch((error)=>{
            alert(error)
        }).done();
    }

    render() {
            if(!this.state.loaded){
                return(
                    <ActivityIndicator
                        animating={!this.state.loaded}
                        style={[styles.centering, {height: 80}]}
                        size="large"/>
                )
            }else{
                if(this.state.isRegister){
                    return(
                        <HomeScreen navigation={this.props.navigation}/>
                    )
                }else {
                    return(
                        <RegisterScreen navigation={this.props.navigation}/>
                    )
                }

            }
    }
}
const styles = StyleSheet.create({
    centering:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
})

 export default App;