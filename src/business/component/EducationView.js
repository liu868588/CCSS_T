import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, Image,TouchableOpacity,InteractionManager} from 'react-native';
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
import EducationScroll from './EducationScroll'
import {getEducationList} from '../service/EducationService'
import api from '../../api'
import Swiper from 'react-native-swiper'

class EducationView extends Component{
    state:{
        publicEducationDataArr: Array<Object>,// 宣传教育( 轮播图)数据
    }
    constructor(){
        super();
        this.state = {
            publicEducationDataArr:[],
        }
        this.lock = false;
    }

    // 请求网络数据
    componentDidMount(){
        // this.requestData();
    }
    componentWillMount(){
        this.requestData();
    }

    requestData(){
        // 宣传教育
        this._getEducationList();
    }

    _getEducationList(){
        getEducationList().then((responseData)=>{
            var jsonData = responseData['T1348647853363'];
            // 定义临时变量
            var headerArr = [];
            // 判断
            if(jsonData[0].hasAD == 1){ // 取出广告数据
                headerArr = jsonData[0].ads;
            }
            console.info("头部"+headerArr);
            /*this.setState({
                publicEducationDataArr:headerArr,
            })*/
            this.toggleLoading(headerArr);
        }).catch((error)=>{
            alert(error)
        }).done();
    }

    toggleLoading(headerArr){
        if(!this.lock){
            this.setState({
                publicEducationDataArr:headerArr,
            })
        }
    }

    render(){
        console.info("EducationView render")
        return(
                 <EducationScroll
                     imageDataArr = {this.state.publicEducationDataArr}
                     onEducationClick={(index)=>this.onEducationClick(index)}
                 />
       );
    }

    onEducationClick(index:number){
        let publicEducation = this.state.publicEducationDataArr[index];
        let educationID_ = publicEducation.url;
        this.props.navigation.navigate('EducationDetail',{educationID:educationID_})
    }

    //组件将被卸载
    componentWillUnmount(){
        this.lock = true;
    }

};

// 输出
export default EducationView;
