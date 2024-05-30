import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
} from 'react-native'
import getStyles from '../styles'
import DownloadBtn from "./buttons/Download";
import ShareBtn from "./buttons/Share";

class PodcastActionsBar extends Component {
    render() {
        const {PodcastCardStyles} = getStyles(['PodcastCardStyles'], this.props.theme)
        const title = 'Sem Gravidade Podcast - Pesado nas idéias e leve nas palavras'
        const message = 'Eu escutei o episódio ' + this.props.podcast.title + ' do Sem Gravidade Podcast e gostei demais! https://semgravidade.com/podcast-details/' + this.props.podcast.id

        return (
            <View style={PodcastCardStyles.footerContainer}>
                <View style={PodcastCardStyles.actionsContainer}>
                    <DownloadBtn />
                    <ShareBtn
                        title={title}
                        message={message}
                        url={this.props.podcast.image} />
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

export default connect(mapStateToProps, null)(PodcastActionsBar)