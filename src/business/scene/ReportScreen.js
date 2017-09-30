/**
 * 上报页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,ScrollView,TouchableOpacity,TextInput} from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Sae,Fumi,Kohana  } from 'react-native-textinput-effects';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import DateTimePicker from 'react-native-modal-datetime-picker';
import MyButton from 'apsl-react-native-button';
import {checkMobile,isNotEmpty} from '../../common/Check';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
import {addReport} from '../service/ReportService'

class ReportScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '上报',
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });
    state:{
        name:string,
        sex:string,
        phone:string,
        title:string,
        content:string,
        date:string,
        time:string,
        address:string,
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        height:number,// 内容框的高度（会随着内容的高度而变化）

        verifyFlag:boolean,

        showNameClearIcon:boolean
    }
    constructor(){
        super()
        this.state = {
            name:'',
            sex:'boy',
            phone:'',
            title:'',
            content:'',
            date:'',
            time:'',
            address:'',
            height:0,
            verifyFlag:true,
            showNameClearIcon:false
        }
        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(index, value){
        this.setState({
            sex:value
        })
    }

    _onChange(event) {
        this.setState({ textValue: event.nativeEvent.text || '' });
    }

    _showDatePicker = () => this.setState({ isDatePickerVisible: true });

    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

    _handleDatePicked = (date) => {
        let e1 = date.toLocaleTimeString();
        let e2 = date.toLocaleDateString();
        this.setState({
            date:e2
        })
        this._hideDatePicker();
    };

    _showTimePicker = () => {this.setState({ isTimePickerVisible: true })};

    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (date) => {
        let e1 = date.toLocaleTimeString();
        let e2 = date.toLocaleDateString();
        this.setState({
            time:e1
        })
        this._hideTimePicker();
    };

    // 控制内容文本框的高度
    onContentSizeChange(event) {
        this.setState({
            height: event.nativeEvent.contentSize.height
        });
    }

    /**************** 上报人姓名清除按钮开始*****************/
    // 点击全部清除按钮
    _cleanName(){
        this.setState({name:''});
        this.setState({
            showNameClearIcon:false, // 不显示图标
        })
        this.setState({verifyFlag:true,})//不能点击,验证失败
    }
    // 在输入框输入时调用
    _nameChange(input){
        if(input != ''){
            this.setState({
                showNameClearIcon:true, // 显示图标
            })
        }
        this._showNameIcon();
    }
    // 是否显示清除按钮
    _showNameIcon(){
        return(
            this.state.showNameClearIcon ?
                <TouchableOpacity
                    onPress={() => this._cleanName()}
                    activeOpacity={0.7}
                    style={{position:'absolute',right:10}}
                >
                    <MaterialsIcon
                        name={'clear'}
                        color={'#ccc'}
                        size={20}
                    />
                </TouchableOpacity>:<View/>
        )
    }
    /**************** 上报人姓名清除按钮结束*****************/
    render() {
        return (
            <ScrollView style={styles.container}>
                {/*上报人姓名+上报人性别*/}
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Fumi
                            style = {{width:screen.width*0.5,marginRight:10}}
                            label={'上报人姓名'}
                            iconClass={MaterialsIcon}
                            iconName={'account-circle'}
                            iconColor={'#1B82D2'}
                            iconSize={20}
                            labelStyle={{ color: '#e7e7e7' }}
                            inputStyle={{ color: '#000000' }}
                            value = {this.state.name}
                            autoFocus = {true}
                            //onBlur = {(event) =>this._nameOnBlur()}//失去焦点调用
                             onChangeText={(input) => this._onBlurVerify(input,this.state.phone,this.state.title,
                                 this.state.date, this.state.time,this.state.address,this.state.content)}
                            onChange={(input)=> this._nameChange(input) }
                        />
                        {this._showNameIcon()}
                    </View>
                    <View  style={{backgroundColor:"#FFFFFF",height:64,width:screen.width*0.5}}>
                        <RadioGroup
                            size={24}
                            onSelect = {(index, value) => this.onSelect(index, value)}
                            selectedIndex = {0}
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
                        //onBlur = {(event) =>this._nameOnBlur()}
                        //  onChangeText={(input) => this.setState({phone: input})}
                        //onChangeText ={(input) => this._onPhoneBlur('',input)}
                        onChangeText ={(input) => this._onBlurVerify(this.state.name,input,this.state.title,
                            this.state.date, this.state.time,this.state.address,this.state.content)}
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
                        //onChangeText={(input) => this.setState({title: input})}
                        onChangeText ={(input) => this._onBlurVerify(this.state.name,this.state.phone,input,
                            this.state.date,this.state.time,this.state.address,this.state.content)}
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
                            //editable={false}
                            onFocus = {(event) =>this._showDatePicker()}
                            onChangeText ={(input) => this._onBlurVerify(this.state.name,this.state.phone,this.state.title,
                                input,this.state.time,this.state.address,this.state.content)}
                        />
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDatePicker}
                            //datePickerModeAndroid={'spinner'}
                            //mode={'time'}//默认为date
                            is24Hour={true} // 默认为true,显示24小时
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
                            labelStyle={{ color: '#e7e7e7',fontFamily: 'Arial',
                                fontWeight: 'bold',}}
                            inputStyle={{ color: '#000000' }}
                            value={this.state.time}
                            //editable={false}
                            onFocus = {(event) =>this._showTimePicker()}
                            //onChangeText ={(input) => this._onBlurVerify(this.state.name,this.state.phone,this.state.title,
                            //this.state.date,input,this.state.address,this.state.content)}
                        />
                        <DateTimePicker
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                            //datePickerModeAndroid={'spinner'}
                            mode={'time'}//默认为date
                            is24Hour={true} // 默认为true,显示24小时
                        />
                    </View>
                </View>
                <View style={{height:5}}></View>
                {/*异常情况时间---------之后会用这个*/}
                <View style={{flexDirection:'row',alignItems:'center',width:screen.width*0.4,backgroundColor:"#FFFFFF"}}>
                    <TouchableOpacity
                        onPress={() => this._showTimePicker()}
                        activeOpacity={0.7}
                        style={{marginRight:14,marginLeft:15}}
                    >
                        <MaterialsIcon
                            name={'access-time'}
                            color={'#1B82D2'}
                            size={20}
                        />
                    </TouchableOpacity>
                    <View style={{height:72,width:1,backgroundColor:'#e7e7e7'}}></View>
                    <TextInput
                        underlineColorAndroid="transparent" //transparent 为透明
                        style={{backgroundColor:"#FFFFFF",fontSize:16,color:'#000000',
                            height:82,width:screen.width*0.3,
                            flex: 1,
                            padding: 7,
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                        }}
                        value={this.state.time}
                        placeholder="异常情况时间"
                        placeholderTextColor={'#ccc'}
                        onFocus = {(event) =>this._showTimePicker()}
                    />
                </View>

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
                        onChangeText ={(input) => this._onBlurVerify(this.state.name,this.state.phone,this.state.title,
                            this.state.date,this.state.time,input,this.state.content)}
                    />
                </View>
                <View style={{height:5}}></View>
                {/* 异常情况内容 */}
                <TextInput
                    underlineColorAndroid="transparent" //transparent 为透明
                    onContentSizeChange={this.onContentSizeChange.bind(this)}
                    multiline={true}
                    style={{backgroundColor:"#FFFFFF",fontSize:18,color:'#000000',
                        height:Math.max(135,this.state.height),width:screen.width,textAlignVertical: 'top'}}
                    placeholder="异常情况内容"
                    placeholderTextColor={'#ccc'}
                    onChangeText ={(input) => this._onBlurVerify(this.state.name,this.state.phone,this.state.title,
                        this.state.date,this.state.time,this.state.address,input)}
                />
                <View style={{height:5}}></View>
                <MyButton style={{backgroundColor: '#0099ff',borderColor: '#0099ff',width:screen.width*1-33}}
                          textStyle={{fontSize: 18,color:'white'}}
                          onPress={()=>this._report()}
                          isDisabled ={this.state.verifyFlag}>
                    上报
                </MyButton>
                <View style={{height:15}}></View>
            </ScrollView>
        );
    }


    // 获取每一次输入的焦点
    _onBlurVerify(name,phone,title,date,time,address,content){
        if(name == ''){
            this.setState({
                  showNameClearIcon:false, // 不显示清除图标
            })
        }
        //let name = this.state.name;
        this.setState({
            name:name,
            phone:phone,
            title:title,
            date:date,
            time:time,
            address:address,
            content:content
        });
        if(isNotEmpty(name) && isNotEmpty(phone) && isNotEmpty(title) && isNotEmpty(date)
            && isNotEmpty(time) && isNotEmpty(address) && isNotEmpty(content)
            && checkMobile(phone)){
            this.setState({verifyFlag:false,})//nameTextError:'验证成功'
        }
        else{
            this.setState({verifyFlag:true,})//不能点击,验证失败
        }
    }

    // 上报按钮事件
    _report(){
        /*if(this.state.name == ''){
            alert('名称不可为空');
            return;
        }
        alert("name="+this.state.name+",sex="+this.state.sex+",phone="+this.state.phone
            +",title="+this.state.title+",date="+this.state.date+",time="+this.state.time
            +",content="+this.state.content);*/
        let name = this.state.name;
        let sex = this.state.sex;
        let phone = this.state.phone;
        let title = this.state.title;
        let date = this.state.date;
        let time = this.state.time;
        let address = this.state.address;
        let content = this.state.content;
        addReport(name,sex,phone,title,date,time,address,content).then((responseData)=>{
            // 得到结果数据
            debugger
        }).catch((error)=>{
            alert(error)
        }).done();
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
    button:{
        height:80,
        width:200,
        borderRadius:8,
        backgroundColor:'red'
    },
});

export default ReportScreen;