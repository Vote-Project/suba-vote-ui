import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Select, { useStateManager } from 'react-select'
import DatePicker from 'rsuite/DatePicker'
import 'rsuite/dist/rsuite.min.css'
import { getNullOrUndefinedAttributes, jsonToSelectBox } from 'src/common/common'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import ErrorModal from 'src/components/Modals/ErrorModal'
import SuccessModal from 'src/components/Modals/SuccessModal'
import OccupationList from 'src/data/Occupations.json'
import ProgrammesList from 'src/data/ProgrammeCategories.json'
import { LocationService } from 'src/services/location.service'
import { OrganizersService } from 'src/services/organizers.service'
import { votersService } from 'src/services/voters.service'

const INITIAL_VALUE = ''

function AddEditVoter() {
  //input fields
  const { id, type } = useParams()
  const [title, setTitle] = useState(INITIAL_VALUE)
  const [name, setName] = useState(INITIAL_VALUE)
  const [nic, setNic] = useState(INITIAL_VALUE)
  const [gender, setGender] = useState({ label: 'Male', value: 'Male' })
  const [occupation, setOccupation] = useState(INITIAL_VALUE)
  const [civilStatus, setCivilStatus] = useState(INITIAL_VALUE)
  const [address, setAddress] = useState(INITIAL_VALUE)
  const [dob, setDob] = useState(new Date())
  const [isNJP, setIsNJP] = useState(false)
  const [mobileNo, setMobileNo] = useState(INITIAL_VALUE)
  const [mobileNoTwo, setMobileNoTwo] = useState(INITIAL_VALUE)
  const [WhatsAppNo, setWhatsAppNo] = useState(INITIAL_VALUE)
  const [fbLink, setFbLink] = useState(INITIAL_VALUE)
  const [district, setDistrict] = useState(INITIAL_VALUE)
  const [seat, setSeat] = useState(INITIAL_VALUE)
  const [localAuthority, setLocalAuthority] = useState(INITIAL_VALUE)
  const [ward, setWard] = useState(INITIAL_VALUE)
  const [streetVillage, setStreetVillage] = useState(INITIAL_VALUE)
  const [gnDivision, setGnDivision] = useState(INITIAL_VALUE)
  const [districtOrganizer, setDistrictOrganizer] = useState({
    label: 'Hasintha',
    value: 'Hasintha',
  })
  const [streetVillageOrganizer, setStreetVillageOrganizer] = useState({
    label: 'Hasintha',
    value: 'Hasintha',
  })
  const [seatOrganizer, setSeatOrganizer] = useState({
    label: 'Hasintha',
    value: 'Hasintha',
  })
  const [localAuthorityOrganizer, setLocalAuthorityOrganizer] = useState({
    label: 'Hasintha',
    value: 'Hasintha',
  })
  const [wardOrganizer, setWardOrganizer] = useState({
    label: 'Hasintha',
    value: 'Hasintha',
  })
  const [gnDivisionOrganizer, setGnDivisionOrganizer] = useState({
    label: 'Hasintha',
    value: 'Hasintha',
  })
  const [programmeWardOrganizer, setProgrammeWardOrganizer] = useState('Hasintha')
  const [selectedProgramme, setSelectedProgramme] = useState(INITIAL_VALUE)
  const [location, setLocation] = useState(INITIAL_VALUE)
  const [dop, setDop] = useState(new Date())
  const [programmeDesc, setProgrammeDesc] = useState(INITIAL_VALUE)

  //options

  const [districtOptions, setDistrictOptions] = useState([])
  const [seatOptions, setSeatOptions] = useState([])
  const [localAuthorityOptions, setLocalAuthorityOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])
  const [streetVillageOptions, setStreetVillageOptions] = useState([])
  const [gnDivisionOptions, setGnDivisionOptions] = useState([])
  const [districtOrganizerOptions, setDistrictOrganizerOptions] = useState([
    {
      label: 'Hasintha',
      value: 'Hasintha',
    },
  ])

  const [seatOrganizerOptions, setSeatOrganizerOptions] = useState([
    {
      label: 'Hasintha',
      value: 'Hasintha',
    },
  ])
  const [localAuthorityOrganizerOptions, setLocalAuthorityOrganizerOptions] = useState([
    {
      label: 'Hasintha',
      value: 'Hasintha',
    },
  ])
  const [wardOrganizerOptions, setWardOrganizerOptions] = useState([
    {
      label: 'Hasintha',
      value: 'Hasintha',
    },
  ])
  const [streetVillageOrganizerOptions, setStreetVillageOrganizerOptions] = useState([
    {
      label: 'Hasintha',
      value: 'Hasintha',
    },
  ])
  const [GnDivisionOrganizerOptions, setGnDivisionOrganizerOptions] = useState([
    {
      label: 'Hasintha',
      value: 'Hasintha',
    },
  ])

  const [alertMessage, setAlertMessage] = useState('Please Fill All Required Fields')
  const [isAlert, setIsAlert] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (type == 'edit' && id > 0) {
      getVoterById(id)
    }
  }, [id, type])

  useEffect(() => {
    LocationService.getDistricts()
      .then((res) => {
        const data = res.data
        const selectArray = data.map((item) => {
          return { value: item.id, label: item.attributes.Name }
        })
        setDistrictOptions(selectArray)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (district)
      LocationService.getSeatsByDistrictId(district.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setSeatOptions(selectArray)
        })
        .catch((err) => console.log(err))
  }, [district])

  useEffect(() => {
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

  const getVoterById = async (id) => {
    votersService
      .getVoter(id)
      .then(async (res) => {
        const data = res.data?.attributes

        setAddress(data.Address)
        setCivilStatus({ label: data.Civil_Status, value: data.Civil_Status })
        setDob(new Date(data.Date_of_Birth))
        setDop(new Date(data?.Date_of_Program_Conducted))
        setDistrict({ label: (await LocationService.getDistrictById(data.District)).data.attributes.Name, value: data.District })
        setDistrictOrganizer({ label: data.District_Organizer, value: data.District_Organizer })
        setFbLink(data.Facebook_Link)
        setGnDivision({ label: (await LocationService.getGnDivisionById(data.GN_Division)).data.attributes.Name, value: data.GN_Division })
        setGnDivisionOrganizer({
          label: data.GN_Division_Organizer,
          value: data.GN_Division_Organizer,
        })
        setGender({ label: data.Gender, value: data.Gender })
        setLocalAuthority({ label: (await LocationService.getLocalAuthorityById(data.Local_Authority)).data.attributes.Name, value: data.Local_Authority })
        setLocalAuthorityOrganizer({
          label: data.Local_Authority_Organizer,
          value: data.Local_Authority_Organizer,
        })
        setLocation({ label: data.Location, value: data.Location })
        setMobileNo(data.Mobile_Number_1)
        setMobileNoTwo(data.Mobile_Number_2)
        setNic(data.NIC_Number)
        setIsNJP(data.NJP_Party_Member)
        setName(data.Name)
        setOccupation({ label: data.Occupation, value: data.Occupation })
        setSelectedProgramme({ label: data.Program, value: data.Program })
        setProgrammeDesc(data.Program_Description)
        setProgrammeWardOrganizer(data.Program_Ward_Organizer)
        setSeat({ label: (await LocationService.getSeatById(data.Seat)).data.attributes.Name , value: data.Seat })
        setSeatOrganizer({ label: data.Seat_Organizer, value: data.Seat_Organizer })
        setStreetVillage({ label: (await LocationService.getStreetById(data.Street_Village)).data.attributes.Name, value: data.Street_Village })
        setStreetVillageOrganizer({
          label: data.Street_Village_Organizer,
          value: data.Street_Village_Organizer,
        })
        setTitle({ label: data.Title, value: data.Title })
        setWard({ label: (await LocationService.getWardById(data.Ward)).data.attributes.Name, value: data.Ward })
        setWardOrganizer({ label: data.Ward_Organizer, value: data.Ward_Organizer })
        setWhatsAppNo(data.WhatsApp_Number)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addVoter = () => {
    setLoading(true)

    const requiredData = {
      Title: title.value,
      Name: name,
      NIC_Number: nic,
      Occupation: occupation.value,
      Date_of_Birth: new Date(dob),
      Gender: gender.value,
      Address: address,
      Civil_Status: civilStatus.value,
      Mobile_Number_1: mobileNo,
      District: district.value,
      District_Organizer: districtOrganizer.value,
      Seat: seat.value,
      Seat_Organizer: seatOrganizer.value,
      Local_Authority: localAuthority.value,
      Local_Authority_Organizer: localAuthorityOrganizer.value,
      Ward: ward.value,
      Ward_Organizer: wardOrganizer.value,
      GN_Division: gnDivision.value,
      GN_Division_Organizer: gnDivisionOrganizer.value,
      Street_Village: streetVillage.value,
      Street_Village_Organizer: streetVillageOrganizer.value,
      Program_Ward_Organizer: programmeWardOrganizer,
      Program: selectedProgramme.value,
      Location: location.value,
      Date_of_Program_Conducted: new Date(dop),
      Program_Description: programmeDesc,
    }

    const result = getNullOrUndefinedAttributes(requiredData)

    if (result.length > 0) {
      setIsAlert(true)
      setAlertMessage(
        <div>
          <p>Please fill in the following required fields:</p>
          <br />
          <ul>
            {result.map((item, key) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
        </div>,
      )
      setLoading(false)
      return
    }

    const data = {
      ...requiredData,
      NJP_Party_Member: isNJP,
      Mobile_Number_2: mobileNoTwo,
      WhatsApp_Number: WhatsAppNo,
      Facebook_Link: fbLink,
    }

    votersService
      .addVoter({ data })
      .then((res) => {
        console.log(res)
        setLoading(false)
        setSuccessMsg(true)
      })
      .catch((err) => {
        console.log(err)
        setErrorMsg(true)
        setLoading(false)
      })
  }

  const editVoter = () => {
    if (type != 'edit' && id == 0) {
      return
    }

    setLoading(true)

    const requiredData = {
      Title: title.value,
      Name: name,
      NIC_Number: nic,
      Occupation: occupation.value,
      Date_of_Birth: new Date(dob),
      Gender: gender.value,
      Address: address,
      Civil_Status: civilStatus.value,
      Mobile_Number_1: mobileNo,
      District: district.value,
      District_Organizer: districtOrganizer.value,
      Seat: seat.value,
      Seat_Organizer: seatOrganizer.value,
      Local_Authority: localAuthority.value,
      Local_Authority_Organizer: localAuthorityOrganizer.value,
      Ward: ward.value,
      Ward_Organizer: wardOrganizer.value,
      GN_Division: gnDivision.value,
      GN_Division_Organizer: gnDivisionOrganizer.value,
      Street_Village: streetVillage.value,
      Street_Village_Organizer: streetVillageOrganizer.value,
      Program_Ward_Organizer: programmeWardOrganizer,
      Program: selectedProgramme.value,
      Location: location.value,
      Date_of_Program_Conducted: new Date(dop),
      Program_Description: programmeDesc,
    }

    const result = getNullOrUndefinedAttributes(requiredData)

    if (result.length > 0) {
      setIsAlert(true)
      setAlertMessage(
        <div>
          <p>Please fill in the following required fields:</p>
          <br />
          <ul>
            {result.map((item, key) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
        </div>,
      )
      setLoading(false)
      return
    }

    const data = {
      ...requiredData,
      NJP_Party_Member: isNJP,
      Mobile_Number_2: mobileNoTwo,
      WhatsApp_Number: WhatsAppNo,
      Facebook_Link: fbLink,
    }

    votersService
      .updateVoter(id, { data })
      .then((res) => {
        setLoading(false)
        setSuccessMsg(true)
      })
      .catch((err) => {
        console.log(err)
        setErrorMsg(true)
        setLoading(false)
      })
  }

  function resetValues() {
    setTitle('')
    setName('')
    setNic('')
    setGender('')
    setOccupation('')
    setCivilStatus('')
    setAddress('')
    setDob('')
    setIsNJP(false)
    setMobileNo('')
    setWhatsAppNo('')
    setMobileNoTwo('')
    setFbLink('')
    setDistrict('')
    setSeat('')
    setLocalAuthority('')
    setWard('')
    setStreetVillage('')
    setGnDivision('')
    setDistrictOrganizer('')
    setStreetVillageOrganizer('')
    setSeatOrganizer('')
    setLocalAuthorityOrganizer('')
    setWardOrganizer('')
    setGnDivisionOrganizer('')
  }

  return (
    <CCard className="mb-4">
      {type == 'edit' ? (
        <SuccessModal
          open={successMsg}
          onOpen={(value) => setSuccessMsg(value)}
          title={'Successful Operation'}
          description={MODAL_MSGES.VOTERS.UPDATE_SUCCESS_MSG}
          rediretUrl={'/voters'}
        />
      ) : (
        <SuccessModal
          open={successMsg}
          onOpen={(value) => setSuccessMsg(value)}
          title={'Successful Operation'}
          description={MODAL_MSGES.VOTERS.ADD_SUCCESS_MSG}
          rediretUrl={'/voters'}
          addAnother={() => resetValues()}
        />
      )}

      <ErrorModal
        open={errorMsg}
        onOpen={(value) => setErrorMsg(value)}
        title={'Failed Operation'}
        description={MODAL_MSGES.ERROR_MSG}
        addAnother={() => resetValues()}
      />
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>Voter Configaration</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <h6 style={{ color: COLORS.MAIN }}>{type == 'edit' ? 'Edit' : 'Add New'} Voter</h6>
        </CRow>
        <span style={{ color: 'grey', fontWeight: 'bold', color: COLORS.MAIN }}>
          Personal Information
        </span>
        <hr style={{ borderTop: '2px solid ' + COLORS.MAIN }} />
        <CRow className="mb-2">
          <CCol md={2}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Title <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              value={title}
              onChange={(e) => setTitle(e)}
              options={[{ label: 'Mr.', value: 'Mr.' }]}
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Name <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Date of Birth <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <DatePicker
              size="md"
              placeholder="Select..."
              style={{ width: 'auto', display: 'block', marginBottom: 10, zIndex: 'no' }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol md={2}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Gender <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Not Specify', value: 'Not Specify' },
              ]}
              value={gender}
              onChange={(e) => setGender(e)}
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Occupation <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={jsonToSelectBox(OccupationList, 'title')}
              value={occupation}
              onChange={(e) => setOccupation(e)}
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Civil Status <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={[
                { label: 'Single', value: 'Single' },
                { label: 'Married', value: 'Married' },
              ]}
              value={civilStatus}
              onChange={(e) => setCivilStatus(e)}
            ></Select>
          </CCol>
        </CRow>

        <CRow className="mb-4">
          <CCol md={7}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Address <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              NIC Number <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: 9837......"
              value={nic}
              style={{ zIndex: 100 }}
              onChange={(e) => setNic(e.target.value)}
            />
          </CCol>
          <CCol>
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
          </CCol>
        </CRow>
        <span style={{ color: 'grey', fontWeight: 'bold', color: COLORS.MAIN }}>
          Contact Information
        </span>
        <hr style={{ borderTop: '2px solid ' + COLORS.MAIN }} />
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Mobile Number (1) <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: 07........"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Mobile Number (2)
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: 07........"
              value={mobileNoTwo}
              onChange={(e) => setMobileNoTwo(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              WhatsApp Number
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: 07........"
              value={WhatsAppNo}
              onChange={(e) => setWhatsAppNo(e.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Facebook Link
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: https://........"
              value={fbLink}
              onChange={(e) => setFbLink(e.target.value)}
            />
          </CCol>
        </CRow>
        <span style={{ color: 'grey', fontWeight: 'bold', color: COLORS.MAIN }}>
          Location Identification
        </span>
        <hr style={{ borderTop: '2px solid ' + COLORS.MAIN }} />
        <CRow className="mb-2">
          <CCol md={6} className="p-3">
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  District <span style={{ color: 'red' }}>*</span>
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
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Seat <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={seatOptions}
                  value={seat}
                  onChange={(e) => setSeat(e)}
                ></Select>
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Local Authority <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={localAuthorityOptions}
                  value={localAuthority}
                  onChange={(e) => setLocalAuthority(e)}
                ></Select>
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Ward <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={wardOptions}
                  value={ward}
                  onChange={(e) => setWard(e)}
                ></Select>
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  GN Division <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={gnDivisionOptions}
                  value={gnDivision}
                  onChange={(e) => setGnDivision(e)}
                ></Select>
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Street Village <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="sm"
                  options={streetVillageOptions}
                  value={streetVillage}
                  onChange={(e) => setStreetVillage(e)}
                ></Select>
              </CCol>
            </CRow>
          </CCol>
          <CCol style={{ backgroundColor: COLORS.LIGHT, borderRadius: '10px' }} className="p-3">
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  District Organizer <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="District Organizer"
                  disabled={districtOrganizerOptions.length == 1}
                  defaultValue={districtOrganizerOptions[0]}
                  options={districtOrganizerOptions}
                  value={districtOrganizer}
                  onChange={(e) => setDistrictOrganizer(e.target.value)}
                ></Select>
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Seat Organizer <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Seat Organizer"
                  disabled={seatOrganizerOptions.length == 1}
                  options={seatOrganizerOptions}
                  defaultValue={seatOrganizerOptions[0]}
                  value={seatOrganizer}
                  onChange={(e) => setSeatOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Local Authority Organizer <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Local Organizer"
                  disabled={localAuthorityOrganizerOptions.length == 1}
                  options={localAuthorityOrganizerOptions}
                  defaultValue={localAuthorityOrganizerOptions[0]}
                  value={localAuthorityOrganizer}
                  onChange={(e) => setLocalAuthorityOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Ward Organizer <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Ward Organizer"
                  disabled={wardOrganizerOptions.length == 1}
                  options={wardOrganizerOptions}
                  defaultValue={wardOrganizerOptions[0]}
                  value={wardOrganizer}
                  onChange={(e) => setWardOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>

            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  GN Division Organizer <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="GN Division Organizer"
                  disabled={GnDivisionOrganizerOptions.length == 1}
                  options={GnDivisionOrganizerOptions}
                  defaultValue={GnDivisionOrganizerOptions[0]}
                  value={gnDivisionOrganizer}
                  onChange={(e) => setGnDivisionOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Street Village Organizer <span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <Select
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Street Village Organizer"
                  disabled={streetVillageOrganizerOptions.length == 1}
                  options={streetVillageOrganizerOptions}
                  defaultValue={streetVillageOrganizerOptions[0]}
                  value={streetVillageOrganizer}
                  onChange={(e) => setStreetVillageOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <span style={{ color: 'grey', fontWeight: 'bold', color: COLORS.MAIN }}>
          Authentication
        </span>
        <hr style={{ borderTop: '2px solid ' + COLORS.MAIN }} />
        <CRow className="mb-2">
          <CCol md={6}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Ward Organizer <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              size="md"
              placeholder="Ward Organizer"
              disabled={true}
              value={programmeWardOrganizer}
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Location <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Not Specify', value: 'Not Specify' },
              ]}
              value={location}
              onChange={(e) => setLocation(e)}
            ></Select>
          </CCol>

          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Date of Programme Conducted <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <DatePicker
              size="md"
              placeholder="Select..."
              style={{ width: 400, display: 'block', marginBottom: 10 }}
              value={dop}
              onChange={(e) => setDop(e)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Programmes <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={jsonToSelectBox(ProgrammesList, 'title')}
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e)}
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Programme Description <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              value={programmeDesc}
              onChange={(e) => setProgrammeDesc(e.target.value)}
            />
          </CCol>
        </CRow>

        {isAlert && (
          <CAlert hidden={!isAlert} color="warning" className="d-flex align-items-center mt-3">
            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
            <div>{alertMessage}</div>
          </CAlert>
        )}
        <CRow
          className="mt-4"
          style={{ position: 'sticky', bottom: '1rem', alignSelf: 'flex-end' }}
        >
          <CCol md={2}>
            <CButton
              disabled={loading}
              color="primary"
              style={{ width: '100%', backgroundColor: COLORS.MAIN, border: '0px' }}
              onClick={() => (type == 'edit' ? editVoter() : addVoter())}
            >
              {type == 'edit' ? 'Update' : 'Submit'}
            </CButton>
          </CCol>
          <CCol md={1}>
            <CSpinner hidden={!loading} style={{ color: COLORS.MAIN }} />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default AddEditVoter
