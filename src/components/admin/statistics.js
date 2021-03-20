import React, { Component } from 'react'
import Sidebar from './SidebarAdmin'

export default class Statistics extends Component {
    render() {
        return (
            <div>
                <Sidebar clicked="statistic"/>
            </div>
        )
    }
}

