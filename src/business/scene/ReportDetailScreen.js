/**
 * 上报详情页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity,ScrollView,ListView,FlatList,TextInput,ActivityIndicator} from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Sae,Fumi,Kohana  } from 'react-native-textinput-effects';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import color from '../../common/color'    // 引入颜色
import screen from '../../common/screen'  // 引入屏幕的宽和高
import {getReportDetail} from '../service/ReportService'

class ReportDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "上报详情",
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });

    state:{
        reportId:string,
        name:string,
        sex:number,//0:男  1：女
        phone:string,
        title:string,
        date:string,
        time:string,
        address:string,
        content:string,
        animating:boolean
    }
    constructor(props: Object){
        super(props);
        this.state = {
            reportId: this.props.navigation.state.params.reportId,
            name:'',
            sex:0,
            phone:'',
            title:'',
            date:'',
            time:'',
            address:'',
            content:'',
            animating: true,
        }
    }

    componentDidMount() {
        this.requestData();
    }

    requestData = () => {
        getReportDetail(this.state.reportId).then((responseData)=>{
            debugger
            var jsonData = responseData[this.state.reportId];

             this.setState({
                 name:jsonData.ec,
                 sex:1,
                 phone:jsonData.docid,
                 title:jsonData.title,
                 date:jsonData.ptime,
                 time:jsonData.ptime,
                 address:jsonData.dkeys,
                 content:jsonData.body,
                 animating: false
             })
        }).catch((error)=>{
            alert(error)
        }).done();
    }

    render() {
        return (
            <View style={{flex:1}}>
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
            :(<ScrollView style={styles.container}>
                {/*上报人姓名+上报人性别*/}
                <View style={{flexDirection:'row'}}>
                    <Fumi
                        style = {{width:screen.width*0.5,marginRight:10}}
                        label={'上报人姓名'}
                        iconClass={MaterialsIcon}
                        iconName={'account-circle'}
                        iconColor={'#1B82D2'}
                        iconSize={20}
                        labelStyle={{ color: '#e7e7e7' }}
                        inputStyle={{ color: '#000000' }}
                        value={this.state.name}
                        editable={false}
                    />
                    <View  style={{backgroundColor:"#FFFFFF",height:64,width:screen.width*0.5}}>
                        <RadioGroup
                            size={24}
                            onSelect = {(index, value) => this.onSelect(index, value)}
                            selectedIndex = {this.state.sex}
                            style={{flexDirection:"row",
                                justifyContent:'center',
                                //backgroundColor:'red',
                                //height:64,//无效，会导致text中的男女设置了，而单选框还是没有效果，所以用marginTop来解决
                                marginTop:10
                            }}
                        >
                            <RadioButton value={'boy'} ><Text>男</Text></RadioButton>
                            <RadioButton value={'girl'}><Text>女</Text></RadioButton>
                        </RadioGroup>
                    </View>

                </View>

                <View style={{height:5}}></View>

                {/*联系方式*/}
                <View style={{flexDirection:'row'}}>
                    <Fumi
                        style = {{width:screen.width*0.5,marginRight:10}}
                        label={'联系方式'}
                        iconClass={MaterialsIcon}
                        iconName={'phone'}
                        iconColor={'#1B82D2'}
                        iconSize={20}
                        labelStyle={{ color: '#e7e7e7' }}
                        inputStyle={{ color: '#000000' }}
                        keyboardType="numeric"
                        value={this.state.phone}
                        editable={false}
                    />

                </View>

                <View style={{height:5}}></View>

                {/*异常情况标题*/}
                <View style={{flexDirection:'row'}}>
                    <Fumi
                        style = {{width:screen.width,marginRight:10}}
                        label={'异常情况标题'}
                        iconClass={MaterialsIcon}
                        iconName={'title'}
                        iconColor={'#1B82D2'}
                        iconSize={20}
                        labelStyle={{ color: '#e7e7e7' }}
                        inputStyle={{ color: '#000000' }}
                        value={this.state.title}
                        editable={false}
                    />
                </View>
                <View style={{height:5}}></View>

                <View style={{flexDirection:'row'}}>
                    {/*异常情况日期*/}
                    <View style={{flexDirection:'row'}}>
                        <Fumi
                            style = {{width:screen.width*0.5,marginRight:10}}
                            label={'异常情况日期'}
                            iconClass={MaterialsIcon}
                            iconName={'date-range'}
                            iconColor={'#1B82D2'}
                            iconSize={20}
                            labelStyle={{ color: '#e7e7e7' }}
                            inputStyle={{ color: '#000000' }}
                            value={this.state.date}
                            editable={false}
                        />
                    </View>
                    {/*异常情况时间*/}
                    <View style={{flexDirection:'row'}}>
                        <Fumi
                            style = {{width:screen.width*0.5,marginRight:10}}
                            label={'异常情况时间'}
                            iconClass={MaterialsIcon}
                            iconName={'access-time'}
                            iconColor={'#1B82D2'}
                            iconSize={20}
                            labelStyle={{ color: '#e7e7e7'}}
                            inputStyle={{ color: '#000000' }}
                            value={this.state.time}
                            editable={false}
                        />

                    </View>
                </View>
                <View style={{height:5}}></View>

                <View style={{height:5}}></View>
                {/*异常情况地点*/}
                <View style={{flexDirection:'row'}}>
                    <Fumi
                        style = {{width:screen.width,marginRight:10}}
                        label={'异常情况地点'}
                        iconClass={MaterialsIcon}
                        iconName={'location-on'}
                        iconColor={'#1B82D2'}
                        iconSize={20}
                        labelStyle={{ color: '#e7e7e7' }}
                        inputStyle={{ color: '#000000' }}
                        value={this.state.address}
                        editable={false}
                    />
                </View>
                <View style={{height:5}}></View>
                {/* 异常情况内容 */}
                {/*<TextInput
                 underlineColorAndroid="transparent" //transparent 为透明
                 multiline={true}
                 style={{backgroundColor:"#FFFFFF",fontSize:18,color:'#000000',
                 height:350,width:screen.width,textAlignVertical: 'top'}}
                 placeholderTextColor={'#ccc'}
                 value={this.state.content}
                 editable={false}
                 />*/}

                <View style={{backgroundColor:"#FFFFFF"}}>
                    <Text style={{color: '#e7e7e7',fontFamily: 'Arial',fontSize:12,fontWeight: 'bold'}}>异常情况内容</Text>
                    <Text style={{color: '#000000',fontSize:16}}>{this.state.content}</Text>
                </View>

                <View style={{height:25}}></View>
            </ScrollView>)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
});

export default ReportDetailScreen;