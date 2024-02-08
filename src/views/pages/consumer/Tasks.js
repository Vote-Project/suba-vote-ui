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
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { COLORS } from 'src/common/const'
import logo from 'src/assets/images/suba-logo.jpg'
import ConsumerHeader from 'src/components/ConsumerHeader'
import { OrganizersService } from 'src/services/organizers.service'
import { TasksService } from 'src/services/tasks.service'
import { AuthService } from 'src/services/auth.service'
import TokenService from 'src/services/TokenService'
import { useNavigate } from 'react-router-dom'

function ConsumerTasks() {
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const [todoCount, setTodoCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    getTaskList()
  }, [])

  const getTaskList = async () => {
    setLoading(true)
    await TasksService.getSubTasksByOrgID(TokenService.getUser()?.userData.id)
      .then((res) => {
        const data = res?.data
        const todoData = data.filter((item) => {
          if (item.attributes.Status == 'Initiate' || item.attributes.Status == 'In-progress') {
            return item
          }
        })
        const completedData = data.filter((item) => {
          if (
            item.attributes.Status == 'Successes' ||
            item.attributes.Status == 'Partial-Successes' ||
            item.attributes.Status == 'Un-Successes'
          ) {
            return item
          }
        })

        setTodoCount(todoData.length)

        setCompletedCount(completedData.length)

        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)

        setErrorMsg(true)
      })
  }

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
                      <p style={{ color: COLORS.MID_LIGHT, fontWeight: 'bold' }}>
                        Tasks Management
                      </p>
                    </div>
                    <p>
                      Stay organized and on top of your day with our task management feature! Easily
                      track, and complete your to-do list on the go. Never miss a beat with our
                      intuitive task system.
                    </p>
                    <CRow className="mt-5">
                      <CCol>
                        <CCard
                          className="dash-card mb-3 p-4"
                          style={{ border: `solid green` }}
                          onClick={() => navigate('/consumer/tasks/completed')}
                        >
                          <CCardBody
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: '20px',
                              cursor: 'pointer',
                            }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ color: 'green', fontSize: '4em' }}
                            >
                              check_circle
                            </span>
                            <div>
                              <span className="mt-3 fs-5" style={{ fontWeight: 'bold' }}>
                                COMPLETED
                              </span>{' '}
                              <br />
                              <p style={{ fontWeight: 'bold', color: 'green' }}>{completedCount}</p>
                            </div>
                          </CCardBody>
                        </CCard>
                      </CCol>
                      <CCol>
                        <CCard
                          className="dash-card mb-3 p-4"
                          onClick={() => navigate('/consumer/tasks/todo')}
                          style={{ border: `solid ${COLORS.DANGER_BTN}` }}
                        >
                          <CCardBody
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: '20px',
                              cursor: 'pointer',
                            }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ color: COLORS.DANGER_BTN, fontSize: '4em' }}
                            >
                              event_list
                            </span>
                            <div>
                              <span className="mt-3 fs-5" style={{ fontWeight: 'bold' }}>
                                TODO
                              </span>{' '}
                              <br />
                              <p style={{ fontWeight: 'bold', color: COLORS.DANGER_BTN }}>{todoCount}</p>
                            </div>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                    {/* <CRow>
                      <CCol>
                        <CListGroup>
                          <CListGroupItem
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <span>Dapibus ac facilisis in</span>
                            <span
                              className="material-symbols-outlined"
                              style={{ cursor: 'pointer' }}
                            >
                              check_circle
                            </span>
                          </CListGroupItem>

                          <CListGroupItem
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <span> Morbi leo risus</span>
                            <span
                              className="material-symbols-outlined"
                              style={{ cursor: 'pointer' }}
                            >
                              check_circle
                            </span>
                          </CListGroupItem>
                          <CListGroupItem
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <span> Porta ac consectetur ac</span>
                            <span
                              className="material-symbols-outlined"
                              style={{ cursor: 'pointer' }}
                            >
                              check_circle
                            </span>
                          </CListGroupItem>
                          <CListGroupItem
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <span> Vestibulum at eros</span>
                            <span
                              className="material-symbols-outlined"
                              style={{ cursor: 'pointer' }}
                            >
                              check_circle
                            </span>
                          </CListGroupItem>
                        </CListGroup>
                      </CCol>
                    </CRow> */}
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

export default ConsumerTasks
