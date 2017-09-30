/**
 * 首页头部信息
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,Modal,TextInput,TouchableOpacity,ART} from 'react-native';

import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
import HomeTopView from './HomeTopView'
import {Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import MyButton from 'apsl-react-native-button';

let mwidth = 70;
const bgColor = '#fff';//背景色,没有设置外部传入
const top = 35+6;// top 的高度加上三角形的高

class HomeTop extends Component {
    state:{
        show:boolean,
        verifyFlag:boolean,
        password:string,
        passwordShow:boolean, // 密码是否显示
        passwordIconShow:boolean, //  密码图标状态
    }
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            password:'',
            verifyFlag:true,
            passwordShow:true,
            passwordIconShow:false,
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
        };
    }

    // 出现弹出框
    _showModal(){
        this.setState({
            show:true,
            verifyFlag:true,
            passwordShow:true,
            passwordIconShow:false,
        });
    }

    _hideModal(){
        this.setState({
            show:false,
        });
    }

    _cancelBtn(){
        this._hideModal();
    }

    _sureBtn(){
        this._hideModal();
        this.props.navigation.navigate('UpdatePassword');
    }
    // 显示/隐藏 密码
    _setPasswordVisible() {
        let isPasswordShow = this.state.passwordShow;
        let passwordIconShow = this.state.passwordIconShow;
        this.setState({
            passwordShow:!isPasswordShow,
            passwordIconShow:!passwordIconShow,
        });
        this._setPassIcon();
    }
    // 显示/隐藏 密码图标效果
    _setPassIcon(){
        return(this.state.passwordIconShow ?
                <MaterialsIcon
                    name={'visibility'}
                    color={'#ccc'}
                    size={20}
                />:
                <MaterialsIcon
                    name={'visibility-off'}
                    color={'#ccc'}
                    size={20}
                />
        )
    }

    render() {
        let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff', padding: 10 }
            : null;

        //绘制路径
        const path = ART.Path();
        path.moveTo(screen.width - 10 - mwidth * 1 / 3 - 7 , top);
        path.lineTo(screen.width - 10 - mwidth * 1 / 3 - 1, top - 7);
        path.lineTo(screen.width - 10 - mwidth * 1 / 3 + 5, top);
        path.close();

        return (
            <View>
                <View style={styles.topbar}>
                    <View style={[styles.trigger,{flexDirection:'row'}]} >
                        <Image source={require('../../img/icon.png')} style={styles.iconImg}/>
                        <Text style={styles.systemText} >音视频报警系统</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this._setModalVisible(true)}>
                        <View style={styles.trigger} >
                            <Image source={require('../../img/more.png')} style={styles.moreIcon}
                                   />
                        </View>
                    </TouchableOpacity>

                    {/* 确认密码对话框*/}
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.show}
                        onShow={() => {}}
                        onRequestClose={() => {}} >
                        <View style={styles.modalStyle}>
                            <View style={styles.subView}>
                                <Text style={styles.titleText}>
                                    提示
                                </Text>
                                {/*<Text style={styles.contentText}>
                                 Modal显示的View 多行了超出一行了会怎么显示，就像这样显示了很多内容该怎么显示，看看效果
                                 </Text>*/}
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <TextInput
                                        underlineColorAndroid="transparent" //transparent 为透明
                                        style={{backgroundColor:"#FFFFFF",fontSize:18,color:'#000000',width:400}}
                                        placeholder="请输入密码"
                                        placeholderTextColor={'#ccc'}
                                        secureTextEntry={this.state.passwordShow}
                                        keyboardType="numeric"
                                        onChangeText ={(input) => this._onBlurVerify(input)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => this._setPasswordVisible()}
                                        activeOpacity={0.7}
                                        style={{position:'absolute',right:5}}
                                    >
                                        {this._setPassIcon()}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.horizontalLine} />
                                <View style={styles.buttonView}>
                                    <MyButton style={[styles.buttonStyle,{backgroundColor: '#ffffff',borderColor: '#ffffff'}]}
                                              textStyle={{fontSize: 18,color:'#3393F2'}}
                                              onPress={()=>this._cancelBtn()}>
                                        取消
                                    </MyButton>
                                    <View style={styles.verticalLine} />

                                    <MyButton style={[styles.buttonStyle,{backgroundColor: '#ffffff',borderColor: '#ffffff'}]}
                                              textStyle={{fontSize: 18,color:'#3393F2'}}
                                              onPress={()=>this._sureBtn()}
                                              isDisabled ={this.state.verifyFlag}>
                                        确定
                                    </MyButton>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* 点击更多图标  弹出的Modal*/}
                <View style={{ flex: 1 }}>
                    <Modal
                        animationType={'none'}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this._setModalVisible(false) } }
                    >
                        <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this._setModalVisible.bind(this, false)}//点击灰色区域消失
                            >
                            <View style={styles.modalContent} >
                                <ART.Surface width={screen.width} height={41} >
                                    <ART.Shape d={path} fill={bgColor} />
                                </ART.Surface>

                                <View style={[styles.innerContainer, innerContainerTransparentStyle]} >
                                    <HomeTopView
                                        infos={this.getDataList()}
                                        onTextClick={(index)=>this.onTextClick(index)}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>

            </View>
        );
    }
    // 控制【更多】的modal
    _setModalVisible(visible){
        this.setState({ modalVisible: visible });
    }
    // 获取每一次输入的焦点
    _onBlurVerify(password){
        this.setState({
            password:password,
        });
        if(password != ''){
            this.setState({verifyFlag:false,})//nameTextError:'验证成功'
        }
        else{
            this.setState({verifyFlag:true,})//不能点击,验证失败
        }
    }

    onTextClick(index){
        this.setState({ modalVisible: false });
        if(index == 0){
            //this.props.navigation.navigate('UpdatePassword')
            this._showModal();
        }else if(index == 1){
            this.props.navigation.navigate('About')
        }else if(index == 2){
            this.props.navigation.navigate('Setup')
        }
    }
    getDataList(){
        return(
            [
                {img: require('../../img/updatePassword.png'), title:'修改密码', sumLength:3},
                {img: require('../../img/about.png'), title:'关于', sumLength:3},
                {img: require('../../img/set.png'), title:'设置', sumLength:3},
            ]
        )
    }
}

const styles = StyleSheet.create({
    topbar: {
        flexDirection: 'row',
        justifyContent:'space-between',
        //backgroundColor: "black",
        backgroundColor: color.TopColor,
        //paddingTop : 1,
       // height:(screen.height/20)
       // height:60,
    },
    // 系统图标
    iconImg:{
        marginLeft: 5,
        marginRight: 5,
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    // 系统标题
    systemText:{
        fontSize:14,
        color:'white',
    },
    moreIcon: {
        marginLeft: 5,
        marginRight: 15,
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    // 系统文字和系统和更多图标
    trigger: {
        padding: 10,
        //margin: 5,
    },
    // -----------更多  弹出框开始-----------
    modalContent:{
        flex: 1,
        backgroundColor:'rgba(0, 0, 0, 0.3)'
    },
    innerContainer: {
        width:150,
        // marginTop:40,
        marginTop:0,
        marginLeft:screen.width - 150,
        borderRadius: 6,
    },
    // -----------更多 弹出框结束-----------

    //-----------modal（出现修改密码）------------
    // modal的样式
    modalStyle: {
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        // backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:8,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:40,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:0.5,
        height:44,
        backgroundColor:'#ccc',
    },
});

export default HomeTop;