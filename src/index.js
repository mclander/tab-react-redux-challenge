import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import objectAssign from 'object-assign'
require('styled-components') 
require('bootstrap/dist/css/bootstrap.css')


// #TODO move it to venor.js
if (Object && !Object.assign) Object.assign = objectAssign

// добавляем "в косноль" lodash (можно только для dev  версии)
// window._ = require('lodash')


ReactDOM.render( < App / > , document.getElementById('root'))