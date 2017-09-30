import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image,Button,TouchableOpacity} from 'react-native';

class EarningAlarmCell extends React.Component {
    render() {
        //console.log("render start"+OrderAlarmModel.imgUrl)
        let info = this.props.info;
        let title = info.title;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.props.onPress}>
                <Text  style={styles.barText}>{title+'        '}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    barText: {
        marginLeft: 5,
        color: '#ff7e00',
        fontSize: 14,
    },
});

export default EarningAlarmCell;
