import React, {Component} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MyIcon from '../components/MyIcon'

import getStyles from '../styles'

import LoginStackLayout from './LoginStackLayout'
import Feed from '../screens/Feed'
import PodcastList from '../screens/PodcastListScreen'
import RegisterScreen from '../screens/RegisterScreen'
import DownloadQueueScreen from '../screens/DownloadQueueScreen'
import MiniPlayer from "../components/MiniPlayer";
import SearchScreen from '../screens/SearchScreen';
import { connect } from 'react-redux';
import NotSubscribedScreen from '../screens/NotSubscribedScreen';
import { getDetails } from '../store/actions/podcasts';
import { loadSelectedFeed } from '../store/actions/feed';
import { clearNotification, showNotSubscribed, showRegister } from '../store/actions/app';
import { isContentAvailable } from '../libs/Utils';
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import OriginalsScreen from '../screens/OriginalsScreen';
import { NavigationContext } from '@react-navigation/native';
import { MediaType, MediaTypeRoutes } from '../libs/Enums';

const Tab = createMaterialBottomTabNavigator()
class tabs extends Component {

    static contextType = NavigationContext;

    openSelectedFeed = () => {
        const navigation = this.context;
        if (this.props.notification.type == MediaType.AUDIODRAMA) 
            this.props.onDetails({'id': this.props.notification.id}, MediaType.AUDIODRAMA)
        else {
            this.props.onLoadSelectedFeed({
                'type': this.props.notification.type,
                'id': this.props.notification.id,
            })
        }
        navigation.navigate(MediaTypeRoutes[this.props.notification.type])
    }

    verifyContent = () => {
        if (this.props.user.token) {
            const isAvailable = isContentAvailable(this.props.notification.exclusive, this.props.user.subscription.end_date, this.props.user.token)
            if (isAvailable) {
                this.openSelectedFeed()
            } else
                this.props.onShowNotSubscribed()
        } else 
            this.props.onShowRegister()
    }
    
    open = () => {
        console.log(this.props.notification.type)
        console.log(this.props.notification.id)
        switch (this.props.notification.type) {
            case MediaType.PODCAST:
                this.props.onDetails({'id': this.props.notification.id})
                this.props.navigation.navigate('PodcastDetails')
                break;
            case MediaType.STORY:
            case MediaType.ARTICLE:
            case MediaType.AUDIODRAMA:
                this.verifyContent()
                break;
            case MediaType.SERIE:
            case MediaType.SHORT:
                this.openSelectedFeed()
                break;
            default:
                return
            // case 'AD':
            //     Linking.openURL(this.props.notification.link).catch((err) => console.error('An error occurred', err));
            //     break;
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.notification.id && prevProps.notification.changeDetector != this.props.notification.changeDetector) {
            this.open()
            this.props.onClearNotification()
        }
    }


    render() {
        const {colors, ToastStyle, AppStyles} = getStyles(['colors', 'ToastStyle', 'AppStyles'], this.props.theme)
        const toasConfig = {
            SGP_Toast: (props) => {
                const title = (props.text1.length > 20) ? props.text1.substr(0, 20) + '...' : props.text1
                const body = (props.text2.length > 70) ? props.text2.substr(0, 70) + '...' : props.text2
                return (
                    <TouchableOpacity onPress={props.onPress} style={ToastStyle.container}>
                        <Image style={ToastStyle.image} source={{uri: props.props.image}} />
                        <View style={ToastStyle.textContainer}>
                            <Text style={AppStyles.title}>{title}</Text>
                            <Text style={AppStyles.subtitle}>{body}</Text>
                        </View>    
                    </TouchableOpacity>
                )
            }
        }
        return (<>
            <Tab.Navigator
                initialRouteName="Feed"
                inactiveColor={colors.inactive}
                activeColor={colors.highlight}
                shifting={true}
                labeled={true}
                backBehavior='initialRoute'
                barStyle={{
                    backgroundColor: colors.primary,
                }}
            >
                <Tab.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        tabBarLabel: 'Feed',
                        tabBarIcon: ({ color }) => <MyIcon name='dashboard' color={color} size={20}/>
                    }}
                />
                <Tab.Screen
                    name="PodcastList"
                    component={PodcastList}
                    options={{
                        tabBarLabel: 'Podcast',
                        tabBarIcon: ({ color }) => <MyIcon name='headset' size={20} color={color} />
                    }}
                />
                <Tab.Screen
                    name="Originals"
                    component={OriginalsScreen}
                    options={{
                        tabBarLabel: 'Originais SGP',
                        tabBarIcon: ({ color }) => <MyIcon name='appicon' size={20} color={color} />
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        tabBarLabel: 'Buscar',
                        tabBarIcon: ({ color }) => <MyIcon name='search1' size={20} color={color} />
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={LoginStackLayout}
                    options={{
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color }) => <MyIcon name='astronaut-1' size={20} color={color} />
                    }}
                />
            </Tab.Navigator>
            <MiniPlayer monitoring bottom={49} />
            <RegisterScreen />
            <NotSubscribedScreen />
            <DownloadQueueScreen />
            <Toast config={toasConfig} ref={(ref) => Toast.setRef(ref)} />
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        theme: state.theme.selectedTheme,
        notification: state.app.notification,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadSelectedFeed: obj => dispatch(loadSelectedFeed(obj)),
        onDetails: (podcast, type = MediaType.PODCAST) => dispatch(getDetails(podcast, type)),
        onShowRegister: () => dispatch(showRegister()),
        onShowNotSubscribed: () => dispatch(showNotSubscribed()),
        onClearNotification: () => dispatch(clearNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(tabs)