import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import MyIcon from '../MyIcon'
import getStyles from '../../styles'
// import RNFetchBlob from 'react-native-fetch-blob'
import { updateDownloadState, newDownload, } from "../../store/actions/downloadQueue";
import { showRegister } from "../../store/actions/app";
import * as FileSystem from "expo-file-system"; 

class DownloadBtn extends Component {

    podcast= {}

    constructor(props) {
        super(props)
        this.podcast = (props.podcast) ? props.podcast : props._podcast
    }

    download = () => {
        if (this.props.user.token)
            this.props.onNewDownload(this.podcast)
        else
            this.props.onShowRegister()
    }

    removeFile = () => {
        FileSystem.deleteAsync(FileSystem.documentDirectory + '/episodes/SGP-' + this.podcast.id + '.mp3')
        .then((file) => {
            this.props.onUpdateDownloadState(this.podcast)
        })
        .catch((err) => {
            this.props.onUpdateDownloadState(this.podcast)
            console.warn(err)
        })
    }

    render() {
        const {Buttons, colors} = getStyles(['Buttons', 'colors'], this.props.theme)
        const downloaded = (typeof this.props.downloaded == 'undefined' || 
                            typeof this.props.downloaded['SGP_PODCAST_' + this.podcast.id] == 'undefined') 
                            ? 'NO' 
                            : this.props.downloaded['SGP_PODCAST_' + this.podcast.id]
        return (
            <>
                {
                    downloaded == 'YES' ?
                        (<>
                            <TouchableOpacity style={Buttons.download} onPress={this.removeFile}>
                                <MyIcon name='bin2' size={20} color={colors.highlight} />
                                <Text style={[Buttons.label]}>Remover</Text>
                            </TouchableOpacity>
                        </>) :
                        (this.props.isLoading ?
                            <ActivityIndicator style={Buttons.download} size="small" color={colors.loading} /> :
                            <TouchableOpacity style={Buttons.download} onPress={this.download}>
                                <MyIcon name='cloud_download' size={20} color={colors.text} />
                                <Text style={[Buttons.label]}>Download</Text>
                            </TouchableOpacity>)
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        _podcast: state.podcasts.selected,
        downloaded: state.podcasts.downloaded,
        isLoading: state.downloadQueue.loading,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onNewDownload: podcast => dispatch(newDownload(podcast)),
        onNewDownload: podcast => dispatch(newDownload(podcast)),
        onShowRegister: () => dispatch(showRegister()),
        onUpdateDownloadState: (podcast) => dispatch(updateDownloadState(podcast)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadBtn)