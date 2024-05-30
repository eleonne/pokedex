import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    TouchableOpacity,
    Share,
    ActivityIndicator,
} from 'react-native'
import MyIcon from '../MyIcon'
import getStyles from '../../styles'
import axios from 'axios'
import { share } from '../../store/actions/app'

class ShareBtn extends Component {

    share = async () => {
        this.props.onShare({
            title: this.props.title,
            message: this.props.message,
            url: this.props.url
        })
    };

    render() {
        const {Buttons, colors} = getStyles(['Buttons', 'colors'], this.props.theme)
        return <>
            {
                this.props.isLoading ?
                    <ActivityIndicator style={Buttons.download} size="small" color={colors.loading} /> :
                    <TouchableOpacity style={Buttons.share} onPress={this.share}>
                        <MyIcon name='share2' size={20} color={colors.text} />
                        <Text style={[Buttons.label]}>Compartilhar</Text>
                    </TouchableOpacity>
            }
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        podcast: state.podcasts.selected,
        theme: state.theme.selectedTheme,
        isLoading: state.transient.isLoadingShare
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShare: (shared) => dispatch(share(shared)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareBtn)