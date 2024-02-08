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
import TodoActionsCanvas from 'src/components/TodoActionsCanvas'

function ConsumerTasksTodo() {
  const [mainTaskList, setMainTaskList] = useState([])
  const [taskList, setTaskList] = useState([])
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [visibleCanvas, setVisibleCanvas] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    getMainTaskList()
  }, [])

  useEffect(() => {
    getTaskList()
  }, [mainTaskList])

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

  const getTaskList = async () => {
    setLoading(true)
    await TasksService.getSubTasksByOrgID(TokenService.getUser()?.userData.id)
      .then(async (res) => {
        const data = res?.data
        console.log(data)
        const filteredData = data.filter((item) => {
          if (item.attributes.Status == 'Initiate' || item.attributes.Status == 'In-progress') {
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

        console.log(updatedData)

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
        <TodoActionsCanvas
          visible={visibleCanvas}
          setVisible={(status) => setVisibleCanvas(status)}
          taskDetails={selectedItem}
          page={page}
          setAction={(status) => {
            setVisibleCanvas(false)
            updateStatus(selectedItem.id, status)
          }}
        />
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
                <CCard style={{ borderRadius: '20px', boxShadow: '1px 1px 15px black' }}>
                  <CCardBody style={{ alignSelf: 'center', textAlign: 'center' }}>
                    <div className="p-4">
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
                        Stay organized and on top of your day with our task management feature!
                        Easily track, and complete your to-do list on the go. Never miss a beat with
                        our intuitive task system.
                      </p>
                      <p>(Click tasks to perform actions)</p>
                    </div>

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
                              style={{cursor: 'pointer'}}
                                key={key}
                                onClick={() => {
                                  setPage(item?.attributes?.Status == 'Initiate' ? 1 : 2)
                                  setSelectedItem(item)
                                  setVisibleCanvas(true)
                                }}
                              >
                                <div style={{textAlign: 'start', fontWeight: 'bold'}}>{item?.attributes?.Task}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ textAlign: 'left' }}>
                                    {item?.attributes?.description}
                                  </span>
                                  <div>
                                    {' '}
                                    {item?.attributes?.Status == 'Initiate' ? (
                                      <>
                                        <span>Not Started</span>
                                      </>
                                    ) : (
                                      <>
                                        <span style={{ color: 'orange' }}>In-Progress</span>
                                      </>
                                    )}
                                  </div>
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
