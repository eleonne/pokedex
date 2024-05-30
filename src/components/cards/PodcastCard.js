import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import { Badge } from "react-native-elements";
import getStyles from '../../styles'
import { getDetails } from '../../store/actions/podcasts';

class PodcastCard extends Component {

    details = () => {
        this.props.onDetails(this.props.podcast)
        this.props.navigation.navigate('PodcastDetails')
    }

    render() {
        const {PodcastCardStyles} = getStyles(['PodcastCardStyles'], this.props.theme)
        return (
            <TouchableOpacity onPress={this.details}>
                <View style={PodcastCardStyles.container}>
                    <Image style={PodcastCardStyles.image} source={{uri: this.props.podcast.image}} />
                    {
                        this.props.mediaPlayer.completed['SGP_PODCAST_' + this.props.podcast.id] == 'COMPLETED'? null :
                        <Badge status="primary" containerStyle={PodcastCardStyles.badge} />
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
        user: state.user,
        mediaPlayer: state.mediaPlayer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: podcast => dispatch(getDetails(podcast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastCard)