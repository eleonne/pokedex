import React, {Component} from 'react';
import { 
    View,
    Text
 } from "react-native";
import { connect } from 'react-redux'
import RNTrackPlayer from 'react-native-track-player'
import getStyles from "../styles";
import Slider from "@react-native-community/slider";
import { seek } from "../store/actions/mediaPlayer";
import { formatTime } from "../libs/Utils";

class MyPlayerBar extends RNTrackPlayer.ProgressComponent {

    seek = (newPosition) => {
        this.props.onSeek(this.props.podcast, newPosition)
    }

    render() {
        const {colors, PlayerScreenStyles} = getStyles(['colors', 'PlayerScreenStyles'], this.props.theme)
        return (
            // Note: formatTime and ProgressBar are just examples:
            <View style={PlayerScreenStyles.sliderContainer}>
                <Slider
                        style={PlayerScreenStyles.slider}
                        minimumValue={0}
                        maximumValue={this.props.podcast.duration}
                        value={this.state.position}
                        minimumTrackTintColor={colors.text}
                        maximumTrackTintColor={colors.secondary}
                        thumbTintColor={colors.text}
                        onSlidingComplete={(currentValue) => this.seek(currentValue)}
                    />
                <View style={PlayerScreenStyles.trackTimeContainer}>
                    <Text style={PlayerScreenStyles.label}>{formatTime(this.state.position)}</Text>
                    <Text style={PlayerScreenStyles.label}>- {formatTime(this.props.podcast.duration - this.state.position)}</Text>
                </View>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        mediaPlayer: state.mediaPlayer,
        podcast: state.mediaPlayer.currentTrack,
        isLoading: state.podcasts.isLoading,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSeek: (currentTrack, newPosition) => dispatch(seek(currentTrack, newPosition)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlayerBar)