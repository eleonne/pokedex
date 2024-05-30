import React from 'react'
import { connect } from 'react-redux'
import getStyles from '../styles'
import SkeletonContent from '../libs/SkeletonContent/SkeletonContent'

const MyLoader = props => {

    const {colors} = getStyles(['colors'], props.theme)
    return <SkeletonContent
        containerStyle={props.containerStyle}
        isLoading={props.isLoading}
        boneColor={colors.bones}
        highlightColor={colors.bonesHighlight}
        animationType="shiver"
        animationDirection="diagonalDownRight"
        layout={props.layout}
        >
            {props.children}
    </SkeletonContent>
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.selectedTheme,
    }
}

export default connect(mapStateToProps)(MyLoader)