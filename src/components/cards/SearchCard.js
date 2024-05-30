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
import { NavigationContext } from '@react-navigation/native';
import { loadSelectedFeed } from '../../store/actions/feed';
import { getDetails } from '../../store/actions/podcasts';
import { formatDateTime, fixURL, translateStatus, getStatusColor, isContentAvailable } from '../../libs/Utils';
import { MediaType, MediaTypeRoutes } from '../../libs/Enums';
import { showNotSubscribed, showRegister } from '../../store/actions/app';
import { loadShortDetails } from '../../store/actions/shorts';

class SearchCard extends Component {

    static contextType = NavigationContext;

    openSelectedFeed = () => {
        const navigation = this.context;
        if (this.props.item.type == MediaType.AUDIODRAMA) 
            this.props.onDetails({'id': this.props.item.id}, 'AUDIODRAMA')
        else if (this.props.item.type == MediaType.SHORT) {
            this.props.onLoadShortDetails(this.props.item.id)
        }
        else {
            this.props.onLoadSelectedFeed({
                'type': this.props.item.type,
                'id': this.props.item.id,
            })
        }
        navigation.navigate(MediaTypeRoutes[this.props.item.type])
    }

    verifyContent = () => {
        if (this.props.user.token) {
            const isAvailable = isContentAvailable(this.props.item.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.openSelectedFeed()
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }

    open = () => {
        switch (this.props.item.type) {
            case MediaType.PODCAST:
                this.props.onDetails({'id': this.props.item.id})
                this.props.navigation.navigate('PodcastDetails')
                break;
            case MediaType.STORY:
            case MediaType.ARTICLE:
            case MediaType.AUDIODRAMA:
                this.verifyContent()
                break;
            case MediaType.SERIE:
            case MediaType.SHORT:
                this.openSelectedFeed()
                break;
            default:
                return
        }
    }

    render() {
        const {AppStyles, SearchCardStyles, colors} = getStyles(['AppStyles', 'SearchCardStyles', 'colors'], this.props.theme)
        const color = getStatusColor(this.props.item.type, colors)
        return (
            <TouchableOpacity style={SearchCardStyles.card} onPress={this.open}>
                <Image style={SearchCardStyles.image} source={{uri: fixURL(this.props.item.cover)}} PlaceholderContent={<ActivityIndicator />} />
                <View style={SearchCardStyles.middleContainer}>
                    <Text numberOfLines={1} style={[AppStyles.label, SearchCardStyles.type, {color: color}]}>{translateStatus(this.props.item.type, colors)}</Text>
                    <Text numberOfLines={1} style={AppStyles.title}>{this.props.item.title}</Text>
                    <Text numberOfLines={1} style={[AppStyles.label, SearchCardStyles.date]}>{formatDateTime(this.props.item.published_on)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: (podcast, type = MediaType.PODCAST) => dispatch(getDetails(podcast, type)),
        onLoadSelectedFeed: obj => dispatch(loadSelectedFeed(obj)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
        onLoadShortDetails: (shortId) => dispatch(loadShortDetails(shortId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCard)