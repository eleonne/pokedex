import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    Linking,
} from 'react-native'
import { ParallaxImage } from 'react-native-snap-carousel';
import { getStatusColor, isContentAvailable, translateStatus } from '../../libs/Utils';
import getStyles from '../../styles';
import { NavigationContext } from '@react-navigation/core';
import { Image } from 'react-native-elements';
import MyIcon from '../MyIcon';
import { getDetails } from '../../store/actions/podcasts';
import { loadSelectedFeed } from '../../store/actions/feed';
import { showNotSubscribed, showRegister } from '../../store/actions/app';
import { MediaType, MediaTypeRoutes } from '../../libs/Enums';
import { loadShortDetails } from '../../store/actions/shorts';

class HighlightCard extends Component {

    static contextType = NavigationContext;

    verifyContent = (mediaType) => {
        const navigation = this.context;

        if (this.props.user.token) {
            const isAvailable = isContentAvailable(this.props.item.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.props.onLoadSelectedFeed({
                    'type': this.props.item.type,
                    'id': this.props.item.id,
                })
                navigation.navigate(MediaTypeRoutes[mediaType])
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }

    open = () => {
        const navigation = this.context;
        switch (this.props.item.type) {
            case MediaType.PODCAST:
                this.props.onDetails({'id': this.props.item.id})
                navigation.navigate('PodcastDetails')
                break;
            case MediaType.STORY:
            case MediaType.ARTICLE:
                this.verifyContent(this.props.item.type)
                break;
            case MediaType.SERIE:
                if (this.props.user.token) {
                    this.props.onLoadSelectedFeed({
                        'type': this.props.item.type,
                        'id': this.props.item.id,
                    })
                    navigation.navigate('Serie')
                } else 
                    this.props.onShowRegister()
                break;
            case MediaType.SHORT:
                this.props.onLoadShortDetails(this.props.item.id)
                navigation.navigate(MediaTypeRoutes[MediaType.SHORT])
                break;
            case MediaType.AD:
                Linking.openURL(this.props.item.link).catch((err) => console.error('Ocorreu um erro abrindo este link', err));
                break;
            default:
                return
        }
    }

    render() {
        const {AppStyles, colors, HighlightCardStyles} = getStyles(['AppStyles', 'colors', 'HighlightCardStyles'], this.props.theme)
        const lock = {}
        if (this.props.item.exclusive) {
            const isAvailable = isContentAvailable(this.props.item.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                lock.icon = 'eye'
                lock.color = colors.text
            } else {
                lock.icon = 'eye-blocked'
                lock.color = colors.text
            }
        }
        return (
            <TouchableOpacity style={HighlightCardStyles.item} onPress={this.open}>
                <ImageBackground 
                    blurRadius={5} 
                    source={{ uri: this.props.item.cover }} 
                    style={HighlightCardStyles.imageUnderContainer}
                    imageStyle={HighlightCardStyles.imageUnder}
                    >
                    {
                        this.props.parallaxProps ?
                            <ParallaxImage
                                source={{ uri: this.props.item.cover }}
                                containerStyle={HighlightCardStyles.imageContainer}
                                style={HighlightCardStyles.image}
                                parallaxFactor={0.4}
                                {...this.props.parallaxProps}
                                /> :
                            <Image
                                source={{ uri: this.props.item.cover }}
                                containerStyle={HighlightCardStyles.imageContainer}
                                style={HighlightCardStyles.image}
                                parallaxFactor={0.4}
                                {...this.props.parallaxProps}
                                />
                    }

                </ImageBackground>
                {
                    this.props.item.type != MediaType.AD && this.props.item.type != MediaType.STORY ?
                        <View style={[HighlightCardStyles.textContainer, {borderStartColor: getStatusColor(this.props.item.type, colors)}]}>
                            <Text style={[AppStyles.label, {color: getStatusColor(this.props.item.type, colors), fontWeight: 'bold'}]} numberOfLines={2}>
                                { translateStatus(this.props.item.type, colors) }
                            </Text>
                            <Text style={[AppStyles.title, {textAlign: 'center', fontSize: 20, fontWeight: 'bold'}]} numberOfLines={2}>
                                { this.props.item.title }
                            </Text>
                            {
                                this.props.item.exclusive == 1 ?
                                    <View style={AppStyles.lockContainer}>
                                        <MyIcon size={15} color={lock.color} name={lock.icon} /> 
                                    </View> : null
                            }
                        </View> : null
                }
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mediaPlayer: state.mediaPlayer,
        theme: state.theme.selectedTheme,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: podcast => dispatch(getDetails(podcast)),
        onLoadSelectedFeed: obj => dispatch(loadSelectedFeed(obj)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
        onLoadShortDetails: (shortId) => dispatch(loadShortDetails(shortId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightCard)