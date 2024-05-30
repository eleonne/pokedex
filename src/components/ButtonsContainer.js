import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import { connect } from 'react-redux';
import FloatingAddNext from '../components/buttons/FloatingAddNext'
import FloatingComments from '../components/buttons/FloatingComments'
import Like from '../components/buttons/Like';
import { MediaType } from '../libs/Enums';
import getStyles from '../styles'

class ButtonsContainer extends Component {

    render () {
        const {Buttons} = getStyles(['Buttons'], this.props.theme)
        return (
            <View style={Buttons.buttonsContainer}>
                <FloatingComments size={15} media={this.props.podcast} mediaType={MediaType.PODCAST}/>
                <FloatingAddNext size={20} podcast={this.props.podcast}/>
                <Like size={20} style={Buttons.like} podcast={this.props.podcast}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}


export default connect(mapStateToProps)(ButtonsContainer)