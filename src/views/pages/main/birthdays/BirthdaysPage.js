import { cilList, cilPen, cilPeople, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
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
import EditBirthdayInfoModal from 'src/components/Modals/EditBirthdayInfoModal'
import ErrorModal from 'src/components/Modals/ErrorModal'
import NoDataArt from 'src/components/NoDataArt'
import { OrganizersService } from 'src/services/organizers.service'
import { votersService } from 'src/services/voters.service'

function BirthdaysPage() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isMoreInfo, setIsMoreInfo] = useState(false)
  const [filters, setFilters] = useState([])
  //pagination
  const [page, setPage] = useState(1)
  const pageSize = 20
  const [metaData, setMetaData] = useState(null)
  const [isCreating, setIsCreating] = useState(false)

  const [voterList, setVoterList] = useState([])
  const [organizerList, setOrganizerList] = useState([])

  const [votersMsg, setVotersMsg] = useState(
    '🎉 Happy Birthday to You! 🎂 Your vote is the greatest gift you can give to shape our future. Thank you for being an active participant in our democracy! Wishing you a day filled with joy and celebration. 🥳 From Name',
  )
  const [organizersMsg, setOrganizersMsg] = useState(
    "🎉 Happy Birthday to an incredible organizer! 🎂 Your dedication and hard work make our events unforgettable. Here's to another year of bringing people together and making a difference. Wishing you a day as amazing as you are! 🥳 From Name",
  )


  useEffect(() => {
    getOrganizers()
    getVoters()
  }, [])

  const getOrganizers = async () => {
    setLoading(true)
    OrganizersService.getOrganizersByBirthday(`${moment(new Date()).format('MM-DD')}`)
      .then((res) => {
        const data = res?.data
        setMetaData(res.meta.pagination)
        setOrganizerList(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err?.response?.status === 403) {
          setOrganizerList([])
          return
        }
        setErrorMsg(true)
      })
  }

  const getVoters = async () => {
    setLoading(true)
    votersService
      .getVotorsByBirthday(`${moment(new Date()).format('MM-DD')}`)
      .then((res) => {
        const data = res?.data
        setMetaData(res.meta.pagination)
        setVoterList(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err?.response?.status === 403) {
          setVoterList([])
          return
        }
        setErrorMsg(true)
      })
  }
  return (
    <div>
      {/* <EditBirthdayInfoModal
        open={isCreating}
        onOpen={(status) => setIsCreating(status)}
      /> */}
      <ErrorModal
        open={errorMsg}
        onOpen={(value) => setErrorMsg(value)}
        title={'Failed Operation'}
        description={MODAL_MSGES.ERROR_MSG}
      />

      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Birthdays Managment</h5>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-2">
            <span style={{ fontWeight: 'bold' }}>Voters</span>
          </CRow>
          {loading ? (
            <Loading loading={loading} />
          ) : voterList.length === 0 ? (
            <NoDataArt
              visible={true}
              description={
                filters.length > 0 ? MODAL_MSGES.SEARCH_NO_DATA_DOUND : MODAL_MSGES.NO_BIRTHDAYS
              }
              size={10}
            />
          ) : (
            <CTable hover responsive small>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NIC</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Birth-Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {voterList.map((item, key) => (
                  <CTableRow key={key} style={{ cursor: 'pointer' }}>
                    <CTableDataCell width={50}>{key + 1}</CTableDataCell>
                    <CTableDataCell width={550}>{item?.attributes?.Name}</CTableDataCell>
                    <CTableDataCell width={550}>{item?.attributes?.NIC_Number}</CTableDataCell>
                    <CTableDataCell width={550}>{moment(item?.attributes?.Date_of_Birth).format('DD/MM/YYYY')}</CTableDataCell>
                    <CTableDataCell width={550}>
                      {item?.attributes?.Mobile_Number_1 || item?.attributes?.Mobile_Number_2}
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
          <CRow className="mb-2">
            <span style={{ fontWeight: 'bold' }}>Organizers</span>
          </CRow>
          {loading ? (
            <Loading loading={loading} />
          ) : organizerList.length === 0 ? (
            <NoDataArt
              visible={true}
              description={
                filters.length > 0 ? MODAL_MSGES.SEARCH_NO_DATA_DOUND : MODAL_MSGES.NO_BIRTHDAYS
              }
              size={10}
            />
          ) : (
            <CTable hover responsive small>
              <CTableHead color="light">
                <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NIC</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Birth-Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {organizerList.map((item, key) => (
                  <CTableRow key={key} style={{ cursor: 'pointer' }}>
                    <CTableDataCell width={50}>{key + 1}</CTableDataCell>
                    <CTableDataCell width={550}>{item?.attributes?.Name}</CTableDataCell>
                    <CTableDataCell width={550}>{item?.attributes?.NIC_Number}</CTableDataCell>
                    <CTableDataCell width={550}>{moment(item?.attributes?.Date_of_Birth).format('DD/MM/YYYY')}</CTableDataCell>
                    <CTableDataCell width={550}>
                      {item?.attributes?.Mobile_Number_1 || item?.attributes?.Mobile_Number_2}
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

          <div className="mt-4">
            <hr />
            <h3 className="mt-4">Birthday Campaigns</h3>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="columns-sel">
                  Write the automatic message that you want to send for their birthdays:
                </CFormLabel>
                <CRow>
                  <CCol>
                    {' '}
                    <CFormTextarea
                      id="columns-sel"
                      className="mb-4"
                      floatingLabel="write voter's message here..."
                      placeholder="write voter's message here..."
                      value={votersMsg}
                      style={{ height: '100px' }}
                    />
                  </CCol>
                  <CCol>
                    {' '}
                    <CFormTextarea
                      id="columns-sel"
                      className="mb-4"
                      floatingLabel="write organizer's message here..."
                      placeholder="write organizer's message here..."
                      value={organizersMsg}
                      style={{ height: '100px' }}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={2} xs={6}>
                <CButton
                  disabled={loading}
                  color="primary"
                  style={{ width: '100%', backgroundColor: COLORS.MAIN, border: '0px' }}
                  onClick={() => {
                    window.location.reload(false)
                  }}
                >
                  Save
                </CButton>
              </CCol>
            </CRow>
          </div>
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

export default BirthdaysPage
