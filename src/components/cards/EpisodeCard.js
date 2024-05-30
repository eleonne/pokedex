import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { connect } from 'react-redux';
import getStyles from '../../styles';
import MyIcon from "../MyIcon";
import { formatTime, isContentAvailable } from "../../libs/Utils";
import { playVideo } from "../../store/actions/transient";
import { showNotSubscribed, showRegister } from '../../store/actions/app';

class EpisodeCard extends Component {

    play = () => {
        if (this.props.user.token) {
            const isAvailable = isContentAvailable(this.props.episode.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.props.onPlayVideo(this.props.episode.link)
                const startPosition = (this.props.mediaPlayer.historic['SGP_SERIE_EPISODE_' + this.props.episode.id]) ? 
                                       this.props.mediaPlayer.historic['SGP_SERIE_EPISODE_' + this.props.episode.id] : 0
                this.props.navigation.navigate('VideoPlayer', {
                    'episode': this.props.episode,
                    'startPosition': Math.ceil(startPosition)
                })
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }

    render() {
        const {AppStyles, colors, EpisodeCardStyles, ArticleVerticalStyles} = getStyles(['AppStyles', 'colors', 'EpisodeCardStyles', 'ArticleVerticalStyles'], this.props.theme)
        const completedColor = (this.props.mediaPlayer.completed['SGP_SERIE_EPISODE_' + this.props.episode.id] == 'COMPLETED') ? colors.success : colors.secondary
        const lock = {}
        if (this.props.episode.exclusive) {
            const isAvailable = isContentAvailable(this.props.episode.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                lock.icon = 'eye'
                lock.color = colors.text
            } else {
                lock.icon = 'eye-blocked'
                lock.color = colors.text
            }
        }
        return (
            <TouchableOpacity onPress={this.play} style={[AppStyles.row, EpisodeCardStyles.item]}>
                <Text style={[AppStyles.title, EpisodeCardStyles.number]}>{this.props.episode.order}</Text>
                <View>
                    <View style={AppStyles.row}>
                        <MyIcon name="check_circle" size={16} color={completedColor} />
                        <Text style={[AppStyles.title, {marginLeft: 3}]}>{this.props.episode.title}</Text>
                    </View>
                    <View style={[AppStyles.row, EpisodeCardStyles.duration]}>
                        {
                            this.props.episode.exclusive == 1 ?
                                <View style={EpisodeCardStyles.lockContainer}>
                                    <MyIcon size={15} color={lock.color} name={lock.icon} /> 
                                </View>
                                : null
                        }
                        <MyIcon name="access_time" size={16} color={colors.text} />
                        <Text style={EpisodeCardStyles.label}>{formatTime(this.props.episode.duration, 'WRITTEN')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mediaPlayer: state.mediaPlayer,
        theme: state.theme.selectedTheme,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlayVideo: videoId => dispatch(playVideo(videoId)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeCard)