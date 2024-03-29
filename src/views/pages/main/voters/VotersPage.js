import { cilPen, cilPeople } from '@coreui/icons'
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
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import Loading from 'src/components/Loading'
import ErrorModal from 'src/components/Modals/ErrorModal'
import MoreInfoOffCanvas from 'src/components/MoreInfoOffCanvas'
import { votersService } from 'src/services/voters.service'
import NoDataArt from 'src/components/NoDataArt'

function VotersPage() {
  const navigate = useNavigate()

  const [isMoreInfo, setIsMoreInfo] = useState(false)
  const [votersList, setVotersList] = useState([])
  const [selectedVoter, setSelectedVoter] = useState(null)
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  //search filters
  const [name, setName] = useState('')
  const [nic, setNic] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [filters, setFilters] = useState([])

  //pagination
  const [page, setPage] = useState(1)
  const pageSize = 20
  const [metaData, setMetaData] = useState(null)

  useEffect(() => {
    setLoading(true)
    if (filters.length === 0) {
      getVoterList()
    } else {
      onSearch({ key: 'Enter' }, filters[0].key)
    }
  }, [page])

  const getVoterList = () => {
    votersService
      .getVoters(page, pageSize)
      .then((res) => {
        const data = res?.data
        setMetaData(res.meta.pagination)
        setVotersList(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err?.response?.status === 403) {
          setVotersList([])
          return
        }
        setErrorMsg(true)
      })
  }

  const onSearch = (e, key) => {
    if (e.key === 'Enter') {
      setLoading(true)
      votersService
        .getVotersByFiltering(page, pageSize, filters)
        .then((res) => {
          const data = res?.data
          setMetaData(res.meta.pagination)
          setVotersList(data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          if (err?.response?.status === 403) {
            setVotersList([])
            return
          }
          setErrorMsg(true)
        })
    }
  }

  // const onFilterButton = () => {
  //   setLoading(true)
  //   votersService
  //   .getVotersByFiltering(page, pageSize, filters)
  //   .then((res) => {
  //     const data = res?.data
  //     setMetaData(res.meta.pagination)
  //     setVotersList(data)
  //     setLoading(false)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     setLoading(false)
  //     if (err?.response?.status === 403) {
  //       setVotersList([])
  //       return
  //     }
  //     setErrorMsg(true)
  //   })
  // }

  useEffect(() => {
    setFilters([
      {
        key: "Name",
        value: name,
      },
      {
        key: "Mobile_Number_1",
        value: mobileNo,
      },
      {
        key: "NIC_Number",
        value: nic,
      },
    ])
  }, [name, nic, mobileNo])

  return (
    <div>
      <ErrorModal
        open={errorMsg}
        onOpen={(value) => setErrorMsg(value)}
        title={'Failed Operation'}
        description={MODAL_MSGES.ERROR_MSG}
      />
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Voters Managment</h5>
          <CButton
            onClick={() => navigate('/voters/add/0')}
            style={{ backgroundColor: COLORS.MAIN, border: '0px' }}
          >
            ADD NEW
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-2">
            <CCol md={3} className="mb-2">
              <CFormInput
                label="Name"
                placeholder="Search & Enter"
                onChange={(e) => setName(e.target.value)}
                value={name}
                onKeyDown={(e) => onSearch(e, 'Name')}
              ></CFormInput>
            </CCol>

            <CCol md={2} className="mb-2">
              <CFormInput
                label="NIC No"
                placeholder="Search & Enter"
                onChange={(e) => setNic(e.target.value)}
                value={nic}
                onKeyDown={(e) => onSearch(e, 'NIC_Number')}
              ></CFormInput>
            </CCol>
            <CCol md={2} className="mb-2">
              <CFormInput
                label="Contact No"
                placeholder="Search & Enter"
                onChange={(e) => setMobileNo(e.target.value)}
                value={mobileNo}
                onKeyDown={(e) => onSearch(e, 'Mobile_Number_1')}
              ></CFormInput>
            </CCol>
            {/* <CCol md={2}>
              <CButton
                style={{
                  width: '40%',
                  backgroundColor: COLORS.MAIN,
                  border: 'none',
                  marginTop: '32px',
                }}
                onClick={() => onFilterButton()}
              >
                Filter
              </CButton>
            </CCol> */}
            <CCol md={3}></CCol>
            <CCol>
              <CButton
                className="mt-4"
                color='light'
                style={{ width: '100%' }}
                onClick={() => {
                  window.location.reload(false)
                }}
              >
                Clear Filters
              </CButton>
            </CCol>
          </CRow>

          {loading ? (
            <Loading loading={loading} />
          ) : votersList.length === 0 ? (
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
                  <CTableHeaderCell scope="col">NIC</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {votersList.map((item, key) => (
                  <CTableRow
                    key={key}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedVoter(item)
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
      <MoreInfoOffCanvas
        title="Voter Information"
        type="voter"
        data={selectedVoter}
        isMoreInfo={isMoreInfo}
        setIsMoreInfo={setIsMoreInfo}
      />
    </div>
  )
}

export default VotersPage
