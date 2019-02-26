import React, { Component } from 'react'
import * as _ from 'lodash'
import Complicated from './Complicated'
import * as customStyle from 'react-tabtab/lib/themes/bootstrap';
export default class WorkPlace extends Component {
    render () {
        return (
            <div className="container">
               Workplace  {_.get(this.props.match, 'params.article')}
               <Complicated customStyle={customStyle} />
            </div>
        )
    }
}
