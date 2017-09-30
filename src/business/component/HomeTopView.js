import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native'
import HomeTopCell from './HomeTopCell'

class HomeTopView extends PureComponent {
    render() {
       // debugger;
        return (
               <View>
                    {this.props.infos.map((info, index) => (
                        <HomeTopCell
                            info={info}
                            myIndex = {index}
                            key={index}
                            onPress={() => this.props.onTextClick(index)} />
                    ))}
               </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default HomeTopView
