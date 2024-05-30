import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    TouchableOpacity,
    Text,
    View,
    ImageBackground,
} from 'react-native'
import PodcastPlayButton from "./PodcastPlayButton";
import PodcastActionsBar from "./PodcastHeaderActionsBar";
import getStyles from '../styles'
import { getDetails, getHeader } from '../store/actions/podcasts';
import MyLoader from "./MyLoader";
import MyIcon from "./MyIcon";
import { PodcastListHeaderBone, } from "./Bones";
import ParticipantsBar from '../components/ParticipantsBar';
import { marathonOn, marathonOff } from "../store/actions/mediaPlayer";
import { MediaType } from '../libs/Enums';

class Header extends Component {
    marathon = () => {
        if (this.props.isMarathoning)
            this.props.onMarathonOff()
        else
            this.props.onMarathonOn()
    }

    details = () => {
        this.props.onGetDetails(this.props.header)
        this.props.navigation.navigate('PodcastDetails')
    }

    componentDidMount = () => {
        this.props.onGetHeader()
    }

    render () {
        const {AppStyles, colors, HeaderStyles} = getStyles(['AppStyles', 'colors', 'HeaderStyles'], this.props.theme)
        const btnMarathoningStyle = (this.props.isMarathoning) ? AppStyles.successButton : AppStyles.highlightButton
        const btnMarathoningTxt = (this.props.isMarathoning) ? 'Maratonando' : 'Maratonar!'
        const btnMarathoningIcon = (this.props.isMarathoning) ? 'directions_run' : 'toys'
        return (
            <View style={[HeaderStyles.container]}>
                <MyLoader
                    containerStyle={HeaderStyles.skeletonContainer}
                    isLoading={this.props.isLoading}
                    layout={PodcastListHeaderBone}
                    >
                    <ImageBackground blurRadius={5} style={HeaderStyles.imageBlur} source={{uri: this.props.header.image}} >
                        <TouchableOpacity onPress={this.details} >
                            <ImageBackground 
                                style={HeaderStyles.imageContainer} 
                                imageStyle={HeaderStyles.image}
                                source={{uri: this.props.header.image}} >
                                <PodcastPlayButton />
                            </ImageBackground>
                        </TouchableOpacity>
                        <ParticipantsBar media={this.props.header} mediaType={MediaType.PODCAST}/>
                    </ImageBackground>
                    <PodcastActionsBar podcast={this.props.header} navigation={this.props.navigation}/>
                    <TouchableOpacity 
                        onPress={this.marathon} 
                        style={[AppStyles.row, btnMarathoningStyle]}>
                            <MyIcon name={btnMarathoningIcon} size={20} color={colors.text} />
                            <Text style={AppStyles.highlightButtonText}>{btnMarathoningTxt}</Text>
                            <MyIcon name={btnMarathoningIcon} size={20} color={colors.text} />
                    </TouchableOpacity>
                </MyLoader>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        header: state.podcasts.header,
        isLoading: state.transient.isLoadingPodcastHeader,
        isMarathoning: state.mediaPlayer.marathoning,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetHeader: () => dispatch(getHeader()),
        onGetDetails: podcast => dispatch(getDetails(podcast)),
        onMarathonOn: () => dispatch(marathonOn()),
        onMarathonOff: () => dispatch(marathonOff()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)