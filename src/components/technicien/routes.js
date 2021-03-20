
import { Route, } from 'react-router-dom'

import Dashboard from './Dashboard'

const Routes = () => {
    return(
        <>
            <Route exact path="/technicien/dashboard" component={Dashboard} />
        </>
    )
}

export default Routes