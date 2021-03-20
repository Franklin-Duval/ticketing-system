
import { Route, } from 'react-router-dom'

import Statistics from './statistics'
import Dashboard from './Dashboard'

const Routes = () => {
    return(
        <>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/statistics" component={Statistics} />
        </>
    )
}

export default Routes