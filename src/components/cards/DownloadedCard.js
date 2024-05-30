import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { Image } from 'react-native-elements';
import getStyles from '../../styles'
import MyIcon from "../MyIcon";
import { formatTime } from "../../libs/Utils";
import { NavigationContext } from '@react-navigation/native';
import { getDetails } from '../../store/actions/podcasts';
import { loadDownloaded, updateDownloadState, downloadCompleted } from "../../store/actions/downloadQueue";
import * as FileSystem from "expo-file-system"; 
import { playPauseCurrentTrack, setCurrentTrack, showMiniPlayer, stopPlayer } from '../../store/actions/mediaPlayer';

class DownloadedCard extends Component {

    static contextType = NavigationContext;

    playPause = () => {
        const isPodcastSelectedPlaying = (this.props.podcast.id == this.props.mediaPlayer.currentTrack.id)
        if (!isPodcastSelectedPlaying)
            this.props.onStopPlayer()
        this.props.onSetCurrentTrack(this.props.podcast)
        this.props.onPlayPauseCurrentTrack()
        this.props.onShowMiniPlayer()
    }

    removeFile = () => {
        FileSystem.deleteAsync(FileSystem.documentDirectory + '/episodes/SGP-' + this.props.podcast.id + '.mp3')
        .then((file) => {
            this.props.onUpdateDownloadState(this.props.podcast)
            this.props.onDownloadCompleted()
            this.props.onLoadDownloaded()
        })
        .catch((err) => {
            this.props.onUpdateDownloadState(this.props.podcast)
            console.warn(err)
        })
    }

    details = () => {
        if (this.props.app.isConnected) {
            const navigation = this.context;
            this.props.onDetails(this.props.podcast)
            navigation.navigate('PodcastDetails')
        }
    }

    render() {
        const {AppStyles, colors, DownloadQueueStyles, DownloadedCardStyles} = getStyles(['AppStyles', 'colors', 'DownloadQueueStyles', 'DownloadedCardStyles'], this.props.theme)
        return (
            <View style={DownloadQueueStyles.downloadQueueCard}>
                <TouchableOpacity onPress={this.details}>
                    <Image style={DownloadQueueStyles.image} source={{uri: this.props.podcast.image}} PlaceholderContent={<ActivityIndicator />} />
                </TouchableOpacity>
                <TouchableOpacity style={DownloadQueueStyles.middleContainer} onPress={this.playPause}>
                    <Text numberOfLines={1} style={DownloadQueueStyles.date}>Episódio {this.props.podcast.episode_number}, {this.props.podcast.published_on}</Text>
                    <Text numberOfLines={1} style={DownloadQueueStyles.title}>{this.props.podcast.title}</Text>
                    <View style={AppStyles.row}>
                        <MyIcon name="access_time" size={16} color={colors.text} />
                        <Text style={DownloadQueueStyles.date}> {formatTime(this.props.podcast.duration, 'WRITTEN')}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={DownloadedCardStyles.rightContainer} onPress={this.removeFile}>
                    <MyIcon name='bin2' color={colors.highlight} size={25} />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
        mediaPlayer: state.mediaPlayer,
        showPlayer: state.mediaPlayer.showMiniPlayer,
        podcast: state.podcasts.selected,
        isPlaying: state.transient.isPlaying,
        theme: state.theme.selectedTheme,
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: podcast => dispatch(getDetails(podcast)),
        onLoadDownloaded: () => dispatch(loadDownloaded()),
        onDownloadCompleted: () => dispatch(downloadCompleted()),
        onUpdateDownloadState: (podcast) => dispatch(updateDownloadState(podcast)),
        onShowMiniPlayer: () => dispatch(showMiniPlayer()),
        onSetCurrentTrack: (podcast) => dispatch(setCurrentTrack(podcast)),
        onPlayPauseCurrentTrack: () => dispatch(playPauseCurrentTrack()),
        onStopPlayer: () => dispatch(stopPlayer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadedCard)