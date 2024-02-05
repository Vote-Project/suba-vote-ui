import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCardImageOverlay,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CImage,
  CRow,
} from '@coreui/react'
import React from 'react'
import { COLORS } from 'src/common/const'
import logo from 'src/assets/images/suba-logo.jpg'
import ConsumerHeader from 'src/components/ConsumerHeader'
import { useNavigate } from 'react-router-dom'

function ConsumerDashboard() {

    const navigate = useNavigate()
  return (
    <>
      <ConsumerHeader />
      <div
        className="min-vh-100 d-flex flex-row align-items-center"
        style={{ background: `linear-gradient(${COLORS.MAIN}, ${COLORS.MID_LIGHT})` }}
      >
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard
                  className="p-4"
                  style={{ borderRadius: '20px', boxShadow: '1px 1px 15px black' }}
                >
                  <CCardBody style={{ alignSelf: 'center', textAlign: 'center' }}>
                    <div style={{ alignSelf: 'center', textAlign: 'center' }}>
                      <CImage
                        src={logo}
                        style={{ alignSelf: 'center', textAlign: 'center' }}
                        height={70}
                      />
                      <p style={{ color: COLORS.MID_LIGHT, fontWeight: 'bold' }}>SUBA VOTE</p>
                    </div>
                    <p>You can effortlessly switch between tasks and track tasks </p>
                    <CRow className="mt-5">
                      <CCol>
                        <CCard
                          className="dash-card mb-3 p-4"
                          style={{ border: `solid ${COLORS.MAIN}` }}
                          onClick={() => navigate('/consumer/tasks')}
                        >
                          <CCardBody>
                            <span
                              className="material-symbols-outlined"
                              style={{ color: COLORS.MAIN, fontSize: '4em' }}
                            >
                              library_add_check
                            </span>
                            <CCardTitle>Tasks</CCardTitle>
                          </CCardBody>
                        </CCard>
                      </CCol>
                      <CCol>
                        <CCard
                          className="dash-card mb-3 p-4"
                          style={{ border: `solid ${COLORS.MAIN}` }}
                        >
                          <CCardBody>
                            <span
                              className="material-symbols-outlined"
                              style={{ color: COLORS.MAIN, fontSize: '4em' }}
                            >
                              share_location
                            </span>
                            <CCardTitle>Tracking</CCardTitle>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default ConsumerDashboard
