import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    ToastAndroid,
    TouchableOpacity,
} from 'react-native'
import MyIcon from '../MyIcon'
import getStyles from '../../styles'
import { addTrackQueue, showUpNext } from '../../store/actions/mediaPlayer'
import { NavigationContext } from '@react-navigation/native'
import config from "../../app.config";

class FloatingAddNext extends Component {

    static contextType = NavigationContext;
    podcast= {}

    addNext = () => {
        const navigation = this.context;
        if (this.props.mediaPlayer.queue.length >= config.maxPlaylistQueue) {
            const isSelectedTrackInQueue = this.props.mediaPlayer.queue.find((item) => {
                return item.id == this.podcast.id
            })
            if (typeof isSelectedTrackInQueue == 'undefined')
                ToastAndroid.show('Wow! Sua playlist tem mais de 10 episódios. Mais um e eu explodo, então vamo manter essa lista em 10, ok? Good.', ToastAndroid.LONG)
            navigation.navigate('UpNext')
            return
        }
        this.props.onAddTrackQueue(this.podcast, false)
        this.props.onShowUpNext()
        navigation.navigate('UpNext')
    }

    constructor(props) {
        super(props)
        this.podcast = (props.podcast) ? props.podcast : props._podcast
    }

    render() {
        const {Buttons, colors} = getStyles(['Buttons', 'colors'], this.props.theme)
        const isCurrentTrackActive = (this.props.mediaPlayer.currentTrack.id != null)
        const isSelectedTrackActive = (isCurrentTrackActive && this.props.mediaPlayer.currentTrack.id == this.podcast.id)
        const isSelectedTrackInQueue = this.props.mediaPlayer.queue.find((item) => {
            return item.id == this.podcast.id
        })
        const icon = (isSelectedTrackActive || typeof isSelectedTrackInQueue != 'undefined') ? 'playlist_add_check' : 'playlist_add'
        const color = (isSelectedTrackActive || typeof isSelectedTrackInQueue != 'undefined') ? colors.success : colors.text
        const size = (this.props.size) ? this.props.size : 15
        const style = (this.props.style) ? this.props.style : {}
        return (
            <TouchableOpacity
                style={[Buttons.floatingAddNext, style]}
                onPress={this.addNext}
                >
                <MyIcon name={icon} size={size} color={color} />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mediaPlayer: state.mediaPlayer,
        showMiniPlayer: state.mediaPlayer.showMiniPlayer,
        _podcast: state.podcasts.selected,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTrackQueue: (podcast, start) => dispatch(addTrackQueue(podcast, start)),
        onShowUpNext: () => dispatch(showUpNext()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingAddNext)