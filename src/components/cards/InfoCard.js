import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import { connect } from 'react-redux';
import getStyles from '../../styles'
import MyIcon from '../MyIcon'

class InfoCard extends Component {

    render() {
        const {AppStyles, InfoCardStyles, colors} = getStyles(['AppStyles', 'InfoCardStyles', 'colors'], this.props.theme)
        const onPress = (this.props.onPress) ? this.props.onPress : () => {}
        return (
            <View style={InfoCardStyles.container}>
                <TouchableOpacity onPress={onPress} >
                    <View style={InfoCardStyles.leftIconContainer}>
                        {
                            this.props.icon ? this.props.icon : null
                        }
                        <Text style={[AppStyles.title, {marginLeft: 5,}]}>{this.props.title}</Text>
                    </View>
                    <Text style={AppStyles.subtitle}>{this.props.subtitle}</Text>
                    <View style={InfoCardStyles.rightArrow}>
                        <MyIcon name='keyboard_arrow_right' color={colors.text} size={25} />
                    </View>
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

export default connect(mapStateToProps)(InfoCard)