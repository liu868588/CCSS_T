/**
 * 预警信息详情
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import color from '../../common/color'    // 引入颜色
import {getEarlyWarningDetail} from '../service/EarningAlarmService'

class EarningAlarmDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.earningAlarmTitle,
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });
    state:{
        earningAlarmID:string, //预警ID
        earningAlarmContext:string,
        animating:boolean// 是否出现加载图标
    }
    constructor(props: Object){
        super(props);
        this.state = {
            earningAlarmID: this.props.navigation.state.params.earningAlarmID,
            earningAlarmContext:'',
            animating:true,
        }
    }

    componentDidMount() {
        this.requestData();
    }

    requestData = () => {
        getEarlyWarningDetail(this.state.earningAlarmID).then((responseData)=>{
            debugger
            var jsonData = responseData[this.state.earningAlarmID];

            this.setState({
                earningAlarmContext: jsonData.body,
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
                <Text>{this.state.earningAlarmContext}</Text>
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

export default EarningAlarmDetailScreen;