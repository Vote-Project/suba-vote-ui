import {
  CAlert,
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getNullOrUndefinedAttributes } from 'src/common/common'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import { TasksService } from 'src/services/tasks.service'
import SuccessModal from './SuccessModal'
import ErrorModal from './ErrorModal'
import CIcon from '@coreui/icons-react'
import { cilWarning } from '@coreui/icons'

function CreateTaskModal({ open, onOpen, reload, type = 'add', mainId }) {
  const [task, setTask] = useState('')
  const [alertMessage, setAlertMessage] = useState('Please Fill All Required Fields')
  const [isAlert, setIsAlert] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const [selectedTask, setSelectedTask] = useState(null)

  const createTask = () => {
    setIsAlert(false)
    setLoading(true)
    const requiredData = {
      task,
    }

    const result = getNullOrUndefinedAttributes(requiredData)

    if (result.length > 0) {
      setIsAlert(true)
      setAlertMessage(
        <div>
          <p>Please fill the required fields:</p>
        </div>,
      )
      setLoading(false)
      return
    }

    if(type == 'add') {
      TasksService.addMainTask({ data: { task } })
      .then((res) => {
        setTask('')
        onOpen(false)
        setLoading(false)
        reload()
      })
      .catch((err) => {
        console.log(err)
        setErrorMsg(true)
        setLoading(false)
      })
    } else {
      TasksService.UpdateMainTask(selectedTask?.id, { data: { task } })
      .then((res) => {
        setTask('')
        onOpen(false)
        setLoading(false)
        reload()
      })
      .catch((err) => {
        console.log(err)
        setErrorMsg(true)
        setLoading(false)
      })
    }

   
  }

  useEffect(() => {
    getTaskByID()
  }, [mainId])

  const getTaskByID = () => {
    setTask('')
    setErrorMsg(false)
    setLoading(true)
    TasksService.getMainTask(mainId)
      .then((res) => {
        const data = res?.data
        setSelectedTask(data)
        setTask(data?.attributes?.task)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)

        setErrorMsg(true)
      })
  }

  return (
    <CModal
      alignment="center"
      visible={open}
      onClose={() => onOpen(false)}
      backdrop="static"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalBody>
        <SuccessModal
          open={successMsg}
          onOpen={(value) => setSuccessMsg(value)}
          title={'Successful Operation'}
          description={MODAL_MSGES.TASKS.ADD_SUCCESS_MSG}
        />
        <ErrorModal
          open={errorMsg}
          onOpen={(value) => setErrorMsg(value)}
          title={'Failed Operation'}
          description={MODAL_MSGES.ERROR_MSG}
        />
        <CRow>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              {type == 'add' ? 'Add New' : 'Edit'} Task
            </CFormLabel>
            <CFormTextarea
              type="text"
              id="exampleFormControlInput1"
              placeholder="Write a task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </CCol>
        </CRow>

        {isAlert && (
          <CAlert hidden={!isAlert} color="warning" className="d-flex align-items-center mt-3">
            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
            <div>{alertMessage}</div>
          </CAlert>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Cancel
        </CButton>
        <CButton
          disabled={loading}
          color="primary"
          style={{ backgroundColor: COLORS.MAIN, border: '0px' }}
          onClick={() => {
            createTask()
          }}
        >
          Save
        </CButton>
        <CSpinner hidden={!loading} style={{ color: COLORS.MAIN }} />
      </CModalFooter>
    </CModal>
  )
}

export default CreateTaskModal
