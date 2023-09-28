import { cilPeople, cilWindowRestore } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function VotersPage() {
  const navigate = useNavigate();
  return (
    <div>
      <CCard className="mb-4">
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Voters Managment</h5>
          <CButton onClick={() => navigate('/voters/add/1')}>ADD NEW</CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover small>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">NIC</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell width={50}>1</CTableDataCell>
                <CTableDataCell width={150}>982872146V</CTableDataCell>
                <CTableDataCell >Hasintha Kavindu</CTableDataCell>
                <CTableDataCell width={150}>0778987181</CTableDataCell>
                <CTableDataCell width={150}>01-02-2023</CTableDataCell>
                <CTableDataCell width={150}>
                <CIcon
                    icon={cilPeople}
                    size="xl"
                    className="text-info"
                    style={{ cursor: 'pointer', padding: "2px", paddingInline: "3px"  }}
                  />
                  <CIcon
                    icon={cilWindowRestore}
                    size="xl"
                    className="text-info"
                    style={{ cursor: 'pointer', padding: "2px" , paddingInline: "3px"}}
                  />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CPagination className='mt-2' aria-label="Page navigation example">
            <CPaginationItem>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default VotersPage
