/**
 * 治安警报详情页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import color from '../../common/color'    // 引入颜色
import {getOrderAlarmDetail} from '../service/OrderAlarmService'

class OrderAlarmDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.orderAlarmTitle,
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });
    state:{
        orderAlarmID:string, //治安警报ID
        orderAlarmContext:string,
        animating:boolean// 是否出现加载图标
    }
    constructor(props: Object){
        super(props);
        this.state = {
            orderAlarmID: this.props.navigation.state.params.orderAlarmID,
            orderAlarmContext:'',
            animating:true,
        }
    }

    componentDidMount() {
        this.requestData();
    }

    requestData = () => {
        getOrderAlarmDetail(this.state.orderAlarmID).then((responseData)=>{
            var jsonData = responseData[this.state.orderAlarmID];

            this.setState({
                orderAlarmContext: jsonData.body,
                animating: false
            })
        }).catch((error)=>{
            alert(error)
        }).done();
    }

    render() {
        return (
            <View style={styles.container}>
                {this._init()}
            </View>
        );
    }

    _init(){
        return this.state.animating
            ? (<ActivityIndicator
                animating={this.state.animating}
                style={[styles.centering, {height: 80}]}
                size="large"/>)
            :(<ScrollView>
                <Text>{this.state.orderAlarmContext}</Text>
            </ScrollView>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});

export default OrderAlarmDetailScreen;