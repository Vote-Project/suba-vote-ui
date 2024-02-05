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
      <CCardBody style={{padding: 20}}>
        <CRow xs={{ cols:2, gutter: 2 }} lg={{ cols: 2, gutter: 3}}>
          <CCol>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              <div className='icon_container' style={{ backgroundColor: COLORS.MAIN, borderRadius: 50 }}>
                <CIcon style={{ color: 'white', fontSize: "100px" }} icon={cilUser} size="xxl" ></CIcon>
              </div>
              <div style={{}}>
                <span className='icon-text' style={{color: "gray", fontWeight: "bold"}}>Organizers</span> <br />
                <span  className='icon-header-text' style={{ fontWeight: 'bold' }}>{organizers}</span>
              </div>
            </div>
          </CCol>
          <CCol >
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              <div className='icon_container' style={{ backgroundColor: COLORS.MAIN, borderRadius: 50 }}>
                <CIcon style={{ color: 'white' }} icon={cilPeople} size="xxl"></CIcon>
              </div>
              <div style={{}}>
                <span className='icon-text' style={{color: "gray", fontWeight: "bold"}}>Voters</span> <br />
                <span className='icon-header-text' style={{ fontWeight: 'bold' }}>{voters}</span>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Counts
