import React, { Component } from 'react';
import {connect} from 'react-redux'
import getStyles from '../styles'
    
class ShortOptionCard extends Component {
    
    render() {
        const {AppStyles, } = getStyles(['AppStyles', ], this.props.theme)
        return <div />
    }
    
}
    
const mapStateToProps = state => {
    return {
        theme: state.theme.selectedTheme
    }
}
    
export default connect(mapStateToProps)(ShortOptionCard)