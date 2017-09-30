/**
 * 宣传教育详情页面
 */
import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text, View,Image,TouchableOpacity} from 'react-native';

class EducationDetailScreen extends React.Component {
    state:{
        educationID:string //宣传教育ID
    }
    constructor(props: Object){
        super(props);
        this.state = {
            educationID: this.props.navigation.state.params.educationID
        }
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5}
                onPress={() => this.props.navigation.goBack()}
            >

                <View style={{height:100,backgroundColor:'red'}}>
                    <Text>返回</Text>
                </View>

                <View>
                    <Text>宣传教育详情</Text>
                    <Text>{this.state.educationID}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: 'red',
    },
});

export default EducationDetailScreen;