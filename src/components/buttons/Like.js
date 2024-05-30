import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import MyIcon from '../MyIcon'
import getStyles from '../../styles'
import { showRegister } from '../../store/actions/app'
import { likeAction } from "../../store/actions/podcasts";

class LikeBtn extends Component {

    like = () => {
        if (this.props.token)
            this.props.onLike(this.props.media.id, this.props.mediaType, this.props.onBeforeLike, this.props.onAfterLike)
        else
            this.props.onShowRegister()
    }
    
    render() {
        const {Buttons, colors} = getStyles(['Buttons', 'colors'], this.props.theme)
        const liked = (typeof this.props.liked['SGP_'+ this.props.mediaType +'_' + this.props.media.id] == 'undefined') 
                       ? 'NO' 
                       : this.props.liked['SGP_'+ this.props.mediaType +'_' + this.props.media.id]
        const likeColor = (liked == 'YES') ? colors.highlight : colors.text
        const size = (this.props.size) ? this.props.size : 15
        const style = (this.props.style) ? this.props.style : {}
        return (
            <TouchableOpacity style={[Buttons.like, style]} onPress={this.like}>
                {this.props.isLoading ?
                    <ActivityIndicator size="small" color={colors.loading} /> :
                    <MyIcon name='heart' size={size} color={likeColor} />
                }
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        isLoading: state.transient.isLoadingPodcastLike,
        liked: state.podcasts.liked,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowRegister: () => dispatch(showRegister()),
        onLike: (mediaId, mediaType, onBeforeLike, onAfterLike) => dispatch(likeAction(mediaId, mediaType, onBeforeLike, onAfterLike)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeBtn)