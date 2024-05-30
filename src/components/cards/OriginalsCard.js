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
import { NavigationContext } from '@react-navigation/core';
import { isContentAvailable } from '../../libs/Utils';
import { MediaType, MediaTypeRoutes } from '../../libs/Enums';
import { showNotSubscribed, showRegister } from '../../store/actions/app';
import { loadShortDetails } from '../../store/actions/shorts';

class OriginalsCard extends Component {

    static contextType = NavigationContext;

    openContent = () => {
        const navigation = this.context;
        switch (this.props.original.mediaType) {
            case MediaType.AUDIODRAMA:
                this.props.onDetails({'id': this.props.original.id}, MediaType.AUDIODRAMA)
                break;
            default:
                return
        }
        navigation.navigate(MediaTypeRoutes[MediaType.AUDIODRAMA])
    }

    verifyContent = () => {
        if (this.props.original.mediaType === MediaType.SHORT){
            const navigation = this.context;
            this.props.onLoadShortDetails(this.props.original.id)
            navigation.navigate(MediaTypeRoutes[MediaType.SHORT])
            return
        }

        if (this.props.user.token) { 
            const isAvailable = isContentAvailable(this.props.original.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.openContent()
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }

    render() {
        const {OriginalsCardStyles} = getStyles(['OriginalsCardStyles'], this.props.theme)
        return (
            <TouchableOpacity onPress={this.verifyContent}>
                <View style={OriginalsCardStyles.container}>
                    <Image style={OriginalsCardStyles.image} source={{uri: this.props.original.cover}} />
                    {
                        this.props.mediaPlayer.completed['SGP_'+ this.props.original.mediaType +'_' + this.props.original.id] == 'COMPLETED'? null :
                        <Badge status="primary" containerStyle={OriginalsCardStyles.badge} />
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
        onDetails: (podcast, mediaType) => dispatch(getDetails(podcast, mediaType)),
        onLoadShortDetails: (shortId) => dispatch(loadShortDetails(shortId)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginalsCard)

