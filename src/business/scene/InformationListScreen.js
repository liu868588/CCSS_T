/**
 * 信息列表页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity} from 'react-native';
import color from '../../common/color'    // 引入颜色
import {getInformationList} from '../service/InformationService'
import InformationCell from '../component/information/InformationCell'
import RefreshListView,{RefreshState} from '../component/widget/RefreshListView'

class InformationListScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        //header:null
         headerTitle: navigation.state.params.informationTitle,
         headerStyle: { backgroundColor:color.TopColor },
         headerTitleStyle:{alignSelf:'center'},
         headerTintColor: 'white',
     });

    state:{
        informationTitle:string, //信息标题
        informationType:number, //信息类型
        dataList: Array<any>,
        refreshState: number,
    }
    constructor(props: Object){
        super(props);
        this.state = {
            informationTitle: this.props.navigation.state.params.informationTitle,
            informationType: this.props.navigation.state.params.informationType,
            dataList: [],
            refreshState: RefreshState.Idle,
        }

        //  http://blog.csdn.net/kongjunchao159/article/details/65441543
        //  以防setState没有销毁
        this.lock = false;

        {(this: any).keyExtractor = this.keyExtractor.bind(this)}
        {(this: any).renderCell = this.renderCell.bind(this)}
    }


    toggleHeaderLoading(dataList){
        if(!this.lock){
            this.setState({
                dataList: dataList,
                refreshState: RefreshState.Idle,
            })
        }
    }

    toggleFooterLoading(dataList){
        if(!this.lock){
            this.setState({
                dataList: dataList,
                refreshState: dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
            })
        }
    }

    componentDidMount() {
        this.onHeaderRefresh();
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        console.log("onHeaderRefresh");
        getInformationList(this.state.informationType).then((responseData)=>{
            var jsonData = responseData['T1348647853363'];
            let dataList = this.dealWithData(true,jsonData)

            this.toggleHeaderLoading(dataList);
            /* this.setState({
             dataList: dataList,
             refreshState: RefreshState.Idle,
             })*/
        }).catch((error)=>{
            alert(error)
        }).done();
    }

    // 处理数据
    dealWithData(isReload: boolean,jsonData): Array<Object>{
        // 定义临时变量
        var headerArr = [], listDataArr = [];
        // 遍历拿到的json数据
        for(var i=1; i<jsonData.length; i++){
            // 取出单独的对象
            var data = jsonData[i];
            listDataArr.push(data);
        }

        let dataList = isReload ? listDataArr : [...this.state.dataList, ...listDataArr]

        for (let i = 0; i < dataList.length; i++) {
            dataList[i].id = i
        }
        return dataList;
    }

    onFooterRefresh = () => {
        console.log("onFooterRefresh");
        this.setState({refreshState: RefreshState.FooterRefreshing})
        getInformationList(this.state.informationType).then((responseData) => {
            var jsonData = responseData['T1348647853363'];
            let dataList = this.dealWithData(false, jsonData)

            this.toggleFooterLoading(dataList);
            /*this.setState({
             dataList: dataList,
             refreshState: dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
             })*/
        }).catch((error) => {
            alert(error)
        }).done();
    }

    keyExtractor = (item: any, index: number) => {
        return item.id
    }

    renderCell = (info: Object) => {
        let isFirst = true;
        return <InformationCell
            info={info.item}
            onPress={() => {
                if(isFirst){
                    this.props.navigation.navigate('InformationDetail',{articleId:(info.item.docid),articleName:(info.item.title)})
                    isFirst = false;
                }
            }}
        />
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                />
            </View>
        );
    }
    //组件将被卸载
    componentWillUnmount(){
        this.lock = true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default InformationListScreen;