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

class PlaylistQueueCard extends Component {

    static contextType = NavigationContext;

    details = () => {
        const navigation = this.context;
        this.props.onDetails(this.props.podcast)
        navigation.navigate('PodcastDetails')
    }

    render() {
        const {AppStyles, colors, DownloadQueueStyles} = getStyles(['AppStyles', 'colors', 'DownloadQueueStyles'], this.props.theme)
        return (
            <View style={DownloadQueueStyles.downloadQueueCard}>
                <TouchableOpacity onLongPress={this.props.onLongPress} onPress={this.details}>
                    <Image style={DownloadQueueStyles.image} source={{uri: this.props.podcast.image}} PlaceholderContent={<ActivityIndicator />} />
                </TouchableOpacity>
                <View style={DownloadQueueStyles.middleContainer}>
                    <Text numberOfLines={1} style={DownloadQueueStyles.date}>Episódio {this.props.podcast.episode_number}, {this.props.podcast.published_on}</Text>
                    <Text numberOfLines={1} style={DownloadQueueStyles.title}>{this.props.podcast.title}</Text>
                    <View style={AppStyles.row}>
                        <MyIcon name="access_time" size={16} color={colors.text} />
                        <Text style={DownloadQueueStyles.date}> {formatTime(this.props.podcast.duration, 'WRITTEN')}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: podcast => dispatch(getDetails(podcast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistQueueCard)