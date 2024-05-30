import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    TouchableOpacity,
    Text,
    View,
    ImageBackground,
} from 'react-native'
import getStyles from '../styles'
import { getDetails, } from '../store/actions/podcasts';
import MyLoader from "./MyLoader";
import { PodcastListHeaderBone, } from "./Bones";
import ParticipantsBar from '../components/ParticipantsBar';
import { MediaType, MediaTypeRoutes } from '../libs/Enums';
import { showNotSubscribed, showRegister } from '../store/actions/app';
import { isContentAvailable } from '../libs/Utils';
import { NavigationContext } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";

class HeaderOriginals extends Component {

    static contextType = NavigationContext;

    verifyContent = () => {
        const navigation = this.context;
        if (this.props.user.token) {
            const isAvailable = isContentAvailable(this.props.original.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.props.onDetails({'id': this.props.original.id}, MediaType.AUDIODRAMA)
                navigation.navigate(MediaTypeRoutes[MediaType.AUDIODRAMA])
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }

    render () {
        const {HeaderOriginalsStyles} = getStyles(['HeaderOriginalsStyles'], this.props.theme)
        return (
            <View style={[HeaderOriginalsStyles.container]}>
                <MyLoader
                    containerStyle={HeaderOriginalsStyles.skeletonContainer}
                    isLoading={this.props.isLoading}
                    layout={PodcastListHeaderBone}
                    >
                    <ImageBackground blurRadius={5} style={HeaderOriginalsStyles.imageBlur} source={{uri: this.props.original.cover}} >
                        <TouchableOpacity onPress={this.verifyContent} >
                            <ImageBackground 
                                style={HeaderOriginalsStyles.imageContainer} 
                                imageStyle={HeaderOriginalsStyles.image}
                                source={{uri: this.props.original.cover}} >
                                    
                            </ImageBackground>
                        </TouchableOpacity>
                        <ParticipantsBar media={this.props.original} mediaType={MediaType.AUDIODRAMA}/>
                    </ImageBackground>
                </MyLoader>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        original: state.originals.header,
        isLoading: state.transient.isLoadingOriginals,
        theme: state.theme.selectedTheme,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: (podcast, type = MediaType.PODCAST) => dispatch(getDetails(podcast, type)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderOriginals)