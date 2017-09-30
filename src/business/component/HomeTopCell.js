import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio } from 'react-native'
import {Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';

class HomeTopCell extends PureComponent {
    render() {
        let info = this.props.info;
       // debugger;
        let my_index = this.props.myIndex;
        let title = info.title;
        let img = info.img;
        let divider;
        divider = ( my_index != info.sumLength-1) && <View style={styles.divider}/>;
        return (
            <TouchableOpacity onPress={this.props.onPress} key = {my_index}>
                <View style = {{flexDirection:'row',alignItems:'center'}} >
                    <Image source={img} style={styles.voiceIcon}/>
                    <Text>{title}</Text>
                </View>
                <View>{divider}</View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    voiceIcon: {
        marginLeft: 10,
        marginRight: 17,
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    divider: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: '#d7d7d7'
    },
})

export default HomeTopCell
