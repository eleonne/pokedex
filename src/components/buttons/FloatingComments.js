import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    TouchableOpacity,
} from 'react-native'
import MyIcon from '../MyIcon'
import getStyles from '../../styles'
import { showRegister } from '../../store/actions/app'
import { loadMediaComments } from '../../store/actions/comments'
import { NavigationContext } from '@react-navigation/core'


class FloatingComments extends Component {

    static contextType = NavigationContext

    openComments = () => {
        if (this.props.token) {
            const navigation = this.context;
            this.props.onLoadMediaComments(this.props.mediaType, this.props.media.id)
            navigation.navigate('Comments', {
                media: this.props.media,
                mediaType: this.props.mediaType,
                onClose: this.props.onClose,
                onOpen: this.props.onOpen,
            })

        } else
            this.props.onShowRegister()
    }

    render() {
        const {Buttons, colors} = getStyles(['Buttons', 'colors'], this.props.theme)
        const size = (this.props.size) ? this.props.size : 15
        const style = (this.props.style) ? this.props.style : {}
        return (
            <TouchableOpacity
                onPress={this.openComments}
                style={[Buttons.floatingComments, style]}
                >
                <MyIcon name="bubbles"  size={size} color={colors.text} />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        theme: state.theme.selectedTheme,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowRegister: () => dispatch(showRegister()),
        onLoadMediaComments: (mediaType, id) => dispatch(loadMediaComments(mediaType, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingComments)