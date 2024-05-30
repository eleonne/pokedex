import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Alert
} from 'react-native'

export default class Comments extends Component {

    render() {
        let view = null
        if (this.props.comments) {
            view = this.props.comments.map((item, index) => {
                return (
                    <View style={compStyles.commentContainer} key = {index}>
                        <Text style={compStyles.nickname}>{item.nickname}</Text>
                        <Text style={compStyles.comment}>{item.comment}</Text>
                    </View>
                )
            })
        }
        return (
            <View style={compStyles.container}>
                {view}
            </View>
        )
    }

}

const compStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    commentContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    nickname: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#444'
    },
    comment: {
        color: '#555'
    }
})