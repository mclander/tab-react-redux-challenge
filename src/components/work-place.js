import React, { Component } from 'react'
// import * as _ from 'lodash'
import TabContainer from './tab-container'
import * as customStyle from 'react-tabtab/lib/themes/bootstrap'

export default class WorkPlace extends Component {
    render () {
        return (
            <div className="container">
                <TabContainer 
                    customStyle={customStyle} 
                    articleId={this.props.match.params.article}
                    history={this.props.history} 
                />
            </div>
        )
    }
}
