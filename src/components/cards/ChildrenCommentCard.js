import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Image,
} from 'react-native'
import getStyles from '../../styles'
import { Avatar } from 'react-native-elements'; 
import { NavigationContext } from '@react-navigation/core';

class ChildrenCommentCard extends Component {

    static contextType = NavigationContext

    render() {
        const {AppStyles, CommentCardStyles} = getStyles(['AppStyles', 'CommentCardStyles'], this.props.theme)
        return (
            <View style={CommentCardStyles.childrenCard}>
                <View style={CommentCardStyles.row}>
                    <Avatar rounded source={{uri: this.props.item.avatar}} size='small'/>
                    <View style={CommentCardStyles.container}>
                        <View style={CommentCardStyles.rounded}>
                            <View style={[CommentCardStyles.row, CommentCardStyles.namePanel]}>
                                <Text style={[AppStyles.title, {fontWeight: 'bold'}]}>{this.props.item.first_name} {this.props.item.last_name}</Text>
                                <Text style={CommentCardStyles.label}>{this.props.item.published_on}</Text>
                            </View>
                            {
                                this.props.item.badge ?
                                    <View style={[CommentCardStyles.row, CommentCardStyles.namePanel]}>
                                        <Image style={CommentCardStyles.image} source={{uri: this.props.item.badge}}/>
                                    </View> : null
                            }
                            <View style={[CommentCardStyles.row, CommentCardStyles.namePanel]}>
                                <Text style={AppStyles.title}>{this.props.item.content}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}

export default connect(mapStateToProps)(ChildrenCommentCard)