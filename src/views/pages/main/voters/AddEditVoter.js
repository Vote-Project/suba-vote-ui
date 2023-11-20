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
import {
  getNullOrUndefinedAttributes,
  jsonToSelectBox,
  removeUndisfinedValuesInArray,
} from 'src/common/common'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import ErrorModal from 'src/components/Modals/ErrorModal'
import SuccessModal from 'src/components/Modals/SuccessModal'
import OccupationList from 'src/data/Occupations.json'
import ProgrammesList from 'src/data/ProgrammeCategories.json'
import OrganizerCategories from 'src/data/OrganizerCategories.json'
import { LocationService } from 'src/services/location.service'
import { OrganizersService } from 'src/services/organizers.service'
import { votersService } from 'src/services/voters.service'
import TokenService from 'src/services/TokenService'

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
  const [dob, setDob] = useState(new Date('01-01-1990'))
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
  const [districtOrganizer, setDistrictOrganizer] = useState(null)
  const [streetVillageOrganizer, setStreetVillageOrganizer] = useState(null)
  const [seatOrganizer, setSeatOrganizer] = useState(null)
  const [localAuthorityOrganizer, setLocalAuthorityOrganizer] = useState(null)
  const [wardOrganizer, setWardOrganizer] = useState(null)
  const [gnDivisionOrganizer, setGnDivisionOrganizer] = useState(null)
  const [programmeWardOrganizer, setProgrammeWardOrganizer] = useState(null)
  const [selectedProgramme, setSelectedProgramme] = useState(INITIAL_VALUE)
  const [location, setLocation] = useState(INITIAL_VALUE)
  const [dop, setDop] = useState(new Date('01-01-1990'))
  const [programmeDesc, setProgrammeDesc] = useState(INITIAL_VALUE)

  //options

  const [districtOptions, setDistrictOptions] = useState([])
  const [seatOptions, setSeatOptions] = useState([])
  const [localAuthorityOptions, setLocalAuthorityOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])
  const [streetVillageOptions, setStreetVillageOptions] = useState([])
  const [gnDivisionOptions, setGnDivisionOptions] = useState([])
  const [districtOrganizerOptions, setDistrictOrganizerOptions] = useState([])
  const [locationOptions, setLocationOptions] = useState([])
  const [allWardOrganizersOption, setAllWardOrganizersOption] = useState([])

  const [seatOrganizerOptions, setSeatOrganizerOptions] = useState([])
  const [localAuthorityOrganizerOptions, setLocalAuthorityOrganizerOptions] = useState([])
  const [wardOrganizerOptions, setWardOrganizerOptions] = useState([])
  const [streetVillageOrganizerOptions, setStreetVillageOrganizerOptions] = useState([])
  const [GnDivisionOrganizerOptions, setGnDivisionOrganizerOptions] = useState([])

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
        const clientDistricts = TokenService.getClientDistricts()
        const clientDataIds = clientDistricts.map(client => client.id);
        const filteredData = data.filter(data => clientDataIds.includes(data.id));
        
        const selectArray = filteredData.map((item) => {
          console.log(item)
          return { value: item.id, label: item.attributes.Name }
        })
        setDistrictOptions(selectArray)
      })
      .catch((err) => console.log(err))

    LocationService.getAllSeats()
      .then((res) => {
        const data = res.data
        const selectArray = data.map((item) => {
          return { value: item.attributes.Name, label: item.attributes.Name }
        })
        setLocationOptions(selectArray)
      })
      .catch((err) => console.log(err))

    OrganizersService.getOrganizersByOrganizerCategory(OrganizerCategories[2].title)
      .then((res) => {
        const data = res.data
        const selectArray = data.map((item) => {
          return { value: item.attributes.Name, label: item.attributes.Name }
        })
        setAllWardOrganizersOption(selectArray)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setSeat(INITIAL_VALUE)
    setLocalAuthority(INITIAL_VALUE)
    setWard(INITIAL_VALUE)
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    if (district) {
      LocationService.getSeatsByDistrictId(district.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setSeatOptions(selectArray)
        })
        .catch((err) => console.log(err))

      OrganizersService.getOrganizersByDistrictId(district.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            if (item.attributes.Organizer_Category == OrganizerCategories[0].title)
              return { value: item.id, label: item.attributes.Name }
          })
          setDistrictOrganizer(removeUndisfinedValuesInArray(selectArray)[0])
          setDistrictOrganizerOptions(removeUndisfinedValuesInArray(selectArray))
        })
        .catch((err) => console.log(err))
    }
  }, [district])

  useEffect(() => {
    setLocalAuthority(INITIAL_VALUE)
    setWard(INITIAL_VALUE)
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    if (seat) {
      LocationService.getLocalAuthoritiesBySeatId(seat.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setLocalAuthorityOptions(selectArray)
        })
        .catch((err) => console.log(err))

      OrganizersService.getOrganizersBySeatId(seat.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            if (item.attributes.Organizer_Category == OrganizerCategories[1].title)
              return { value: item.id, label: item.attributes.Name }
          })
          setSeatOrganizer(removeUndisfinedValuesInArray(selectArray)[0])
          setSeatOrganizerOptions(removeUndisfinedValuesInArray(selectArray))
        })
        .catch((err) => console.log(err))
    }
  }, [seat])

  console.log(occupation)

  useEffect(() => {
    setWard(INITIAL_VALUE)
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    if (localAuthority) {
      LocationService.getWardsByLocalAuthorityId(localAuthority.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setWardOptions(selectArray)
        })
        .catch((err) => console.log(err))

      OrganizersService.getOrganizersByLocalAuthorityId(localAuthority.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            if (item.attributes.Organizer_Category == OrganizerCategories[3].title)
              return { value: item.id, label: item.attributes.Name }
          })
          setLocalAuthorityOrganizer(removeUndisfinedValuesInArray(selectArray)[0])
          setLocalAuthorityOrganizerOptions(removeUndisfinedValuesInArray(selectArray))
        })
        .catch((err) => console.log(err))
    }
  }, [localAuthority])

  useEffect(() => {
    setGnDivision(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    if (ward) {
      LocationService.getGnDivisionsByWardId(ward.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setGnDivisionOptions(selectArray)
        })
        .catch((err) => console.log(err))

      OrganizersService.getOrganizersByWardId(ward.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            if (item.attributes.Organizer_Category == OrganizerCategories[2].title)
              return { value: item.id, label: item.attributes.Name }
          })
          setWardOrganizer(removeUndisfinedValuesInArray(selectArray)[0])
          setWardOrganizerOptions(removeUndisfinedValuesInArray(selectArray))
        })
        .catch((err) => console.log(err))
    }
  }, [ward])

  useEffect(() => {
    setStreetVillage(INITIAL_VALUE)
    if (gnDivision) {
      LocationService.getStreetsByGnDivisionId(gnDivision.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            return { value: item.id, label: item.attributes.Name }
          })
          setStreetVillageOptions(selectArray)
        })
        .catch((err) => console.log(err))

      OrganizersService.getOrganizersByGnDivisionId(gnDivision.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            if (item.attributes.Organizer_Category == OrganizerCategories[4].title)
              return { value: item.id, label: item.attributes.Name }
          })
          setGnDivisionOrganizer(removeUndisfinedValuesInArray(selectArray)[0])
          setGnDivisionOrganizerOptions(removeUndisfinedValuesInArray(selectArray))
        })
        .catch((err) => console.log(err))
    }
  }, [gnDivision])

  useEffect(() => {
    if (streetVillage) {
      OrganizersService.getOrganizersByStreetId(streetVillage.value)
        .then((res) => {
          const data = res.data
          const selectArray = data.map((item) => {
            if (item.attributes.Organizer_Category == OrganizerCategories[5].title)
              return { value: item.id, label: item.attributes.Name }
          })
          setStreetVillageOrganizer(removeUndisfinedValuesInArray(selectArray)[0])
          setStreetVillageOrganizerOptions(removeUndisfinedValuesInArray(selectArray))
        })
        .catch((err) => console.log(err))
    }
  }, [streetVillage])

  const getVoterById = async (id) => {
    votersService
      .getVoter(id)
      .then(async (res) => {
        const data = res.data?.attributes
        setStreetVillageOrganizer({
          label: data.Street_Village_Organizer,
          value: data.Street_Village_Organizer,
        })
        setTitle({ label: data.Title, value: data.Title })
        setAddress(data.Address)
        setCivilStatus({ label: data.Civil_Status, value: data.Civil_Status })
        setDob(new Date(data?.Date_of_Birth))
        setDop(new Date(data?.Date_of_Programme_Conducted_Authentication))
        setDistrictOrganizer({ label: data.District_Organizer, value: data.District_Organizer })
        setFbLink(data.Facebook_Link)
        setGnDivisionOrganizer({
          label: data.GN_Division_Organizer,
          value: data.GN_Division_Organizer,
        })
        setGender({ label: data.Gender, value: data.Gender })

        setLocalAuthorityOrganizer({
          label: data.Local_Authority_Organizer,
          value: data.Local_Authority_Organizer,
        })
        setLocation({ label: data.Location_Authentication, value: data.Location_Authentication })
        setMobileNo(data.Mobile_Number_1)
        setMobileNoTwo(data.Mobile_Number_2)
        setNic(data.NIC_Number)
        setIsNJP(data.NJP_Party_Member)
        setName(data.Name)
        setSeatOrganizer({ label: data.Seat_Organizer, value: data.Seat_Organizer })
        setOccupation({ label: data.Occupation, value: data.Occupation })
        setSelectedProgramme({
          label: data.Programme_Authentication,
          value: data.Programme_Authentication,
        })
        setWardOrganizer({ label: data.Ward_Organizer, value: data.Ward_Organizer })
        setWhatsAppNo(data.WhatsApp_Number)
        setProgrammeDesc(data.Category_of_Programmes_Authentication)
        setProgrammeWardOrganizer({
          label: data.Ward_Organizer_Authentication,
          value: data.Ward_Organizer_Authentication,
        })
        setDistrict({
          label: (await LocationService.getDistrictById(data.District)).data.attributes.Name,
          value: data.District,
        })
        setGnDivision({
          label: (await LocationService.getGnDivisionById(data.GN_Division)).data.attributes.Name,
          value: data.GN_Division,
        })
        setLocalAuthority({
          label: (await LocationService.getLocalAuthorityById(data.Local_Authority)).data.attributes
            .Name,
          value: data.Local_Authority,
        })
        setSeat({
          label: (await LocationService.getSeatById(data.Seat)).data.attributes.Name,
          value: data.Seat,
        })
       
        setStreetVillage({
          label: (await LocationService.getStreetById(data.Street_Village)).data.attributes.Name,
          value: data.Street_Village,
        })
      
        setWard({
          label: (await LocationService.getWardById(data.Ward)).data.attributes.Name,
          value: data.Ward,
        })
    
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addVoter = () => {
    setLoading(true)

    const requiredData = {
      Title: title?.value,
      Name: name,
      NIC_Number: nic,
      Occupation: occupation?.value,
      Date_of_Birth: new Date(dob),
      Gender: gender?.value,
      Address: address,
      Civil_Status: civilStatus?.value,
      Mobile_Number_1: mobileNo,
      District: district?.value,
      District_Organizer: districtOrganizer?.value,
      Seat: seat?.value,
      Seat_Organizer: seatOrganizer?.value,
      Local_Authority: localAuthority?.value,
      Ward: ward?.value,
      GN_Division: gnDivision?.value,
      Street_Village: streetVillage?.value,
      Programme_Authentication: selectedProgramme?.value,
      Location_Authentication: location?.value,
      Date_of_Programme_Conducted_Authentication: new Date(dop),
      Category_of_Programmes_Authentication: programmeDesc,
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
      Ward_Organizer_Authentication: wardOrganizer?.label,
      Ward_Organizer: wardOrganizer?.value,
      Local_Authority_Organizer: localAuthorityOrganizer?.value,
      GN_Division_Organizer: gnDivisionOrganizer?.value,
      Street_Village_Organizer: streetVillageOrganizer?.value,
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
      Ward: ward.value,
      GN_Division: gnDivision.value,
      Street_Village: streetVillage.value,
      Programme_Authentication: selectedProgramme.value,
      Location_Authentication: location.value,
      Date_of_Programme_Conducted_Authentication: new Date(dop),
      Category_of_Programmes_Authentication: programmeDesc,
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
      Ward_Organizer_Authentication: wardOrganizer?.label,
      Ward_Organizer: wardOrganizer?.value,
      Local_Authority_Organizer: localAuthorityOrganizer?.value,
      GN_Division_Organizer: gnDivisionOrganizer?.value,
      Street_Village_Organizer: streetVillageOrganizer?.value,
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

  console.log(seatOrganizerOptions)

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
              options={[
                { label: 'Mr.', value: 'Mr.' },
                { label: 'Mrs.', value: 'Mrs.' },
                { label: 'Ms.', value: 'Ms.' },
                { label: 'Miss', value: 'Miss' },
                { label: 'Dr.', value: 'Dr.' },
                { label: 'Prof.', value: 'Prof.' },
                { label: 'Rev.', value: 'Rev.' },
                { label: 'Hon.', value: 'Hon.' },
                { label: 'Sir', value: 'Sir' },
                { label: 'Madam', value: 'Madam' },
              ]}
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
            <CFormInput
              type="date"
              size="md"
              placeholder="Select..."
              style={{ width: 'auto', display: 'block', zIndex: 'no', width: '100%' }}
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
                  isDisabled={districtOrganizerOptions.length <= 1}
                  options={districtOrganizerOptions}
                  value={districtOrganizer}
                  onChange={(e) => setDistrictOrganizer(e)}
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
                  isDisabled={seatOrganizerOptions.length <= 1}
                  options={seatOrganizerOptions}
                  value={seatOrganizer}
                  onChange={(e) => setSeatOrganizer(e)}
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
                  isDisabled={localAuthorityOrganizerOptions.length <= 1}
                  options={localAuthorityOrganizerOptions}
                  value={localAuthorityOrganizer}
                  onChange={(e) => setLocalAuthorityOrganizer(e)}
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
                  isDisabled={wardOrganizerOptions.length <= 1}
                  options={wardOrganizerOptions}
                  value={wardOrganizer}
                  onChange={(e) => setWardOrganizer(e)}
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
                  isDisabled={GnDivisionOrganizerOptions.length <= 1}
                  options={GnDivisionOrganizerOptions}
                  value={gnDivisionOrganizer}
                  onChange={(e) => setGnDivisionOrganizer(e)}
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
                  isDisabled={streetVillageOrganizerOptions.length <= 1}
                  options={streetVillageOrganizerOptions}
                  value={streetVillageOrganizer}
                  onChange={(e) => setStreetVillageOrganizer(e)}
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
              disabled={true}
              id="exampleFormControlInput1"
              value={wardOrganizer?.label}
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
              options={locationOptions}
              value={location}
              onChange={(e) => setLocation(e)}
            ></Select>
          </CCol>

          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Date of Programme Conducted <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              type="date"
              size="md"
              placeholder="Select..."
              style={{ width: 'auto', display: 'block', zIndex: 'no', width: '100%' }}
              value={dop}
              onChange={(e) => setDop(e.target.value)}
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
