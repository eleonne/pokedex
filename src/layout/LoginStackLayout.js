import React, {Component} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import Profile from '../screens/Profile'
import Login from '../screens/Login'

const Stack = createStackNavigator();
class LoginStackLayout extends Component {

    render() {
        const screens = (this.props.user && this.props.user.token) ? (
            <>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </>
        ) : (
            <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            </>
        )
        return (
            <Stack.Navigator>
                {screens}
                <Stack.Screen name="Register" component={Profile} />
            </Stack.Navigator>
        )

    }
}

const mapStateToProps = ({ user }) => {
    return {
        user: user
    }
}

export default connect(mapStateToProps, null)(LoginStackLayout)