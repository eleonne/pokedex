import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text
} from 'react-native'
import MyIcon from '../MyIcon'
import { NavigationContext } from '@react-navigation/native';
import getStyles from '../../styles'
import { connect } from 'react-redux';
import scorePassword from 'react-native-password-strength-meter/src/utils/score-password'

class PasswordInput extends Component {

    static contextType = NavigationContext;

    state = {
        secureTextEntry: false,
        password: ''
    }

    onChange = (value) => {
        this.setState({...this.state, password: value})
        const score = scorePassword(value, 7, 100)
        if (this.props.onChangeText)
            this.props.onChangeText(value, score)
    }

    toggleSecureText = () => {
        this.setState({...this.state, secureTextEntry: !this.state.secureTextEntry})
    }

    render() {
        return (
            <View style={[style.containerWrapper, containerWrapperStyle]}>
                <TextInput
                    style={
                    placeholderVisible
                        ? [style.input, inputStyle, placeholderStyle]
                        : [style.input, inputStyle]}
                    value={this.state.password}
                    onChangeText={this.onChange}
                    secureTextEntry={this.state.secureTextEntry}
                />
                <TouchableOpacity
                    style={[style.imageWrapper, imageWrapperStyle]}
                    onPress={this.toggleSecureText}
                >
                    <Image style={[style.image, imageStyle]} source={image} />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}


export default connect(mapStateToProps)(PasswordInput)