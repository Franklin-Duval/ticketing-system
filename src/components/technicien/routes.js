
import { Route, } from 'react-router-dom'

import Dashboard from './Dashboard'
import TicketAttente from './TicketAttente'
import TicketResolu from './TicketResolu'
import TicketRelancer from './TicketRelancer'

const Routes = () => {
    return(
        <>
            <Route exact path="/technicien/dashboard" component={Dashboard} />
            <Route exact path="/technicien/ticket-en-attente" component={TicketAttente} />
            <Route exact path="/technicien/ticket-resolu" component={TicketResolu} />
            <Route exact path="/technicien/ticket-relancer" component={TicketRelancer} />
        </>
    )
}

export default Routes