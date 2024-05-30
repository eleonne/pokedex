import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import MyIcon from "./MyIcon";
import getStyles from '../styles'
import PodcastCard from '../components/cards/PodcastCard'
import { loadPodcastsByCategory } from "../store/actions/podcasts";

class CategoryList extends Component {

    showCategoryEpisodeList = () => {
        this.props.onLoadPodcastsByCategory(this.props.category_id)
        this.props.navigation.navigate('CategoryScreen', {
            name: this.props.name,
            id: this.props.category_id
        })
    }

    render() {
        const {CategoryListStyles, colors} = getStyles(['CategoryListStyles', 'colors'], this.props.theme)
        return (
            <View style={[CategoryListStyles.container]}>
                <TouchableOpacity style={CategoryListStyles.titleContainer} onPress={this.showCategoryEpisodeList}>
                    <MyIcon name='play3' color={colors.highlight} size={10} />
                    <Text style={[CategoryListStyles.title]}>{this.props.name.toUpperCase()}</Text>
                </TouchableOpacity>
                <FlatList 
                    horizontal={true}
                    style={CategoryListStyles.flatList}
                    data={this.props.items}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <PodcastCard navigation={this.props.navigation} key={item.id} podcast={item} />}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPodcastsByCategory: (categoryId) => dispatch(loadPodcastsByCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)