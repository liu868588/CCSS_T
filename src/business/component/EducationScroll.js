/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, Image,TouchableOpacity,InteractionManager} from 'react-native';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
import screen from '../../common/screen'  // 引入屏幕的宽和高
import color from '../../common/color'    // 引入颜色
var TimerMixin = require('react-timer-mixin');// 引入计时器类库

let scrollWidth = (screen.width/8)*4;

class EducationScroll extends Component{
    // 注册计时器
    mixins: [TimerMixin];


    static defaultProps = {
        // 每隔多少时间
        duration: 5000,

        // 所有的Image对象数组
        imageDataArr: [],
        // title_liu:''
    }

   state:{
       // 当前的页码
       currentPage: number,
       // 标题
       title: string,
   }

   constructor(){
        super();
        this.state={
            currentPage: 0,
            //title:"",
            // title:this.props.liu
            // title: this.props.imageDataArr[0].title
        }
   }
    render(){
        //console.info("Education render 执行两次？？")
       // debugger;
       return(
                  <View style={styles.container}>
                      <ScrollView
                          ref="scrollView"
                          horizontal={true}
                          // 隐藏水平滚动条
                          showsHorizontalScrollIndicator={false}
                          // 自动分页
                          pagingEnabled={true}
                          // 当一帧滚动结束
                          onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                          // 开始拖拽
                          onScrollBeginDrag={this.onScrollBeginDrag}
                          // 停止拖拽
                          onScrollEndDrag={this.onScrollEndDrag}
                      >
                          {this.renderAllImage()}
                      </ScrollView>

                      {/*返回指示器*/}
                      <View style={styles.pageViewStyle}>
                          {/*返回对应的标题*/}
                          <Text style={{color:'white',fontSize:8,marginLeft:3}}>{this.state.title}</Text>
                          {/*返回5个圆点*/}
                          <View style={{flexDirection:"row"}}>
                              {this.renderPageCircle()}
                          </View>

                      </View>
                  </View>
       );
    }

    // 调用开始拖拽
    onScrollBeginDrag(){
        console.info("开始拖拽")
       // 停止定时器
       clearInterval(this.timer);
        // this.timer && clearTimeout(this.timer);
    }

    // 调用停止拖拽
   onScrollEndDrag(){
       console.info("停止拖拽")
     // 开启定时器
     //this.startTimer();
   }

    componentWillUnmount() {
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    // 实现一些复杂的操作
    componentDidMount(){
       console.info("Education componentDidMount")

       // 开启定时器
       this.startTimer();
    }

    // 开启定时器
    startTimer(){
        // 1. 拿到scrollView
        var scrollView = this.refs.scrollView;
        // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = setInterval(()=> {
            var imgCount = this.props.imageDataArr.length;// 5
            /*console.info("开始一个定时器")
            console.info("开始一个定时器------------"+this.props.duration)
            console.info("imageDataArr"+this.props.imageDataArr+"长度为："+imgCount);
            console.info("this.state.currentPage"+this.state.currentPage);*/
            // 2.1 设置圆点
            //debugger;
            var activePage = 0;
            // 2.2 判断
            if((this.state.currentPage+1) >= imgCount){ // 越界
               activePage = 0;
            }else{
               activePage = this.state.currentPage+1;
            }

            // 2.3 更新状态机
            this.setState({
              currentPage: activePage
            });

            // 2.4 让scrollView滚动起来
            var offsetX = activePage * scrollWidth;
            scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});

            let _title;
            // 以防网络没有加载出来，进行判断 this.props.imageDataArr 是否存在的情况
            if(this.props.imageDataArr[activePage]){
                _title = this.props.imageDataArr[activePage].title
            }
            this.setState({
                // 标题
                title: _title
            });

         }, this.props.duration);

    }


    // 返回所有的图片
    renderAllImage(){
        // 数组
        var allImage = [];
        // 拿到图像数组
        var imgsArr = this.props.imageDataArr;
        // 遍历
        for(var i=0; i<imgsArr.length; i++){
            // 取出单独的每一个对象
            var imgItem = imgsArr[i];
            // console.log(imgItem);
            // debugger;
            // 创建组件装入数组
            allImage.push(
                //(screen.width/8)*4
                <TouchableOpacity key={i} activeOpacity={0.9}
                                  onPress={() => this.props.onEducationClick(this.state.currentPage)} >
                     <Image source={{uri: imgItem.imgsrc}} style={{width:scrollWidth, height:140}}/>
                </TouchableOpacity>
            );
        }
        // 返回数组
        return allImage;
    }

   // 返回所有的圆点
   renderPageCircle(){
       // 定义一个数组放置所有的圆点
       var indicatorArr = [];
       var style;
       // 拿到图像数组
       var imgsArr = this.props.imageDataArr;
       // 遍历
       for(var i=0; i<imgsArr.length; i++){

          // 判断
          style = (i==this.state.currentPage) ? {color:'orange'} : {color:'#ffffff'};

         // 把圆点装入数组
         indicatorArr.push(
             <Text key={i} style={[{fontSize:25},style]}>&bull;</Text>
         );
       }
       // 返回
       return indicatorArr;
   }

   //  当一帧滚动结束的时候调用
   onAnimationEnd(e){
       // alert("test");
      // 1.求出水平方向的偏移量
      var offSetX = e.nativeEvent.contentOffset.x;

      // 2.求出当前的页数
      var currentPage = Math.floor(offSetX / scrollWidth);
      // console.log(currentPage);

      // 3.更新状态机,重新绘制UI
      this.setState({
        // 当前的页码
        currentPage: currentPage,
        // 标题
        title: this.props.imageDataArr[currentPage].title
      });
   }
};

const styles = StyleSheet.create({
  container:{
      // marginTop:25
      width:scrollWidth
  },

  pageViewStyle:{
      width:scrollWidth,
      height:25,
      backgroundColor:'rgba(0,0,0,0.4)',

      // 定位
      position:'absolute',
      bottom:0,

      // 设置主轴的方向
      flexDirection:'row',
      // 设置侧轴方向的对齐方式
      alignItems:'center',
      // 设置主轴的对齐方式
      justifyContent:'space-between'
  }
});

// 输出
export default EducationScroll;
