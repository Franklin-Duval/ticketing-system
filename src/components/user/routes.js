
import { Route, } from 'react-router-dom'

import Dashboard from './Dashboard'
import TicketAttente from './TicketAttente'
import TicketResolu from './TicketResolu'
import TicketRelancer from './TicketRelancer'

const Routes = () => {
    return(
        <>
            <Route exact path="/user/dashboard" component={Dashboard} />
            <Route exact path="/user/ticket-en-attente" component={TicketAttente} />
            <Route exact path="/user/ticket-resolu" component={TicketResolu} />
            <Route exact path="/user/ticket-relancer" component={TicketRelancer} />
        </>
    )
}

export default Routes