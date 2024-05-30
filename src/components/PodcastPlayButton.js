import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import MyIcon from './MyIcon'
import getStyles from '../styles'
import { setCurrentTrack, showMiniPlayer, playPauseCurrentTrack, stopPlayer } from "../store/actions/mediaPlayer";

class PodcastPlayButton extends Component {

    playPause = () => {
        const isPodcastSelectedPlaying = (this.props.podcast.id == this.props.mediaPlayer.currentTrack.id)
        if (!isPodcastSelectedPlaying)
            this.props.onStopPlayer()
        this.props.onSetCurrentTrack(this.props.podcast)
        this.props.onPlayPauseCurrentTrack()
        this.props.onShowMiniPlayer()
    }

    render() {
        const {colors, PodcastPlayButtonStyles} = getStyles(['colors', 'PodcastPlayButtonStyles'], this.props.theme)
        const isPodcastSelectedPlaying = (this.props.podcast.id == this.props.mediaPlayer.currentTrack.id)
        const iconPlay = (this.props.isPlaying && isPodcastSelectedPlaying) ? 'pause' : 'play2'
        return (
            <ImageBackground 
                style={PodcastPlayButtonStyles.playContainer}
                imageStyle={PodcastPlayButtonStyles.playContainerImg}
                >
                <TouchableOpacity 
                    style={PodcastPlayButtonStyles.playButton}
                    onPress={this.playPause}
                    >
                    <MyIcon name={iconPlay} size={128} color={colors.text} />
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mediaPlayer: state.mediaPlayer,
        showPlayer: state.mediaPlayer.showMiniPlayer,
        podcast: state.podcasts.selected,
        isPlaying: state.transient.isPlaying,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowMiniPlayer: () => dispatch(showMiniPlayer()),
        onSetCurrentTrack: (podcast) => dispatch(setCurrentTrack(podcast)),
        onPlayPauseCurrentTrack: () => dispatch(playPauseCurrentTrack()),
        onStopPlayer: () => dispatch(stopPlayer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastPlayButton)