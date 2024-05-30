import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    TouchableOpacity,
} from 'react-native'
import MyIcon from '../MyIcon'
import getStyles from '../../styles'
import { showPodcastComments } from '../../store/actions/podcasts'
import { showRegister } from '../../store/actions/app'
import { NavigationContext } from '@react-navigation/core'

class CommentsBtn extends Component {

    static contextType = NavigationContext;

    openComments = () => {
        if (this.props.token) {
            const navigation = this.context;
            this.props.onLoadMediaComments(this.props.mediaType, this.props.id)
            navigation.navigate('Comments')
        } else
            this.props.onShowRegister()
    }

    render() {
        const {Buttons, colors, PodcastCardStyles} = getStyles(['Buttons', 'colors', 'PodcastCardStyles'], this.props.theme)
        return (
            <TouchableOpacity style={PodcastCardStyles.button} onPress={this.openComments}>
                <MyIcon name='bubbles' size={20} color={colors.text} />
                <Text style={[Buttons.label]}>Comentários</Text>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowRegister: () => dispatch(showRegister()),
        onShowPodcastComments: postId => dispatch(showPodcastComments(postId)),
        onLoadMediaComments: (mediaType, id) => dispatch(loadMediaComments(mediaType, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsBtn)