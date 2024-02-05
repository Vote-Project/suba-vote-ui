import React, { useEffect, useState } from 'react'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import Loading from '../Loading'
import NoDataArt from '../NoDataArt'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLocationPin, cilPen, cilPeople, cilTrash } from '@coreui/icons'
import ErrorModal from './ErrorModal'
import moment from 'moment'
import { TasksService } from 'src/services/tasks.service'
import EditOrganizerTask from './EditOrganizerTask'
import LocationCanvas from '../LocationCanvas'

function OrganizerTaskListModal({ open, onOpen, selectedMainID }) {
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState([])

  const [taskList, setTaskList] = useState([])
  const [selectedTask, setSelectedTask] = useState([])

  const [page, setPage] = useState(1)
  const pageSize = 20
  const [metaData, setMetaData] = useState(null)

  const [isCreatingSubTask, setIsCreatingSubTask] = useState(false)
  const [createType, setCreateType] = useState('add')

  const [selectedSubID, setSelectedSubID] = useState(null)
  const [selectedOrgId, setSelectedOrgId] = useState(null)

  useEffect(() => {
    if (selectedMainID && open) {
      getSubTaskList()
    }
  }, [selectedMainID, open])

  const getSubTaskList = () => {
    setErrorMsg(false)
    setLoading(true)
    TasksService.getSubTasksByMainID(selectedMainID)
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

  const removeSubTask = (id) => {
    setErrorMsg(false)
    setLoading(true)
    TasksService.removeSubTasks(id)
      .then((res) => {
        getSubTaskList()
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
    <CModal
      alignment="center"
      size="xl"
      visible={open}
      onClose={() => onOpen(false)}
      backdrop="static"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalBody>
        <LocationCanvas visibleLocation={selectedOrgId} setVisibleLocation={() => setSelectedOrgId(null)} orgID={selectedOrgId} />
        <ErrorModal
          open={errorMsg}
          onOpen={(value) => setErrorMsg(value)}
          title={'Failed Operation'}
          description={MODAL_MSGES.ERROR_MSG}
        />
        <EditOrganizerTask
          open={isCreatingSubTask}
          onOpen={(status) => setIsCreatingSubTask(status)}
          reload={() => getSubTaskList()}
          selectedMainID={selectedSubID}
          type="edit"
        />
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
                <CTableHeaderCell scope="col">Organizer</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sub Task</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {taskList.map((item, key) => (
                <CTableRow key={key} style={{ cursor: 'pointer' }}>
                  <CTableDataCell width={50}>{item?.id}</CTableDataCell>
                  <CTableDataCell width={200}>{item?.attributes?.orName}</CTableDataCell>
                  <CTableDataCell width={300}>{item?.attributes?.description}</CTableDataCell>
                  <CTableDataCell width={150}>
                  {item?.attributes?.Status == 'Initiate' && (
                      <span >Not Started</span>
                    )}
                      {item?.attributes?.Status == 'In-progress' && (
                      <span >In Progress</span>
                    )}
                    {item?.attributes?.Status == 'Successes' && (
                      <span style={{ color: 'green' }}>Completed</span>
                    )}
                    {item?.attributes?.Status == 'Partial-Successes' && (
                      <span style={{ color: 'orange' }}>Patially Completed</span>
                    )}
                    {item?.attributes?.Status == 'Un-Successes' && (
                      <span style={{ color: COLORS.DANGER_BTN }}>Not Completed</span>
                    )}
                  </CTableDataCell>
                  <CTableDataCell width={150}>
                    {moment(new Date(item?.attributes?.createdAt)).format('DD-MM-YYYY')}
                  </CTableDataCell>
                  <CTableDataCell width={150}>
                    <CIcon
                      icon={cilPen}
                      size="xl"
                      className="text-info"
                      onClick={() => {
                        setCreateType('edit')
                        setSelectedSubID(item?.id)
                        setIsCreatingSubTask(true)
                      }}
                      style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
                    />
                     <CIcon
                      icon={cilLocationPin}
                      size="xl"
                      className="text-info"
                      onClick={() => setSelectedOrgId(item?.attributes?.orId)}
                      style={{
                        cursor: 'pointer',
                        padding: '2px',
                        paddingInline: '4px',
                 
                      }}/>
                    <CIcon
                      icon={cilTrash}
                      size="xl"
                      className="text-danger"
                      onClick={() => removeSubTask(item?.id)}
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
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OrganizerTaskListModal
