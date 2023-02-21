import React from 'react'
import { Container } from 'react-bootstrap'
import PageTitle from '../../Header/PageTitle'
import AllInvoiceDetails from './AllInvoiceDetails'


const MainInvoiceDetails = () => {
   return (
      <PageTitle title="Invoice Management Page...">
         <Container>
            <AllInvoiceDetails />
         </Container>
      </PageTitle>
   )
}




export default MainInvoiceDetails;