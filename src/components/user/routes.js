
import { Route, } from 'react-router-dom'

import Dashboard from './Dashboard'
import TicketAttente from './TicketAttente'
import TicketResolu from './TicketResolu'
import TicketRelancer from './TicketRelancer'
import CreerTicket from './TicketForm'

const Routes = () => {
    return(
        <>
            <Route exact path="/user/dashboard" component={Dashboard} />
            <Route exact path="/user/ticket-en-attente" component={TicketAttente} />
            <Route exact path="/user/ticket-resolu" component={TicketResolu} />
            <Route exact path="/user/ticket-relancer" component={TicketRelancer} />
            <Route exact path="/user/creer-ticket" component={CreerTicket} />
        </>
    )
}

export default Routes