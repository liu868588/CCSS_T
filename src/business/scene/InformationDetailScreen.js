/**
 * 信息详情页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity,ScrollView,ListView,FlatList,ActivityIndicator} from 'react-native';
import color from '../../common/color'    // 引入颜色
import {getInformationDetail} from '../service/InformationService'

class InformationDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.articleName,
        headerStyle: { backgroundColor:color.TopColor },
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: 'white',
    });

    state:{
        articleId:string, //文章ID
        articleName:string, //文章标题名
        articleContent:string,//文章内容
        animating:boolean// 是否出现加载图标
    }
    constructor(props: Object){
        super(props);
        this.state = {
            articleId: this.props.navigation.state.params.articleId,
            articleContent:'',
            animating: true,
        }
    }

    componentDidMount() {
        this.requestData();
    }

    requestData = () => {
        getInformationDetail(this.state.articleId).then((responseData)=>{
            var jsonData = responseData[this.state.articleId];

             this.setState({
                 articleContent: jsonData.body,
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
                <Text>{this.state.articleContent}</Text>
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

export default InformationDetailScreen;