import {
  CButton,
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
  CPopover,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import logo from 'src/assets/images/suba-logo.jpg'
import ConsumerHeader from 'src/components/ConsumerHeader'
import { OrganizersService } from 'src/services/organizers.service'
import { TasksService } from 'src/services/tasks.service'
import { AuthService } from 'src/services/auth.service'
import TokenService from 'src/services/TokenService'
import NoDataArt from 'src/components/NoDataArt'
import ErrorModal from 'src/components/Modals/ErrorModal'
import Loading from 'src/components/Loading'

function ConsumerTasksTodo() {
  const [taskList, setTaskList] = useState([])
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTaskList()
  }, [])

  const getTaskList = async () => {
    setLoading(true)
    await TasksService.getSubTasksByOrgID(TokenService.getUser()?.userData.id)
      .then((res) => {
        const data = res?.data
        console.log(data)
        const filteredData = data.filter((item) => {
          if (item.attributes.Status == 'Initiate' || item.attributes.Status == 'In-progress') {
            return item
          }
        })
        setTaskList(filteredData)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err?.response?.status === 403) {
          setTaskList([])
          return
        }
        setErrorMsg(true)
      })
  }

  const updateStatus = async (id, Status) => {
    setLoading(true)
    await TasksService.updateSubTask(id, { data: { id, Status } })
      .then((res) => {
        getTaskList()
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setErrorMsg(true)
        setLoading(false)
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
          <ErrorModal
            open={errorMsg}
            onOpen={(value) => setErrorMsg(value)}
            title={'Failed Operation'}
            description={MODAL_MSGES.ERROR_MSG}
          />
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
                        Tasks Management - Todo
                      </p>
                    </div>
                    <p>
                      Stay organized and on top of your day with our task management feature! Easily
                      track, and complete your to-do list on the go. Never miss a beat with our
                      intuitive task system.
                    </p>

                    <CRow className="mb-2">
                      <CCol style={{ textAlign: 'end' }}>
                        <CPopover
                          content={
                            <>
                              <div>
                              <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 35,
                                  }}
                                >
                                  <span className="material-symbols-outlined">refresh</span>
                                  <p style={{ textAlign: 'start' }}>Revert Task</p>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 35,
                                  }}
                                >
                                  <span className="material-symbols-outlined">play_circle</span>
                                  <p style={{ textAlign: 'start' }}>Start Task</p>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 35,
                                  }}
                                >
                                  <span className="material-symbols-outlined">check_circle</span>
                                  <p style={{ textAlign: 'start' }}>Complete</p>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 35,
                                  }}
                                >
                                  <span className="material-symbols-outlined" >flaky</span>
                                  <p style={{ textAlign: 'start' }}>Partially Complete</p>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 35,
                                  }}
                                >
                                  <span className="material-symbols-outlined" style={{color: COLORS.DANGER_BTN}}>cancel</span>
                                  <p style={{ textAlign: 'start' }}>Cannot Complete</p>
                                </div>
                              </div>
                            </>
                          }
                          placement="top"
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ cursor: 'pointer', color: COLORS.MAIN, marginRight: 18 }}
                          >
                            info
                          </span>
                        </CPopover>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol>
                        {loading ? (
                          <Loading loading={loading} />
                        ) : taskList.length === 0 ? (
                          <NoDataArt
                            visible={true}
                            description={MODAL_MSGES.TASKS.NO_TASKS}
                            size={10}
                          />
                        ) : (
                          <CListGroup>
                            {taskList.map((item, key) => (
                              <CListGroupItem
                                key={key}
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                              >
                                <span style={{textAlign: 'left'}}>{item?.attributes?.description}</span>
                                <div>
                                  {' '}
                                  {item?.attributes?.Status == 'Initiate' ? (
                                    <>
                                      <span
                                        className="material-symbols-outlined"
                                        onClick={() => updateStatus(item?.id, 'In-progress')}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        play_circle
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                       <span
                                        className="material-symbols-outlined"
                                        onClick={() => updateStatus(item?.id, 'Initiate')}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        refresh
                                      </span>
                                      <span
                                        className="material-symbols-outlined"
                                        onClick={() => updateStatus(item?.id, 'Successes')}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        check_circle
                                      </span>
                                      <span
                                        className="material-symbols-outlined"
                                        onClick={() => updateStatus(item?.id, 'Partial-Successes')}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        flaky
                                      </span>
                                      <span
                                        className="material-symbols-outlined"
                                        onClick={() => updateStatus(item?.id, 'Un-Successes')}
                                        style={{ cursor: 'pointer', color: COLORS.DANGER_BTN }}
                                      >
                                        cancel
                                      </span>
                                    </>
                                  )}
                                </div>
                              </CListGroupItem>
                            ))}
                          </CListGroup>
                        )}
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

export default ConsumerTasksTodo
