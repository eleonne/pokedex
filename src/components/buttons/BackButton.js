import React, { Component } from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import MyIcon from '../MyIcon'
import { NavigationContext } from '@react-navigation/native';
import getStyles from '../../styles'
import { connect } from 'react-redux';

const RIGHT = 5
const LEFT = 5
const TOP = 5
const BOTTOM = 5

class BackButton extends Component {

    static contextType = NavigationContext;

    goBack = () => {
        const navigation = this.context
        navigation.goBack(null);
    }

    render() {
        const {Buttons, colors} = getStyles(['Buttons', 'colors'], this.props.theme)
        var icon = 'arrow-left2'
        var size = 20
        const style = (this.props.style) ? this.props.style : {}
        var direction = {}
        if (this.props.left) {
            direction.left = (this.props.left === true) ? LEFT : this.props.left
        } else if (this.props.right) {
            direction.right = (this.props.right === true) ? RIGHT : this.props.right
        } else
            direction.left = LEFT
        if (this.props.bottom) {
            direction.bottom = (this.props.bottom === true) ? BOTTOM : this.props.bottom
        } else if (this.props.top) {
            direction.top = (this.props.top === true) ? TOP : this.props.top
        } else
        direction.top = TOP

        if (this.props.downArrow) {
            icon = 'circle-down'
            size = 25
        } else if (this.props.close) {
            icon = 'clear'
            size = 25
        }
        return (
            <TouchableOpacity style={[Buttons.backButton, direction, style]} onPress={this.goBack}>
                <MyIcon name={icon}  size={size} color={colors.text} />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}


export default connect(mapStateToProps)(BackButton)