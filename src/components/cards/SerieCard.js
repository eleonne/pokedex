import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadSelectedFeed } from '../../store/actions/feed';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import getStyles from '../../styles';
import { MediaType } from '../../libs/Enums';

class SerieCard extends Component {

    open = () => {
        this.props.onLoadSelectedFeed({
            'type': MediaType.SERIE,
            'id': this.props.item.id,
        })
        this.props.navigation.navigate('Serie', {id: this.props.item.id})
    }

    render() {
        const {AppStyles, SerieCardStyles} = getStyles(['AppStyles', 'SerieCardStyles'], this.props.theme)
        return (
            <TouchableOpacity style={SerieCardStyles.item} onPress={this.open}>
                <Image 
                    source={{ uri: this.props.item.cover }} 
                    style={SerieCardStyles.image}
                    >
                </Image>
                <View style={SerieCardStyles.textContainer}>
                    <Text style={[AppStyles.label, {fontWeight: 'bold'}]}>
                        { this.props.item.title }
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
        onLoadSelectedFeed: obj => dispatch(loadSelectedFeed(obj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieCard)