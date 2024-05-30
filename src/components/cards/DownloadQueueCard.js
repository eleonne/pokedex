import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import getStyles from '../../styles'
import * as Progress from 'react-native-progress';
import MyIcon from "../MyIcon";
import { formatTime } from "../../libs/Utils";

class DownloadQueueCard extends Component {
    render() {
        const {AppStyles, colors, DownloadQueueStyles} = getStyles(['AppStyles', 'colors', 'DownloadQueueStyles'], this.props.theme)
        return (
            <View style={DownloadQueueStyles.downloadQueueCard}>
                <Image style={DownloadQueueStyles.image} source={{uri: this.props.podcast.image}} />
                {
                    this.props.downloadQueue.currentDownload && (this.props.downloadQueue.currentDownload.id == this.props.podcast.id) ?
                    <Progress.Pie 
                        size={64} 
                        progress={this.props.downloadQueue.percentage / 100}
                        color={colors.success}
                        style={DownloadQueueStyles.progressBar} /> :
                    null
                }
                <View style={DownloadQueueStyles.middleContainer}>
                    <Text numberOfLines={1} style={DownloadQueueStyles.date}>Episódio {this.props.podcast.episode_number}, {this.props.podcast.published_on}</Text>
                    <Text numberOfLines={1} style={DownloadQueueStyles.title}>{this.props.podcast.title}</Text>
                    <View style={AppStyles.row}>
                        <MyIcon name="access_time" size={16} color={colors.text} />
                        <Text style={DownloadQueueStyles.date}> {formatTime(this.props.podcast.duration)}</Text>
                    </View>
                </View>
                {
                    !this.props.noButton ?
                        <View style={DownloadQueueStyles.endingContainer}>
                            <TouchableOpacity
                                style={DownloadQueueStyles.deleteBtn}>
                                <MyIcon name="cancel-circle" size={32} color={colors.highlight} />
                            </TouchableOpacity>
                        </View> :
                        null
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        downloadQueue: state.downloadQueue,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHideDownloadScreen: () => dispatch(hideDownloadScreen())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadQueueCard)