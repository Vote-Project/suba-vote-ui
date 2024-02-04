import {
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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { COLORS } from 'src/common/const'
import Select, { useStateManager } from 'react-select'
import { OrganizersService } from 'src/services/organizers.service'
import { TasksService } from 'src/services/tasks.service'
import { getNullOrUndefinedAttributes } from 'src/common/common'

function EditOrganizerTask({ open, onOpen, selectedMainID, reload, type = 'add' }) {
  const [organizer, setOrganizer] = useState(null)
  const [organierList, setOrganierList] = useState([])
  const [task, setTask] = useState('')
  const [isAlert, setIsAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Please Fill All Required Fields')
  const [successMsg, setSuccessMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const [subTaskData, setSubTaskData] = useState(null)

  useEffect(() => {
    getOrganizers()
  }, [open, selectedMainID])

  const getOrganizers = async () => {
    setLoading(true)
    setErrorMsg(false)
    await OrganizersService.getOrganizers().then(async (res) => {
      const data = res?.data
      const filterdData = data.map((element) => {
        return {
          value: element.id,
          label: `${element.attributes.Name} - ${element.attributes.NIC_Number}`,
        }
      })
      setLoading(false)
      setOrganierList(filterdData)
      if (type == 'edit') {
        await TasksService.getSubTask(selectedMainID)
          .then((r) => {
            const data = r?.data
            setOrganizer({ value: data?.attributes?.orId, label: data?.attributes?.orName })
            setTask(data?.attributes?.description)
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
            setErrorMsg(true)
          })
      }
    })
  }

  const creatOrganizerTask = () => {
    setIsAlert(false)
    setLoading(true)

    const requiredData = {
      organizer,
      task,
    }

    console.log(requiredData)
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
      TasksService.addSubTask({
        data: {
          orId: requiredData.organizer?.value,
          orName: requiredData.organizer?.label,
          Task: selectedMainID,
          description: requiredData.task,
        },
      })
        .then((res) => {
          setTask('')
          setOrganizer(null)
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
      TasksService.updateSubTask(selectedMainID, {
        data: {
          description: requiredData.task,
        },
      })
        .then((res) => {
          setTask('')
          setOrganizer(null)
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

  return (
    <CModal
      alignment="center"
      visible={open}
      onClose={() => onOpen(false)}
      backdrop="static"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalBody className="m-1">
        {type != 'edit' && (
          <CRow>
            <CCol>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Select Organizer <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <Select
                type="text"
                id="exampleFormControlInput1"
                size="sm"
                options={organierList}
                value={organizer}
                onChange={(e) => setOrganizer(e)}
              ></Select>
            </CCol>
          </CRow>
        )}
        <CRow>
          <CFormLabel htmlFor="staticEmail" className="col-form-label">
            Sub Task <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormTextarea
            type="text"
            id="exampleFormControlInput1"
            placeholder="Write a sub task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Cancel
        </CButton>
        <CButton
          color="primary"
          style={{ backgroundColor: COLORS.MAIN, border: '0px' }}
          onClick={creatOrganizerTask}
        >
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditOrganizerTask
