import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { Image } from 'react-native-elements';
import getStyles from '../../styles'
import { NavigationContext } from '@react-navigation/native';
import { loadSelectedFeed } from '../../store/actions/feed';
import { formatDateTime } from '../../libs/Utils';
import MyIcon from '../MyIcon';
import { isContentAvailable } from '../../libs/Utils';
import { showNotSubscribed, showRegister } from '../../store/actions/app';
import { MediaType } from '../../libs/Enums';

class ArticleVerticalCard extends Component {

    static contextType = NavigationContext;

    details = () => {
        if (this.props.user.token) {
            const isAvailable = isContentAvailable(this.props.item.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.props.onLoadSelectedFeed({
                    'type': MediaType.ARTICLE,
                    'id': this.props.item.id,
                })
                this.props.navigation.navigate('Article')
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }

    render() {
        const {AppStyles, ArticleVerticalStyles, colors} = getStyles(['AppStyles', 'ArticleVerticalStyles', 'colors'], this.props.theme)
        const lock = {}
        if (this.props.item.exclusive) {
            const isAvailable = isContentAvailable(this.props.item.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                lock.icon = 'eye'
                lock.color = colors.text
            } else {
                lock.icon = 'eye-blocked'
                lock.color = colors.text
            }
        }
        return (
            <TouchableOpacity style={ArticleVerticalStyles.card} onLongPress={this.props.onLongPress} onPress={this.details}>
                <Image style={ArticleVerticalStyles.image} source={{uri: this.props.item.cover}} PlaceholderContent={<ActivityIndicator />} />
                {
                    this.props.item.exclusive == 1 ?
                        <View style={ArticleVerticalStyles.lockContainer}>
                            <MyIcon size={15} color={lock.color} name={lock.icon} /> 
                        </View> : null
                }
                <View style={ArticleVerticalStyles.middleContainer}>
                    <Text numberOfLines={1} style={AppStyles.title}>{this.props.item.title}</Text>
                    <Text numberOfLines={1} style={[AppStyles.label, ArticleVerticalStyles.date]}>{formatDateTime(this.props.item.timestamp)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadSelectedFeed: obj => dispatch(loadSelectedFeed(obj)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleVerticalCard)