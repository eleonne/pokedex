import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
} from 'react-native'
import getStyles from '../../styles'
import { getDetails } from '../../store/actions/podcasts';

class PodcastCardVertical extends Component {

    details = () => {
        this.props.onDetails(this.props.podcast)
        this.props.navigation.navigate('PodcastDetails')
    }

    render() {
        const {PodcastCardVerticalStyles} = getStyles(['PodcastCardVerticalStyles'], this.props.theme)
        return (
            <View style={[PodcastCardVerticalStyles.container]}>
                <Text style={PodcastCardVerticalStyles.title}>{this.props.podcast.title}</Text>
                <TouchableOpacity onPress={this.details} >
                    <ImageBackground 
                        style={PodcastCardVerticalStyles.imageContainer} 
                        imageStyle={PodcastCardVerticalStyles.image}
                        source={{uri: this.props.podcast.image}} >
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: podcast => dispatch(getDetails(podcast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastCardVertical)