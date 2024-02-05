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
    votersService.getVotorsByBirthday(`${moment(new Date()).format('MM-DD')}`)
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
                {voterList.map((item, key) => (
                  <CTableRow
                    key={key}
                    style={{ cursor: 'pointer' }}
                  
                  >
                    <CTableDataCell width={50}>{key + 1}</CTableDataCell>
                    <CTableDataCell width={550}>{item?.attributes?.task}</CTableDataCell>
                    <CTableDataCell width={150}>
                      {moment(new Date(item?.attributes?.createdAt)).format('DD-MM-YYYY')}
                    </CTableDataCell>
                    <CTableDataCell width={150}>
                  


                      <CIcon
                        icon={cilPen}
                        size="xl"
                        className="text-info"
                        onClick={() => navigate(`/voters/edit/${item?.id}`)}
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
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
           <CRow className="mb-2">
            <span style={{ fontWeight: 'bold' }}>Organizers</span>
          </CRow>
          {loading ? (
            <Loading loading={loading} />
          ) : voterList.length === 0 ? (
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
                {organizerList.map((item, key) => (
                  <CTableRow
                    key={key}
                    style={{ cursor: 'pointer' }}
                  
                  >
                    <CTableDataCell width={50}>{key + 1}</CTableDataCell>
                    <CTableDataCell width={550}>{item?.attributes?.task}</CTableDataCell>
                    <CTableDataCell width={150}>
                      {moment(new Date(item?.attributes?.createdAt)).format('DD-MM-YYYY')}
                    </CTableDataCell>
                    <CTableDataCell width={150}>
                  


                      <CIcon
                        icon={cilPen}
                        size="xl"
                        className="text-info"
                        onClick={() => navigate(`/voters/edit/${item?.id}`)}
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '4px' }}
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

export default BirthdaysPage