import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { 
    NavigationContainer,
} from '@react-navigation/native';
import TabsLayout from './layout/TabsLayout'
import SplashScreen from './screens/SplashScreen'
import PodcastDetailsScreen from './screens/PodcastDetailsScreen'
import CategoryScreen from './screens/CategoryScreen'
import PlayerScreen from './screens/PlayerScreen'
import UpNextScreen from './screens/UpNextScreen'
import ParticipantDetailsScreen from './screens/ParticipantDetailsScreen'
import StoriesScreen from "./screens/StoriesScreen";
import ArticleScreen from "./screens/ArticleScreen";
import SerieScreen from "./screens/SerieScreen";
import VideoPlayer from "./screens/VideoPlayer";
import { Appearance } from 'react-native';
import DownloadedScreen from './screens/DownloadedScreen';
import CommentsScreen from './screens/CommentsScreen'
import CommentDetailsScreen from './screens/CommentDetailsScreen';
import StoriesAdScreen from './screens/StoriesAdScreen';
import AudiodramaDetailsScreen from './screens/AudiodramaDetailsScreen';
import ShortDetailsScreen from './screens/ShortDetailsScreen';
import ShortStoryScreen from './screens/ShortStory';
import InitialScreen from './screens/InitialScreen'
import RegisterScreen from './screens/RegisterScreen'
import configs from './app.config'

export default props => {

    const Stack = createStackNavigator();
    const linking = {
        prefixes: [configs.ServerBaseURL, configs.DeepLink],
        // prefixes: [configs.ServerBaseURL, ServerBaseURL.DeepLink],
    };

    return (
        <Appearance>
            <NavigationContainer linking={linking} >
                <Stack.Navigator headerMode="none">
                    <Stack.Screen 
                        name="Splash" 
                        component={SplashScreen}
                        options={{
                            ...TransitionPresets.DefaultTransition
                        }}
                        />
                    <Stack.Screen name="Home" component={TabsLayout} />
                    <Stack.Screen 
                        name="Initial" 
                        component={InitialScreen}
                        options={{
                            ...TransitionPresets.ModalPresentationIOS
                        }} />
                    <Stack.Screen 
                        name="Register" 
                        component={RegisterScreen} 
                        options={{
                            ...TransitionPresets.ModalPresentationIOS
                        }}
                    />
                    <Stack.Screen 
                        name="PodcastDetails" 
                        component={PodcastDetailsScreen} 
                        options={{
                            ...TransitionPresets.SlideFromRightIOS         
                        }}
                         />
                    <Stack.Screen 
                        name="CategoryScreen" 
                        component={CategoryScreen} 
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                         />
                    <Stack.Screen 
                        name="PlayerScreen" 
                        component={PlayerScreen}
                        options={{
                            ...TransitionPresets.ModalPresentationIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="UpNext" 
                        component={UpNextScreen}
                        options={{
                            ...TransitionPresets.ModalPresentationIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="ParticipantDetail" 
                        component={ParticipantDetailsScreen}
                        options={{
                            ...TransitionPresets.ModalPresentationIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="Story" 
                        component={StoriesScreen}
                        options={{
                            ...TransitionPresets.RevealFromBottomAndroid     
                        }}
                        />
                    <Stack.Screen 
                        name="StoryAd" 
                        component={StoriesAdScreen}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="Article" 
                        component={ArticleScreen}
                        options={{
                            ...TransitionPresets.RevealFromBottomAndroid     
                        }}
                        />
                    <Stack.Screen 
                        name="Serie" 
                        component={SerieScreen}
                        options={{
                            ...TransitionPresets.RevealFromBottomAndroid     
                        }}
                        />
                    <Stack.Screen 
                        name="VideoPlayer" 
                        component={VideoPlayer}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="Downloaded" 
                        component={DownloadedScreen}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="Comments" 
                        component={CommentsScreen}
                        options={{
                            ...TransitionPresets.RevealFromBottomAndroid     
                        }}
                        />
                    <Stack.Screen 
                        name="CommentDetails" 
                        component={CommentDetailsScreen}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="AudiodramaDetails" 
                        component={AudiodramaDetailsScreen}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="ShortDetails" 
                        component={ShortDetailsScreen}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                        />
                    <Stack.Screen 
                        name="ShortStoryScreen" 
                        component={ShortStoryScreen}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS     
                        }}
                        />
                </Stack.Navigator>
            </NavigationContainer>
        </Appearance>
    )
}