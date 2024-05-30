import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    TouchableOpacity,
    Text,
    View,
    Image,
} from 'react-native'
import getStyles from '../styles'
import { getDetails, } from '../store/actions/podcasts';
import { 
    hideMiniPlayer, 
    showPlayer, 
    playPauseCurrentTrack, 
    stopPlayer,
    jumpForward, 
    updateCurrentPosition, 
    savePositionOnServer
} from '../store/actions/mediaPlayer';
import MyIcon from "./MyIcon";
import TextTicker from "react-native-text-ticker";
import { NavigationContext } from '@react-navigation/native';
import { MusicBarLoader } from 'react-native-indicator';
import TrackPlayer from "../libs/TrackPlayer";

class MiniPlayer extends Component {

    static contextType = NavigationContext;

    state = {
        count: 0
    }
    player = null

    componentDidMount() {
        this.startMonitoring()
    }

    componentWillUnmount(){
        this.stopMonitoring()
    }

    startMonitoring () {
        if(!this.timer) {
            if (this.props.monitoring) {
                this.player = TrackPlayer.getInstance()
                this.state.count = 0
                this.timer = setInterval(() => {
                    this.monitoring()
                }, 1000);
            }
        }
    }

    stopMonitoring() {
        if (this.timer) {
            this.state.count = 0
            clearInterval(this.timer);
        } 
    }

    monitoring () {
        if (this.props.isPlaying) {
            this.state.count++
            if (this.state.count % 15 == 0) {
                this.player.getPosition().then((position) => {
                    this.props.onUpdateCurrentPosition(this.props.currentTrack, position)
                })
            }
            if (this.state.count > 60) {
                this.player.getPosition().then((position) => {
                    this.state.count = 0;
                    this.props.onSavePositionOnServer(this.props.currentTrack, position)
                })
            }
        }
    }
    
    expand = () => {
        if (this.props.app.isConnected) {
            const navigation = this.context;
            this.props.onGetDetails(this.props.currentTrack)
            navigation.navigate('PlayerScreen')
        }
    }

    details = () => {
        if (this.props.app.isConnected) {
            const navigation = this.context;
            this.props.onGetDetails(this.props.currentTrack)
            navigation.navigate('PodcastDetails')
        }
    }

    jumpOrClose = () => {
        if (this.props.isPlaying) {
            this.props.onJumpForward()
        } else {
            this.stopMonitoring()
            this.props.onStopPlayer()
            this.props.onHideMiniPlayer()
        }
    }

    playPause = () => {
        this.props.onPlayPauseCurrentTrack()
    }
    
    render () {
        const {colors, DownloadQueueStyles, MiniPlayerStyles} = getStyles(['colors', 'DownloadQueueStyles', 'MiniPlayerStyles'], this.props.theme)
        if (!this.props.mediaPlayer.showMiniPlayer) {
            return null
        }
        const bottom = (this.props.bottom) ? this.props.bottom : 0
        const position = (this.props.position) ? this.props.position : 'absolute'
        if (this.props.isPlaying) {
            this.startMonitoring()
            iconPlay = 'pause'
            iconJump = 'forward_30'
        } else {
            iconPlay = 'play3'
            iconJump = 'clear'
        }
        return (
            <View style={[MiniPlayerStyles.container, {bottom: bottom, position: position}]}>
                <TouchableOpacity onPress={this.details} style={MiniPlayerStyles.leftPanel}>
                    <Image style={MiniPlayerStyles.image} source={{uri: this.props.currentTrack.image}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.expand} style={MiniPlayerStyles.middlePanel}>
                    <Text numberOfLines={1} style={DownloadQueueStyles.date}>Episódio {this.props.currentTrack.episode_number}, {this.props.currentTrack.published_on}</Text>
                    <TextTicker
                        style={MiniPlayerStyles.title}
                        duration={10000}
                        bounce
                        scroll
                        animationType="bounce"
                        scrollSpeed={10000}
                        repeatSpacer={50}
                        marqueeDelay={2000}
                        >
                            {this.props.currentTrack.title}
                    </TextTicker>
                </TouchableOpacity>
                <View style={MiniPlayerStyles.rightPanel}>
                    {
                        this.props.loadingTrack ?
                        <MusicBarLoader /> :
                        <>
                        <TouchableOpacity onPress={this.playPause}>
                            <MyIcon name={iconPlay} size={32} color={colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.jumpOrClose}>
                            <MyIcon name={iconJump} size={32} color={colors.text} />
                        </TouchableOpacity>
                        </>
                    }
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        mediaPlayer: state.mediaPlayer,
        currentTrack: state.mediaPlayer.currentTrack,
        loadingTrack: state.transient.isLoadingTrack,
        isPlaying: state.transient.isPlaying,
        theme: state.theme.selectedTheme,
        app: state.app,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetHeader: () => dispatch(getHeader()),
        onGetDetails: podcast => dispatch(getDetails(podcast)),
        onHideMiniPlayer: () => dispatch(hideMiniPlayer()),
        onShowPlayer: () => dispatch(showPlayer()),
        onPlayPauseCurrentTrack: () => dispatch(playPauseCurrentTrack()),
        onStopPlayer: () => dispatch(stopPlayer()),
        onJumpForward: () => dispatch(jumpForward()),
        onUpdateCurrentPosition: (currentTrack, position) => dispatch(updateCurrentPosition(currentTrack, position)),
        onSavePositionOnServer: (currentTrack, position) => dispatch(savePositionOnServer(currentTrack, position)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)