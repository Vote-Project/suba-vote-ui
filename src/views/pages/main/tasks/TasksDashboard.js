import { cilList, cilPen, cilPeople, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import Loading from 'src/components/Loading'
import CreateTaskModal from 'src/components/Modals/CreateTaskModal'
import EditOrganizerTask from 'src/components/Modals/EditOrganizerTask'
import ErrorModal from 'src/components/Modals/ErrorModal'
import OrganizerTaskListModal from 'src/components/Modals/OrganizerTaskListModal'
import MoreInfoOffCanvas from 'src/components/MoreInfoOffCanvas'
import NoDataArt from 'src/components/NoDataArt'
import { TasksService } from 'src/services/tasks.service'

function TasksDashboard() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const [taskList, setTaskList] = useState([])
  const [selectedTask, setSelectedTask] = useState([])

  const [isMoreInfo, setIsMoreInfo] = useState(false)
  const [filters, setFilters] = useState([])
  //pagination
  const [page, setPage] = useState(1)
  const pageSize = 20
  const [metaData, setMetaData] = useState(null)

  const [createType, setCreateType] = useState('add')
  const [isCreating, setIsCreating] = useState(false)
  const [isCreatingSubTask, setIsCreatingSubTask] = useState(false)
  const [viewSubTasks, setViewSubTasks] = useState(false)

  const [selectedMainTaskID, setSelectedMainTaskID] = useState(null)

  useEffect(() => {
    getMainTasks()
  }, [])

  const getMainTasks = () => {
    setLoading(true)
    TasksService.getMainTasks()
      .then((res) => {
        const data = res?.data
        setTaskList(data)
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

  const removeTask = (id) => {
    setErrorMsg(false)
    setLoading(true)
    TasksService.removeMainTasks(id)
      .then((res) => {
        getMainTasks()
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

  return (
    <div>
      <EditOrganizerTask
        open={isCreatingSubTask}
        onOpen={(status) => setIsCreatingSubTask(status)}
        reload={() => getMainTasks()}
        selectedMainID={selectedMainTaskID}
      />
      <CreateTaskModal
        open={isCreating}
        onOpen={(status) => setIsCreating(status)}
        reload={() => getMainTasks()}
        type={createType}
        mainId={createType == 'edit' && selectedMainTaskID }
      />
      <ErrorModal
        open={errorMsg}
        onOpen={(value) => setErrorMsg(value)}
        title={'Failed Operation'}
        description={MODAL_MSGES.ERROR_MSG}
      />

      <OrganizerTaskListModal
        selectedMainID={selectedMainTaskID}
        open={viewSubTasks}
        onOpen={(status) => setViewSubTasks(status)}
      />
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Tasks Managment</h5>
          <CButton
            onClick={() => {
              setCreateType('add')
              setIsCreating(!isCreating)
            }}
            style={{ backgroundColor: COLORS.MAIN, border: '0px' }}
          >
            CREATE MAIN TASK
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-2">
            <span style={{ fontWeight: 'bold' }}>Main Tasks</span>
          </CRow>
          {loading ? (
            <Loading loading={loading} />
          ) : taskList.length === 0 ? (
            <NoDataArt
              visible={true}
              description={
                filters.length > 0 ? MODAL_MSGES.SEARCH_NO_DATA_DOUND : MODAL_MSGES.NO_DATA_FOUND
              }
              size={10}
            />
          ) : (
            <CTable hover responsive small>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {taskList.map((item, key) => (
                  <CTableRow key={key} style={{ cursor: 'pointer' }}>
                    <CTableDataCell width={50}>{item?.id}</CTableDataCell>
                    <CTableDataCell width={550}>{item?.attributes?.task}</CTableDataCell>
                    <CTableDataCell width={150}>
                      {moment(new Date(item?.attributes?.createdAt)).format('DD-MM-YYYY')}
                    </CTableDataCell>
                    <CTableDataCell width={150}>
                      <CIcon
                        icon={cilList}
                        size="xl"
                        className="text-info"
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
                        onClick={() => {
                          setSelectedMainTaskID(item.id)
                          setViewSubTasks(true)
                        }}
                      />

                      <CIcon
                        icon={cilPeople}
                        size="xl"
                        className="text-info"
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
                        onClick={() => {
                          setSelectedMainTaskID(item.id)
                          setIsCreatingSubTask(true)
                        }}
                      />

                      <CIcon
                        icon={cilPen}
                        size="xl"
                        className="text-info"
                        onClick={() => {
                          setCreateType('edit')
                          setSelectedMainTaskID(item.id)
                          setIsCreating(true)
                        }}
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
                      />
                      <CIcon
                        icon={cilTrash}
                        size="xl"
                        className="text-danger"
                        onClick={() => removeTask(item?.id)}
                        style={{
                          cursor: 'pointer',
                          padding: '2px',
                          paddingInline: '4px',
                          color: 'red',
                        }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
          {metaData && (
            <CPagination className="mt-2" aria-label="Page navigation example">
              <CPaginationItem
                hidden={metaData.page === 1}
                style={{ color: COLORS.MAIN, cursor: 'pointer' }}
                onClick={() => setPage(metaData.page - 1)}
              >
                Previous
              </CPaginationItem>
              <CPaginationItem
                hidden={metaData.page >= metaData.pageCount}
                style={{ color: COLORS.MAIN, cursor: 'pointer' }}
                onClick={() => setPage(metaData.page + 1)}
              >
                Next
              </CPaginationItem>
            </CPagination>
          )}
        </CCardBody>
      </CCard>
      {/* <MoreInfoOffCanvas
        title="Voter Information"
        type="voter"
        data={selectedVoter}
        isMoreInfo={isMoreInfo}
        setIsMoreInfo={setIsMoreInfo}
      /> */}
    </div>
  )
}

export default TasksDashboard
