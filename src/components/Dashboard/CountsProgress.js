import { cilPeople, cilUser, cilUserFemale } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { COLORS } from 'src/common/const'
import { OrganizersService } from 'src/services/organizers.service'
import { votersService } from 'src/services/voters.service'

function CountsProgress() {
  const [organizers, setOrganizers] = useState(0)
  const [orgMales, setOrgMales] = useState(0)
  const [orgMalesCount, setOrgMalesCount] = useState(0)
  const [orgFemales, setOrgFemales] = useState(0)
  const [orgFemalesCount, setOrgFemalesCount] = useState(0)
  const [votMalesCount, setVotMalesCount] = useState(0)
  const [votFemalesCount, setVotFemalesCount] = useState(0)
  const [votMales, setVotMales] = useState(0)
  const [votFemales, setVotFemales] = useState(0)
  const [voters, setVoters] = useState(0)
  

  useEffect(() => {
    OrganizersService.getOrganizers(0, 0).then((res) => {
      setOrganizers(res.meta.pagination.total)
    })

    votersService.getVoters(0, 0).then((res) => {
      setVoters(res.meta.pagination.total)
    })
  }, [])

  useEffect(() => {
    OrganizersService.getOrganizersByFiltering(0, 0, [{ key: 'Gender', value: 'Female' }]).then(
      (res) => {
        const count = (res.meta.pagination.total / organizers) * 100
        setOrgFemales(count || 0)
        setOrgMales(100 - count || 0)
        setOrgMalesCount(organizers - res.meta.pagination.total || 0)
        setOrgFemalesCount(res.meta.pagination.total)
      },
    )

    // OrganizersService.getOrganizersByFiltering(0, 0, [{ key: 'Gender', value: 'Male' }]).then(
    //   (res) => {
    //     const count = (res.meta.pagination.total / organizers) * 100
    //     setOrgMales(count)
    //   },
    // )
  }, [organizers])

  useEffect(() => {
    votersService.getVotersByFiltering(0, 0, [{ key: 'Gender', value: 'Female' }]).then((res) => {
      const count = (res.meta.pagination.total / voters) * 100
      setVotFemales(count || 0)
      setVotMales(100 - count || 0)
      setVotMalesCount(voters - res.meta.pagination.total || 0)
      setVotFemalesCount(res.meta.pagination.total)
    })
  }, [voters])

  return (
    <CCard className="mb-4">
      {/* <CCardHeader>Traffic {' & '} Sales</CCardHeader> */}
      <CCardBody>
        <CRow>
          <CCol xs={12} md={6} xl={6}>
            <CRow>
              <CCol sm={6}>
                <div className="border-start border-start-5 border-start-danger py-1 px-3 mb-3">
                  <div className="text-medium-emphasis ">Organizers</div>
                  <div className="fs-5 fw-semibold">{organizers}</div>
                </div>
              </CCol>
            </CRow>

            <hr className="mt-0" />
          </CCol>

          <CCol xs={12} md={6} xl={6}>
            <CRow>
              <CCol sm={6}>
                <div className="border-start border-start-5 border-start-warning py-1 px-3 mb-3" >
                  <div className="text-medium-emphasis ">Voters</div>
                  <div className="fs-5 fw-semibold">{voters}</div>
                </div>
              </CCol>
            </CRow>

            <hr className="mt-0" />
          </CCol>
        </CRow>
        <CRow>
          <div className="progress-group mb-4">
            <div className="progress-group-header">
              <CIcon className="me-2" icon={cilUser} size="lg" />
              <span>Male</span>
              <div className="ms-auto fw-semibold" style={{ textAlign: 'end' }}>
              ({votMalesCount}) {votMales.toFixed(2)}%
              </div>
            </div>
            <div className="progress-group-bars">
              <CProgress thin color="warning" className='mb-2' height={12} value={votMales} />
             
              <CProgress thin color="danger" height={12} value={orgMales} />
              <div className="ms-auto fw-semibold" style={{ textAlign: 'end' }}>
              ({orgMalesCount}) {orgMales.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="progress-group mb-4">
            <div className="progress-group-header">
              <CIcon className="me-2" icon={cilUserFemale} size="lg" />
              <span>Female</span>
              <div className="ms-auto fw-semibold" style={{ textAlign: 'end' }}>
              ({votFemalesCount}) {votFemales.toFixed(2)}%
              </div>
            </div>
            <div className="progress-group-bars">
              <CProgress thin color="warning" className='mb-2' height={12} value={votFemales} />
            
              <CProgress thin color="danger" height={12} value={orgFemales} />
              <div className="ms-auto fw-semibold" style={{ textAlign: 'end' }}>
                ({orgFemalesCount}) {orgFemales.toFixed(2)}%
              </div>
            </div>
          </div>
        </CRow>

        <br />
      </CCardBody>
    </CCard>
  )
}

export default CountsProgress
