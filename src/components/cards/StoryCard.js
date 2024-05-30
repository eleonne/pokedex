import React, { Component } from 'react'
import { TouchableHighlight, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { loadSelectedFeed } from '../../store/actions/feed';
import getStyles from '../../styles';
import { isContentAvailable } from '../../libs/Utils';
import { showNotSubscribed, showRegister } from '../../store/actions/app';
import IGStoryCircle from "react-native-instagram-story-circle";
import { MediaType } from '../../libs/Enums';

class StoryCard extends Component {

    open = () => {
        if (this.props.user.token) {
            const isAvailable = isContentAvailable(this.props.item.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.props.onLoadSelectedFeed({
                    'type': MediaType.STORY,
                    'id': this.props.item.id,
                })
                this.props.navigation.navigate('Story')
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }

    render() {
        const {colors} = getStyles(['colors'], this.props.theme)
        const lock = {}
        if (this.props.item.exclusive) {
            const isAvailable = isContentAvailable(this.props.item.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                lock.icon = 'eye'
                lock.color = colors.text
            } else {
                lock.icon = 'eye-blocked'
                lock.color = colors.text
            }
        }
        return (
            <IGStoryCircle 
                storyRingColor={[colors.text, colors.highlight]}
                defaultRingColor={[colors.secondary, colors.primary]}
                source={{uri: this.props.item.cover}} 
                hasStory={this.props.item.hasStory}
                onPress={this.open} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadSelectedFeed: obj => dispatch(loadSelectedFeed(obj)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryCard)