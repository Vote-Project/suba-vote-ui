import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { jsonToSelectBox } from 'src/common/common'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import OccupationList from 'src/data/Occupations.json'
import PersonTypes from 'src/data/personTypes.json'
import SearchCategories from 'src/data/SearchCategories.json'
import { LocationService } from 'src/services/location.service'
import TokenService from 'src/services/TokenService'
import VirtualizedTable from 'src/components/VirtualizedTable'
import PdfDocument from 'src/components/PdfDocument'
import { OrganizersService } from 'src/services/organizers.service'
import Loading from 'src/components/Loading'
import NoDataArt from 'src/components/NoDataArt'
import { votersService } from 'src/services/voters.service'


const INITIAL_VALUE = ''
const sampleData = Array.from({ length: 50000 }, (_, index) => ({
  id: index,
  name: `Name ${index}`,
}))

const options = [
  { value: 'Name', label: 'Name' },
  { value: 'NIC_Number', label: 'NIC' },
  { value: 'Mobile_Number_1', label: 'Contact No.' },
  { value: 'Gender', label: 'Gender' },
]

function ReportsPage() {
  const targetRef = useRef(null);

  const [searchByCivilStatus, setSearchByCivilStatus] = useState(false)

  const [selectedReportType, setSelectedReportType] = useState(null)
  const [selectedSearchCategories, setSelectedSearchCategories] = useState([])
  const [locationAlertMessage, setLocationAlertMessage] = useState(
    'Something Wrong With Location Server',
  )
  const [loading, setLoading] = useState(false)

  const [selectedPersonType, setSelectedPersonType] = useState(null)
  const [selectedGender, setSelectedGender] = useState(INITIAL_VALUE)
  const [selectedOccupation, setSelectedOccupation] = useState(INITIAL_VALUE)
  const [selectedCivilStatus, setSelectedCivilStatus] = useState(INITIAL_VALUE)
  const [isNJP, setIsNJP] = useState(false)

  //location
  const [district, setDistrict] = useState(INITIAL_VALUE)
  const [seat, setSeat] = useState(INITIAL_VALUE)
  const [localAuthority, setLocalAuthority] = useState(INITIAL_VALUE)
  const [ward, setWard] = useState(INITIAL_VALUE)
  const [streetVillage, setStreetVillage] = useState(INITIAL_VALUE)
  const [gnDivision, setGnDivision] = useState(INITIAL_VALUE)

  const [districtOptions, setDistrictOptions] = useState([])
  const [seatOptions, setSeatOptions] = useState([])
  const [localAuthorityOptions, setLocalAuthorityOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])
  const [streetVillageOptions, setStreetVillageOptions] = useState([])
  const [gnDivisionOptions, setGnDivisionOptions] = useState([])

  const [data, setData] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    LocationService.getDistricts()
      .then((res) => {
        const data = res.data
        const clientDistricts = TokenService.getClientDistricts()
        const clientDataIds = clientDistricts.map((client) => client.id)
        const filteredData = data.filter((data) => clientDataIds.includes(data.id))
        const selectArray = filteredData.map((item) => {
          return { value: item.id, label: item.attributes.Name }
        })
        setDistrictOptions(selectArray)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setSeat(INITIAL_VALUE)
    setLocalAuthority(INITIAL_VALUE)
    setWard(INITIAL_VALUE)
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    setLocationAlertMessage(false)
    if (district) {
      LocationService.getSeatsByDistrictId(district.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setSeatOptions(selectArray)
        })
        .catch((err) => {
          console.log(err)
          setLocationAlertMessage(true)
        })
    }
  }, [district])

  useEffect(() => {
    setLocalAuthority(INITIAL_VALUE)
    setWard(INITIAL_VALUE)
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    if (seat)
      LocationService.getLocalAuthoritiesBySeatId(seat.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setLocalAuthorityOptions(selectArray)
        })
        .catch((err) => console.log(err))
  }, [seat])

  useEffect(() => {
    setWard(INITIAL_VALUE)
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    if (localAuthority)
      LocationService.getWardsByLocalAuthorityId(localAuthority.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setWardOptions(selectArray)
        })
        .catch((err) => console.log(err))
  }, [localAuthority])

  useEffect(() => {
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    if (ward)
      LocationService.getGnDivisionsByWardId(ward.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setGnDivisionOptions(selectArray)
        })
        .catch((err) => console.log(err))
  }, [ward])

  useEffect(() => {
    setStreetVillage(INITIAL_VALUE)
    if (gnDivision)
      LocationService.getStreetsByGnDivisionId(gnDivision.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setStreetVillageOptions(selectArray)
        })
        .catch((err) => console.log(err))
  }, [gnDivision])

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const genarateReport = () => {
    setLoading(true)
    const filters = [
      {
        key: 'Gender',
        value: selectedGender.value ? selectedGender.value : '',
      },
      {
        key: 'Occupation',
        value: selectedOccupation.value ? selectedOccupation.value : '',
      },
      {
        key: 'Civil_Status',
        value: selectedCivilStatus.value ? selectedCivilStatus.value : '',
      },
      {
        key: 'District',
        value: district.value ? district.value : '',
      },
      {
        key: 'Seat',
        value: seat.value ? seat.value : '',
      },
      {
        key: 'Ward',
        value: ward.value ? ward.value : '',
      },
      {
        key: 'GN_Division',
        value: gnDivision.value ? gnDivision.value : '',
      },
      {
        key: 'Street_Village',
        value: streetVillage.value ? streetVillage.value : '',
      },
    ]



    if (selectedPersonType?.value.toLowerCase() == 'organizers') {
      OrganizersService.getOrganizersByFiltering(1, 10000000, filters)
        .then((res) => {
          const data = res?.data
          console.log(res)
          setData(res.data)
          setLoading(false)
          scrollToTarget();
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          // if (err?.response?.status === 403) {
          //   setOrganizersList([])
          //   return
          // }
          // setErrorMsg(true)
          scrollToTarget();
        })
    } else {
      votersService
        .getVotersByFiltering(1, 10000000, filters)
        .then((res) => {
          const data = res?.data
          console.log(res)
          setData(res.data)
          setLoading(false)
          scrollToTarget();
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          scrollToTarget();
          // if (err?.response?.status === 403) {
          //   setOrganizersList([])
          //   return
          // }
          // setErrorMsg(true)
        })
    }
  }

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <h5>Reports Managment</h5>
        </CCardHeader>
        <CCardBody>
          {/* <CRow>
            <CCol md={4}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Report Type
              </CFormLabel>
              <Select
                type="text"
                id="exampleFormControlInput1"
                size="sm"
                onChange={(e) => setSelectedReportType(e)}
                options={jsonToSelectBox(ReportsTypes, 'title')}
              ></Select>
            </CCol>
            <CCol md={4}></CCol>
            <CCol md={4} hidden={!selectedReportType}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Search Categories
              </CFormLabel>
              <Select
                isMulti={true}
                type="text"
                id="exampleFormControlInput1"
                size="sm"
                onChange={(e) => setSelectedSearchCategories(e)}
                options={jsonToSelectBox(SearchCategories, 'title', 'value')}
              ></Select>
            </CCol>
          </CRow>
          {selectedSearchCategories.map((categoryInputs, key) => (
            <CRow key={key}>
                <CCol md={8}></CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  {categoryInputs.label}
                </CFormLabel>
                <Select
                  isMulti={true}
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={jsonToSelectBox(SearchCategories, 'title', 'value')}
                ></Select>
              </CCol>
            </CRow>
          ))} */}
          <CRow>
            <CCol md={6} className="mb-4">
              <CRow className="mb-2">
                <span style={{ fontWeight: 'bold' }}>Basic Filters</span>
              </CRow>
              <CRow>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Person Type
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  onChange={(e) => setSelectedPersonType(e)}
                  options={jsonToSelectBox(PersonTypes, 'title')}
                ></Select>
              </CRow>
              <CRow className="mt-2">
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Gender
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e)}
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Not Specify', value: 'Not Specify' },
                  ]}
                ></Select>
              </CRow>
              <CRow className="mt-2">
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Occupation
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={jsonToSelectBox(OccupationList, 'title')}
                  value={selectedOccupation}
                  onChange={(e) => setSelectedOccupation(e)}
                ></Select>
              </CRow>
              <CRow className="mt-2">
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Civil Status
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={[
                    { label: 'Single', value: 'Single' },
                    { label: 'Married', value: 'Married' },
                  ]}
                  value={selectedCivilStatus}
                  onChange={(e) => setSelectedCivilStatus(e)}
                ></Select>
              </CRow>
              {/* <CRow className="mt-2">
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  NJP Party Member? <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <br />
                <CFormCheck
                  inline
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineCheckbox1"
                  value="option1"
                  label="Yes"
                  checked={isNJP}
                  onChange={(e) => setIsNJP(true)}
                />
                <CFormCheck
                  inline
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineCheckbox2"
                  value="option2"
                  label="No"
                  checked={!isNJP}
                  onChange={() => setIsNJP(false)}
                />
              </CRow> */}
            </CCol>
            <CCol className="mb-4">
              <CRow className="mb-2">
                <span style={{ fontWeight: 'bold' }}>Location Filters</span>
              </CRow>
              <CRow>
                <CCol>
                  <CFormLabel htmlFor="staticEmail" className="col-form-label">
                    District
                  </CFormLabel>
                  <Select
                    type="text"
                    id="exampleFormControlInput1"
                    size="sm"
                    options={districtOptions}
                    value={district}
                    onChange={(e) => setDistrict(e)}
                  ></Select>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol>
                  <CFormLabel htmlFor="staticEmail" className="col-form-label">
                    Seat
                  </CFormLabel>
                  <Select
                    type="text"
                    id="exampleFormControlInput1"
                    size="sm"
                    isDisabled={!district}
                    options={seatOptions}
                    value={seat}
                    onChange={(e) => setSeat(e)}
                  ></Select>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol>
                  <CFormLabel htmlFor="staticEmail" className="col-form-label">
                    Local Authority
                  </CFormLabel>
                  <Select
                    type="text"
                    id="exampleFormControlInput1"
                    size="sm"
                    isDisabled={!seat}
                    options={localAuthorityOptions}
                    value={localAuthority}
                    onChange={(e) => setLocalAuthority(e)}
                  ></Select>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol>
                  <CFormLabel htmlFor="staticEmail" className="col-form-label">
                    Ward
                  </CFormLabel>
                  <Select
                    type="text"
                    id="exampleFormControlInput1"
                    size="sm"
                    isDisabled={!localAuthority}
                    options={wardOptions}
                    value={ward}
                    onChange={(e) => setWard(e)}
                  ></Select>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol>
                  <CFormLabel htmlFor="staticEmail" className="col-form-label">
                    GN Division
                  </CFormLabel>
                  <Select
                    type="text"
                    id="exampleFormControlInput1"
                    size="sm"
                    isDisabled={!ward}
                    options={gnDivisionOptions}
                    value={gnDivision}
                    onChange={(e) => setGnDivision(e)}
                  ></Select>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol>
                  <CFormLabel htmlFor="staticEmail" className="col-form-label">
                    Street Village
                  </CFormLabel>
                  <Select
                    type="text"
                    id="exampleFormControlInput1"
                    size="sm"
                    isDisabled={!gnDivision}
                    options={streetVillageOptions}
                    value={streetVillage}
                    onChange={(e) => setStreetVillage(e)}
                  ></Select>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow
            className="mt-4 gap-1 justify-content-end"
            style={{ position: 'sticky', bottom: '1rem', alignSelf: 'flex-end' }}
          >
     
            <CCol md={2}>
              <CButton
                disabled={loading}
                color="primary"
                style={{ width: '100%', backgroundColor: COLORS.MAIN, border: '0px' }}
                onClick={genarateReport}
              >
                Genarate Report
              </CButton>
            </CCol>
            <CCol md={2}>
              <CButton
                disabled={loading}
                color="light"
                style={{ width: '100%' }}
                onClick={() => {
                  window.location.reload(false)
                }}
              >
                Clear Filters
              </CButton>
            </CCol>
          </CRow>
          <div ref={targetRef}>
          {!loading && data && data?.length != 0 && (
            <CRow className="mt-4">
              <hr />
              <PdfDocument data={data} columns={selectedOption} type={selectedPersonType?.value.toLowerCase()} />
            </CRow>
          )}
          {!loading && data?.length == 0 && (
            <>
              <hr />
              <NoDataArt visible={true} description={MODAL_MSGES.SEARCH_NO_DATA_DOUND} size={10} />
            </>
          )}
          {loading && <Loading loading={loading} />}
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ReportsPage
