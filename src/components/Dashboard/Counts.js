import { cilPeople, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { COLORS } from 'src/common/const'
import { OrganizersService } from 'src/services/organizers.service'
import { votersService } from 'src/services/voters.service'

function Counts() {

    const [organizers, setOrganizers] = useState(0)
    const [voters, setVoters] = useState(0)

    useEffect(() => {
   
      OrganizersService.getOrganizers(0, 0).then((res) => {
        setOrganizers(res.meta.pagination.total)
      })

      votersService.getVoters(0,0).then((res) => {
        setVoters(res.meta.pagination.total)
      })
    }, [])
    
  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol md={6}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              <div style={{ backgroundColor: COLORS.MAIN, padding: 20, borderRadius: 50 }}>
                <CIcon style={{ color: 'white', fontSize: "100px" }} icon={cilUser} size="3xl" ></CIcon>
              </div>
              <div style={{}}>
                <span style={{color: "gray", fontWeight: "bold"}}>Organizers</span> <br />
                <span style={{ fontSize: '3em', fontWeight: 'bold' }}>{organizers}</span>
              </div>
            </div>
          </CCol>
          <CCol md={6}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              <div style={{ backgroundColor: COLORS.MAIN, padding: 20, borderRadius: 50 }}>
                <CIcon style={{ color: 'white' }} icon={cilPeople} size="3xl"></CIcon>
              </div>
              <div style={{}}>
                <span style={{color: "gray", fontWeight: "bold"}}>Voters</span> <br />
                <span style={{ fontSize: '3em', fontWeight: 'bold' }}>{voters}</span>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Counts
