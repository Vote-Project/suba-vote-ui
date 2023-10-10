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
import React, { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'rsuite/DatePicker'
import 'rsuite/dist/rsuite.min.css'
import { getNullOrUndefinedAttributes, jsonToSelectBox } from 'src/common/common'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import SuccessModal from 'src/components/Modals/SuccessModal'
import OccupationList from 'src/data/Occupations.json'
import ProgrammesList from 'src/data/ProgrammeCategories.json'
import OrganizerCategories from 'src/data/OrganizerCategories.json'
import { OrganizersService } from 'src/services/organizers.service'

const INITIAL_VALUE = ''

function AddEditOrganizer() {
  //input fields
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

  const [levelOfStrength, setLevelOfStrength] = useState(INITIAL_VALUE)
  const [organizerCategory, setOrganizerCategory] = useState(INITIAL_VALUE)
  const [politicalBackground, setPoliticalBackground] = useState(INITIAL_VALUE)


  const [alertMessage, setAlertMessage] = useState('Please Fill All Required Fields')
  const [isAlert, setIsAlert] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const addOrganizer = () => {
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
      Seat: seat.value,
      Local_Authority: localAuthority.value,
      Ward: ward.value,
      GN_Division: gnDivision.value,
      Street_Village: streetVillage.value,
      Political_Background: politicalBackground.value,
      Organizer_Category: organizerCategory.value,
      Level_of_Strength: levelOfStrength.value
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

    OrganizersService
      .addOrganizer({ data })
      .then((res) => {
        console.log(res)
        setLoading(false)
        setSuccessMsg(true)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const editOrganizer = () => {}

  function resetValues() {
    setTitle(INITIAL_VALUE)
    setName(INITIAL_VALUE)
    setNic(INITIAL_VALUE)
    setGender(INITIAL_VALUE)
    setOccupation(INITIAL_VALUE)
    setCivilStatus(INITIAL_VALUE)
    setAddress(INITIAL_VALUE)
    setDob(INITIAL_VALUE)
    setIsNJP(false)
    setMobileNo(INITIAL_VALUE)
    setWhatsAppNo(INITIAL_VALUE)
    setMobileNoTwo(INITIAL_VALUE)
    setFbLink(INITIAL_VALUE)
    setDistrict(INITIAL_VALUE)
    setSeat(INITIAL_VALUE)
    setLocalAuthority(INITIAL_VALUE)
    setWard(INITIAL_VALUE)
    setStreetVillage(INITIAL_VALUE)
    setGnDivision(INITIAL_VALUE)
    setLevelOfStrength(INITIAL_VALUE)
    setOrganizerCategory(INITIAL_VALUE)
    setPoliticalBackground(INITIAL_VALUE)
  }

  return (
    <CCard className="mb-4">
      <SuccessModal
        open={successMsg}
        onOpen={(value) => setSuccessMsg(value)}
        title={'Successful Operation'}
        description={MODAL_MSGES.VOTERS.ADD_SUCCESS_MSG}
        rediretUrl={'/organizers'}
        addAnother={() => resetValues()}
      />
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>Organizer Configaration</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <h6 style={{ color: COLORS.MAIN }}>Add New Organizer</h6>
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
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Not Specify', value: 'Not Specify' },
                  ]}
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
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Not Specify', value: 'Not Specify' },
                  ]}
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
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Not Specify', value: 'Not Specify' },
                  ]}
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
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Not Specify', value: 'Not Specify' },
                  ]}
                  value={ward}
                  onChange={(e) => setWard(e)}
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
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Not Specify', value: 'Not Specify' },
                  ]}
                  value={streetVillage}
                  onChange={(e) => setStreetVillage(e)}
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
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Not Specify', value: 'Not Specify' },
                  ]}
                  value={gnDivision}
                  onChange={(e) => setGnDivision(e)}
                ></Select>
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
              Level of Strength <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="md"
              placeholder="Select..."
              options={[
                { label: 'Excellent', value: 'Excellent' },
                { label: 'Good', value: 'Good' },
                { label: 'Weak', value: 'Weak' },
              ]}
              onChange={(e) => setLevelOfStrength(e)}
              value={levelOfStrength}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Organizer Category <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="md"
              placeholder="Select..."
              options={jsonToSelectBox(OrganizerCategories, 'title')}
              onChange={(e) => setOrganizerCategory(e)}
              value={organizerCategory}
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol md={6}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Political Background <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={jsonToSelectBox(ProgrammesList, 'title')}
              value={politicalBackground}
              onChange={(e) => setPoliticalBackground(e)}
            ></Select>
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
              onClick={() => addOrganizer()}
            >
              Submit
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

export default AddEditOrganizer
