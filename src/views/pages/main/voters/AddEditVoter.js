import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import React from 'react'

function AddEditVoter() {
  return (
    <CCard className="mb-4">
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>Voter Configaration</h5>
      </CCardHeader>
      <CCardBody></CCardBody>
    </CCard>
  )
}

export default AddEditVoter
