import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import getStyles from '../../styles'
import { showRegister } from '../../store/actions/app'
import { loadMediaChildrenComments } from '../../store/actions/comments'
import { Avatar } from 'react-native-elements'; 
import { NavigationContext } from '@react-navigation/core';

class CommentCard extends Component {

    static contextType = NavigationContext

    open = () => {
        if (this.props.token) {
            const navigation = this.context;
            this.props.onLoadMediaChildrenComments(this.props.item.id)
            const item = {...this.props.item}
            delete item.subComments
            navigation.navigate('CommentDetails', {
                item: item,
                media: this.props.media,
                mediaType: this.props.mediaType,
            })
        } else
            this.props.onShowRegister()
    }

    render() {
        const {AppStyles, CommentCardStyles} = getStyles(['AppStyles', 'CommentCardStyles'], this.props.theme)
        return (
            <View style={CommentCardStyles.card}>
                <View style={CommentCardStyles.row}>
                    <Avatar rounded source={{uri: this.props.item.avatar}} size='medium'/>
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
                        {
                            typeof this.props.item.subComments == 'undefined' ? null :
                            this.props.item.subComments > 0 ?
                                <>
                                    <TouchableOpacity style={[CommentCardStyles.row, CommentCardStyles.commentsPanel]} onPress={this.open}>
                                        <Text style={CommentCardStyles.subcomments}>{this.props.item.subComments} Comentários</Text>
                                    </TouchableOpacity>
                                </> : 
                                <>
                                    <TouchableOpacity style={[CommentCardStyles.row, CommentCardStyles.commentsPanel]} onPress={this.open}>
                                        <Text style={CommentCardStyles.subcomments}>Responder</Text>
                                    </TouchableOpacity>
                                </>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
        token: state.user.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMediaChildrenComments: parentId => dispatch(loadMediaChildrenComments(parentId)),
        onShowRegister: () => dispatch(showRegister()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard)