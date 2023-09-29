import { cilArrowRight, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessModal({ title, description, rediretUrl, open, onOpen, addAnother }) {
  const navigate = useNavigate()
  return (
    <CModal
      alignment="center"
      visible={open}
      onClose={() => onOpen(false)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody className="m-3">
        <div
          style={{
            textAlign: 'center',
          }}
          className="mb-3"
        >
          <CIcon icon={cilSave} size="3xl" />
        </div>
        <p style={{ textAlign: 'center' }}>{description}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Close
        </CButton>
        <CButton
          color="primary"
          onClick={() => {
            addAnother()
            onOpen(false)
          }}
        >
          Add Another
        </CButton>
        <CButton  color="primary" onClick={() => navigate(rediretUrl)}>
          Go To Carousal <CIcon icon={cilArrowRight} size='md' />
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default SuccessModal
