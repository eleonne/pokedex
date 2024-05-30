import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDetails } from '../../store/actions/podcasts';
import { loadSelectedFeed } from '../../store/actions/feed';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import { getStatusColor, translateStatus } from '../../libs/Utils';
import getStyles from '../../styles';
import { NavigationContext } from '@react-navigation/core';
import { MediaType } from '../../libs/Enums';

class ExclusiveCard extends Component {

    static contextType = NavigationContext;

    open = () => {
        const navigation = this.context;
        switch (this.props.item.type) {
            case MediaType.PODCAST:
                this.props.onDetails({'id': this.props.item.id})
                navigation.navigate('PodcastDetails')
                break;
            case MediaType.STORY:
                this.props.onLoadSelectedFeed({
                    'type': this.props.item.type,
                    'id': this.props.item.id,
                })
                navigation.navigate('Story')
                break;
            case MediaType.ARTICLE:
                this.props.onLoadSelectedFeed({
                    'type': this.props.item.type,
                    'id': this.props.item.id,
                })
                navigation.navigate('Article')
                break;
            case MediaType.SERIE:
                this.props.onLoadSelectedFeed({
                    'type': this.props.item.type,
                    'id': this.props.item.id,
                })
                navigation.navigate('Serie')
                break;
            default:
                return
        }
    }

    render() {
        const {AppStyles, ExclusiveCardStyles, colors} = getStyles(['AppStyles', 'ExclusiveCardStyles', 'colors'], this.props.theme)
        return (
            <TouchableOpacity style={ExclusiveCardStyles.item} onPress={this.open}>
                <Image 
                    source={{ uri: this.props.item.cover }} 
                    style={ExclusiveCardStyles.image}
                    >
                </Image>
                <View style={[ExclusiveCardStyles.textContainer, {borderStartColor: getStatusColor(this.props.item.type, colors)}]}>
                    <Text style={[AppStyles.label, {color: getStatusColor(this.props.item.type, colors), fontWeight: 'bold'}]}>
                        { translateStatus(this.props.item.type, colors) }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDetails: podcast => dispatch(getDetails(podcast)),
        onLoadSelectedFeed: obj => dispatch(loadSelectedFeed(obj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExclusiveCard)