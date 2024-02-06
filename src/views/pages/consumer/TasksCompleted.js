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

function ConsumerTasksCompleted() {
  const [mainTaskList, setMainTaskList] = useState([])
  const [taskList, setTaskList] = useState([])
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMainTaskList()
  }, [])

  useEffect(() => {
    getTaskList()
  }, [mainTaskList])

  const getTaskList = async () => {
    setLoading(true)
    await TasksService.getSubTasksByOrgID(TokenService.getUser()?.userData.id)
      .then(async (res) => {
        const data = res?.data
        console.log(data)
        const filteredData = data.filter((item) => {
          if (
            item.attributes.Status == 'Successes' ||
            item.attributes.Status == 'Partial-Successes' ||
            item.attributes.Status == 'Un-Successes'
          ) {
            return item
          }
        })

        const updatedData = await Promise.all(filteredData.map(async (sub) => {
          mainTaskList.forEach(item => {
            if (sub.attributes.Task === item.id) {
              sub.attributes.Task = item.attributes.task;
            }
          });
          return sub;
        }));
        
        setTaskList(updatedData)
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

  const getMainTaskList = async () => {
    setLoading(true)
    await TasksService.getMainTasks()
      .then(async (res) => {
        const data = res?.data
        console.log(data)

        setMainTaskList(data)

        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err?.response?.status === 403) {
          setMainTaskList([])
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
            description={MODAL_MSGES.NO_DATA_FOUND}
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
                        Tasks Management - Completed
                      </p>
                    </div>
                    <p>
                      Stay organized and on top of your day with our task management feature! Easily
                      track, and complete your to-do list on the go. Never miss a beat with our
                      intuitive task system.
                    </p>

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
                              <CListGroupItem key={key}>
                               <div style={{textAlign: 'start', fontWeight: 'bold'}}>{item?.attributes?.Task}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ textAlign: 'left' }}>
                                    {item?.attributes?.description}
                                  </span>
                                  {item?.attributes?.Status == 'Successes' && (
                                    <span style={{ color: 'green', textAlign: 'right' }}>
                                      Completed
                                    </span>
                                  )}
                                  {item?.attributes?.Status == 'Partial-Successes' && (
                                    <span style={{ color: 'orange', textAlign: 'right' }}>
                                      Patially Completed
                                    </span>
                                  )}
                                  {item?.attributes?.Status == 'Un-Successes' && (
                                    <span style={{ color: COLORS.DANGER_BTN, textAlign: 'right' }}>
                                      Not Completed
                                    </span>
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

export default ConsumerTasksCompleted
