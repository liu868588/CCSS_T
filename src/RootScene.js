/**
 * Created by liuzy on 2017/8/9.
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View} from 'react-native'
import HomeScreen from './business/scene/HomeScreen'//主页
import EarningAlarmDetailScreen from './business/scene/EarningAlarmDetailScreen'// 预警详情页面
import EducationDetailScreen from './business/scene/EducationDetailScreen'// 宣传教育详情页面
import ReportScreen from './business/scene/ReportScreen'// 上报页面
import ReportListScreen from './business/scene/ReportListScreen'// 上报列表页面
import ReportDetailScreen from './business/scene/ReportDetailScreen'// 上报详情页面
import OrderAlarmDetailScreen from './business/scene/OrderAlarmDetailScreen'// 治安警报详情页面
import InformationListScreen from './business/scene/InformationListScreen'// 信息列表页面
import InformationDetailScreen from './business/scene/InformationDetailScreen'// 信息详情页面
import UpdatePasswordScreen from './business/scene/UpdatePasswordScreen'// 修改密码页面
import AboutScreen from './business/scene/AboutScreen'// 关于页面
import SetupScreen from './business/scene/SetupScreen'// 设置页面
import RegisterScreen from './business/scene/RegisterScreen'// 注册页面
import FirstScreen from './business/scene/FirstScreen'// 首次进入的页面
import App from './business/scene/App'// 首次进入的页面
import { StackNavigator} from 'react-navigation';
import { TabNavigator,TabBarBottom } from 'react-navigation';

class RootScene extends Component {
    render() {
        return (
            <Navigator/>
        );
    }
}

const Tab = TabNavigator(
    {
        Report:{
            screen: ReportScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我要上报',
            }),
        },
        ReportList:{
            screen: ReportListScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '上报列表',
            }),
        },
    },
    {
        tabBarPosition: 'bottom',
    }
)
const Navigator = StackNavigator(
    {
        Tab: { screen: HomeScreen},                               // 首次进来的页面
        Home: { screen: HomeScreen},                               // 主页
        // Tab: { screen: HomeScreen },                            // 主页【废弃，因为要判断第一次进来是否注册的问题】
        EarningAlarmDetail: { screen: EarningAlarmDetailScreen },// 预警详情页面
        EducationDetail: { screen: EducationDetailScreen },      // 宣传教育详情页面
        UpdatePassword: { screen: UpdatePasswordScreen },         // 修改密码页面
        About: { screen: AboutScreen },                            // 关于页面
        Setup: { screen: SetupScreen },                            // 设置页面
        Register: { screen: RegisterScreen },                     // 注册页面
        // Report: { screen: ReportScreen },                        // 上报页面--[废弃，因为这个之后做成一个tab页面，包含上报页面和上报列表页面]
        Report: { screen: Tab },                                   // 上报页面+上报列表
        ReportDetail: { screen: ReportDetailScreen },              // 上报详情页面
        OrderAlarmDetail: { screen: OrderAlarmDetailScreen },     // 治安警报详情页面
        InformationList: { screen: InformationListScreen },       // 信息列表页面
        InformationDetail: { screen: InformationDetailScreen },   // 信息详情页面
    },
    {
        headerMode: 'screen',
         //initialRouteName: 'Home',
    }
);

 export default RootScene;