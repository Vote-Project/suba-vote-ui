import { cilPen, cilPeople, cilWindowRestore } from '@coreui/icons'
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
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from 'src/common/const'
import MoreInfoOffCanvas from 'src/components/MoreInfoOffCanvas'
import { OrganizersService } from 'src/services/organizers.service'

function OrganizersPage() {
  const navigate = useNavigate()
  const [isMoreInfo, setIsMoreInfo] = useState(false)
  const [organizersList, setOrganizersList] = useState([])
  const [selectedOrganizer, setSelectedOrganizer] = useState(null)

  useEffect(() => {
    OrganizersService
      .getOrganizers()
      .then((res) => {
        console.log(res)
        setOrganizersList(res.data)
      })
      .then((err) => {
        console.log(err)
      })
  }, [])


  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Orginzers Managment</h5>
          <CButton
            onClick={() => navigate('/organizers/add/0')}
            style={{ backgroundColor: COLORS.MAIN, border: '0px' }}
          >
            ADD NEW
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead color="light">
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
              {organizersList.map((item, key) => (
                <CTableRow
                  key={key}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedOrganizer(item)
                    setIsMoreInfo(true)
                  }}
                >
                  <CTableDataCell width={50}>{key + 1}</CTableDataCell>
                  <CTableDataCell width={150}>{item?.attributes?.NIC_Number}</CTableDataCell>
                  <CTableDataCell>{item?.attributes?.Name}</CTableDataCell>
                  <CTableDataCell width={150}>
                    {item?.attributes?.Mobile_Number_1 ||
                      item?.attributes?.Mobile_Number_2 ||
                      item?.attributes?.WhatsApp_Number}
                  </CTableDataCell>
                  <CTableDataCell width={150}>
                    {moment(new Date(item?.attributes?.createdAt)).format('DD-MM-YYYY')}
                  </CTableDataCell>
                  <CTableDataCell width={150}>
                    <CIcon
                      icon={cilPeople}
                      size="xl"
                      className="text-info"
                      style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
                      onClick={() => setIsMoreInfo(true)}
                    />
                    <CIcon
                      icon={cilWindowRestore}
                      size="xl"
                      className="text-info"
                      style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
                    />
                    <CIcon
                      icon={cilPen}
                      size="xl"
                      className="text-info"
                      onClick={() => navigate('/voters/add/1')}
                      style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
                    />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div style={{ color: COLORS.MAIN }}>
          <CPagination className="mt-2" aria-label="Page navigation example">
            <CPaginationItem style={{ color: COLORS.MAIN }}>Previous</CPaginationItem>
            <CPaginationItem style={{ color: COLORS.MAIN }}>1</CPaginationItem>
            <CPaginationItem style={{ color: COLORS.MAIN }}>2</CPaginationItem>
            <CPaginationItem style={{ color: COLORS.MAIN }}>3</CPaginationItem>
            <CPaginationItem style={{ color: COLORS.MAIN }}>Next</CPaginationItem>
          </CPagination>
          </div>
        </CCardBody>
      </CCard>
      <MoreInfoOffCanvas
        title="Organizer Information"
        type="organizer"
        data={selectedOrganizer}
        isMoreInfo={isMoreInfo}
        setIsMoreInfo={setIsMoreInfo}
      />
    </div>
  )
}

export default OrganizersPage
