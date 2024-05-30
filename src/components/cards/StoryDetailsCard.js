import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ImageBackground,
    Text,
} from 'react-native'
import { ParallaxImage } from 'react-native-snap-carousel';
import getStyles from '../../styles';
import { ApplyStoryTemplate } from "../../components/HTMLTemplates";
import { MediaType } from '../../libs/Enums';

class StoryDetailsCard extends Component {

    render() {
        const {StoryDetailsCardStyles, colors} = getStyles(['StoryDetailsCardStyles', 'colors'], this.props.theme)
        const content = ApplyStoryTemplate(this.props.story.content, colors)
        return (
            <View style={StoryDetailsCardStyles.item}>
                {
                    this.props.story.type == MediaType.STORY ?
                        <>
                            <ImageBackground 
                                blurRadius={5} 
                                source={{ uri: this.props.story.cover }} 
                                style={StoryDetailsCardStyles.imageUnderContainer}
                                imageStyle={StoryDetailsCardStyles.imageUnder}
                                >
                                <ParallaxImage
                                    source={{ uri: this.props.story.cover }}
                                    containerStyle={StoryDetailsCardStyles.imageContainer}
                                    style={StoryDetailsCardStyles.image}
                                    parallaxFactor={0.4}
                                    {...this.props.parallaxProps}
                                    /> 
                            </ImageBackground>
                            <Text style={StoryDetailsCardStyles.content}>{this.props.story.content}</Text>
                        </>
                        : <Text style={StoryDetailsCardStyles.content}>{this.props.story.content}</Text>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}

export default connect(mapStateToProps)(StoryDetailsCard)