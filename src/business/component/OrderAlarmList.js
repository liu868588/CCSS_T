/**
 * 治安警报列表
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,ListView,TouchableOpacity} from 'react-native';
import {getOrderAlarmList} from '../service/OrderAlarmService'
import OrderAlarmCell from './OrderAlarmCell'
import RefreshListView,{RefreshState} from './widget/RefreshListView'
import screen from '../../common/screen'  // 引入屏幕的宽和高

class OrderAlarmList extends Component{
    state: {
        dataList: Array<object>,
        refreshState: number,
    }

    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            refreshState: RefreshState.Idle,
        }

        this.lock = false;

        {(this: any).keyExtractor = this.keyExtractor.bind(this)}
        {(this: any).renderCell = this.renderCell.bind(this)}
    }

    componentDidMount() {
        this.onHeaderRefresh();
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        getOrderAlarmList().then((responseData)=>{
            var jsonData = responseData['T1348647853363'];
            let dataList = this.dealWithData(true,jsonData)

            this.toggleHeaderLoading(dataList);
            /*this.setState({
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
        // debugger;
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
        //console.log("onFooterRefresh");
        this.setState({refreshState: RefreshState.FooterRefreshing})

        getOrderAlarmList().then((responseData)=>{
            var jsonData = responseData['T1348647853363'];
            let dataList = this.dealWithData(false,jsonData)

            this.toggleFooterLoading(dataList);
            /*this.setState({
                dataList: dataList,
                refreshState: dataList.length >= 45 ? RefreshState.NoMoreData : RefreshState.Idle,
            })*/
        }).catch((error)=>{
            alert(error)
        }).done();

    }

    keyExtractor = (item: any, index: number) => {
        return item.id
    }

    renderCell = (info: Object) => {
        //debugger
        return <OrderAlarmCell
            info={info.item}
            onPress={() => {
                //alert(info.item.docid+','+info.item.title);
                // this.props.navigation.navigate('OrderAlarmDetail',{orderAlarmTitle:(info.item.title)});
                 //this.props.navigation.navigate('About');
                this.props.navigation.navigate('OrderAlarmDetail',{orderAlarmID:(info.item.docid),orderAlarmTitle:(info.item.title)})
            }}
        />
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

    _addData(){
        let listDataArr = [];
        let oldListDataArrLength = this.state.dataList.length - 1; // 原数组长度
        let data = {docid: 'CUNLD0RO00018AOQ',title:"这是一个标题",digest:'这是一个副标题这是一个副标题这是一个副标题这是一个副标题',lmodify:'20190909',id:oldListDataArrLength+2}
        listDataArr.push(data);
        let newDataList  = [ ...listDataArr , ...this.state.dataList]
        // let newDataList  = [...this.state.dataList]
        // listDataArr.insert(newDataList,0,listDataArr);
        this.setState({
            dataList: newDataList,
            //refreshState: RefreshState.Idle,
        })
        //this.onHeaderRefresh();
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../img/btm_knowledge.png')} style={{width:15,height:15,marginLeft:5,marginRight:5}}/>
                    <TouchableOpacity onPress={()=>this._addData()}>
                         <Text style={{fontSize:10}}>治安警报</Text>
                    </TouchableOpacity>
                </View>

                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    footerContainerStyle={{width:(screen.width/8)*2,}}
                    footerTextStyle={{fontSize:8}}
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

export default OrderAlarmList;