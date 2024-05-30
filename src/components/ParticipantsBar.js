import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import getStyles from '../styles'
import config from "../app.config";
import { showParticipantDetail } from "../store/actions/transient";
import { loadParticipant, loadParticipantsForMedia } from "../store/actions/participant";
import { NavigationContext } from '@react-navigation/native'
import MyLoader from './MyLoader';
import { ParticipantsBarBones } from './Bones';
import FloatingComments from './buttons/FloatingComments';
import FloatingAddNext from './buttons/FloatingAddNext';
import Like from './buttons/Like';
import { MediaType } from '../libs/Enums';

class ParticipantsBar extends Component {

    static contextType = NavigationContext;

    componentDidMount () {
        this.props.onLoadParticipantsForMedia(this.props.media, this.props.mediaType)
    }

    openParticipant = (participant) => {
        switch (this.props.mediaType) {
            case MediaType.PODCAST:
                const navigation = this.context;
                this.props.onLoadParticipant(participant)
                this.props.onShowParticipantDetail()
                navigation.navigate('ParticipantDetail')
            default:
                return
        }
    }

    render () {
        const {ParticipantsBarStyles, Buttons} = getStyles(['ParticipantsBarStyles', 'Buttons'], this.props.theme)
        const width = (this.props.mediaType == MediaType.PODCAST) ? 115 : 80
        return (
            <View style={ParticipantsBarStyles.participantsContainer}>
                <MyLoader
                    isLoading={this.props.isLoading}
                    layout={ParticipantsBarBones}
                    containerStyle={ParticipantsBarStyles.participantsSubContainer}
                    >
                    <View style={ParticipantsBarStyles.participantsSubContainer}>
                        {
                            this.props.mediaType == MediaType.ARTICLE ? null :
                                <FlatList 
                                    horizontal={true}
                                    data={this.props.participants}
                                    keyExtractor={item => `${item.id}`}
                                    renderItem={({ item }) => {
                                        const img = (item.avatar) ? item.avatar : config.defaultParticipantAvatar
                                        switch (this.props.mediaType) {
                                            case MediaType.PODCAST:
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => this.openParticipant(item)}>
                                                        <Image 
                                                            key={item.id} {...item}
                                                            source={{uri: img}} 
                                                            style={ParticipantsBarStyles.participant} />
                                                    </TouchableOpacity>
                                                )
                                            case MediaType.STORY:
                                                return null
                                            default:
                                                return (
                                                    <Image 
                                                        key={item.id} {...item}
                                                        source={{uri: img}} 
                                                        style={ParticipantsBarStyles.participant} />
                                                )
                                        }
                                    }}
                                />
                        }
                    </View>
                </MyLoader>
                <View style={[Buttons.buttonsContainer, {width: width}]}>
                    <FloatingComments 
                        size={15} 
                        media={this.props.media} 
                        mediaType={this.props.mediaType}
                        onOpen={this.props.onOpenComments}
                        onClose={this.props.onCloseComments}
                        />
                    {
                        this.props.mediaType == MediaType.PODCAST ?
                            <FloatingAddNext size={20} podcast={this.props.media} mediaType={this.props.mediaType}/>
                            : null
                    }
                    <Like 
                        size={20} 
                        style={Buttons.like} 
                        media={this.props.media} 
                        mediaType={this.props.mediaType}
                        onBeforeLike={this.props.onBeforeLike}
                        onAfterLike={this.props.onAfterLike}
                        />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        theme: state.theme.selectedTheme,
        isLoading: state.transient.isLoadingParticipantsForMedia,
        participants: state.participants.list,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowParticipantDetail: () => dispatch(showParticipantDetail()),
        onLoadParticipant: (participant) => dispatch(loadParticipant(participant)),
        onLoadParticipantsForMedia: (media, mediaType) => dispatch(loadParticipantsForMedia(media, mediaType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsBar)