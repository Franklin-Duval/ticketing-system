
import { Route, } from 'react-router-dom'

import Dashboard from './Dashboard'

const Routes = () => {
    return(
        <>
            <Route exact path="/user/dashboard" component={Dashboard} />
        </>
    )
}

export default Routes