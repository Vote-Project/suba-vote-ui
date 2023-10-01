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
import React, { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'rsuite/DatePicker'
import 'rsuite/dist/rsuite.min.css'
import { jsonToSelectBox } from 'src/common/common'
import { COLORS, MODAL_MSGES } from 'src/common/const'
import SuccessModal from 'src/components/Modals/SuccessModal'
import OccupationList from 'src/data/Occupations.json'

const INITIAL_VALUE = ''

function AddEditVoter() {
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
  const [districtOrganizer, setDistrictOrganizer] = useState(INITIAL_VALUE)
  const [streetVillageOrganizer, setStreetVillageOrganizer] = useState(INITIAL_VALUE)
  const [seatOrganizer, setSeatOrganizer] = useState(INITIAL_VALUE)
  const [localAuthorityOrganizer, setLocalAuthorityOrganizer] = useState(INITIAL_VALUE)
  const [wardOrganizer, setWardOrganizer] = useState(INITIAL_VALUE)
  const [gnDivisionOrganizer, setGnDivisionOrganizer] = useState(INITIAL_VALUE)

  const [alertMessage, setAlertMessage] = useState('Please Fill All Required Fields')
  const [successMsg, setSuccessMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const addVoter = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccessMsg(true)
    }, 1000)
  }

  const editVoter = () => {}

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
      <SuccessModal
        open={successMsg}
        onOpen={(value) => setSuccessMsg(value)}
        title={'Successful Operation'}
        description={MODAL_MSGES.VOTERS.ADD_SUCCESS_MSG}
        rediretUrl={'/voters'}
        addAnother={() => resetValues()}
      />
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>Voter Configaration</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <h6 style={{ color: COLORS.MAIN }}>Add New Voter</h6>
        </CRow>
        <span style={{ color: 'grey', fontWeight: 'bold', color: COLORS.MAIN }}>
          Personal Information
        </span>
        <hr style={{ borderTop: '2px solid ' + COLORS.MAIN }} />
        <CRow className="mb-2">
          <CCol md={2}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Title
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              options={[{ label: 'Mr.', value: 'Mr.' }]}
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Name
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
              Date of Birth
            </CFormLabel>
            <DatePicker

              size="md"
              placeholder="Select..."
              style={{ width: "auto", display: 'block', marginBottom: 10, zIndex: "no" }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </CCol>
        
        </CRow>
        <CRow className="mb-2">
          <CCol md={2}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Gender
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
              Occupation
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
              value={civilStatus}
              onChange={(e) => setCivilStatus(e)}
            ></Select>
          </CCol>
        </CRow>

        <CRow className="mb-4">
          <CCol md={7}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Address
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
              NIC Number
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: 9837......"
              value={nic}
              style={{zIndex: 100}}
              onChange={(e) => setNic(e.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              NJP Party Member?
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
              Mobile Number (1)
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
                  District
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
                  Seat
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
                  Local Authority
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
                  Ward
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
                  Street Village
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
                  GN Division
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
          <CCol style={{ backgroundColor: COLORS.LIGHT, borderRadius: '10px' }} className="p-3">
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  District Organizer
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="District Organizer"
                  disabled={true}
                  value={districtOrganizer}
                  onChange={(e) => setDistrictOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Seat Organizer
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Seat Organizer"
                  disabled={true}
                  value={seatOrganizer}
                  onChange={(e) => setSeatOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Local Authority Organizer
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Local Organizer"
                  disabled={true}
                  value={localAuthorityOrganizer}
                  onChange={(e) => setLocalAuthorityOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Ward Organizer
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Ward Organizer"
                  disabled={true}
                  value={wardOrganizer}
                  onChange={(e) => setWardOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Street Village Organizer
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="Street Village Organizer"
                  disabled={true}
                  value={streetVillageOrganizer}
                  onChange={(e) => setStreetVillageOrganizer(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  GN Division Organizer
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  size="md"
                  placeholder="GN Division Organizer"
                  disabled={true}
                  value={gnDivisionOrganizer}
                  onChange={(e) => setGnDivisionOrganizer(e.target.value)}
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
              Ward Organizer
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              size="md"
              placeholder="Ward Organizer"
              disabled={true}
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Category of Programmes
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
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Date of Programme Conducted
            </CFormLabel>
            <DatePicker
              size="md"
              placeholder="Select..."
              style={{ width: 400, display: 'block', marginBottom: 10 }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </CCol>
          
        </CRow>
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Location
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
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Programme
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
            ></Select>
          </CCol>
        </CRow>

        <CAlert color="warning" className="d-flex align-items-center mt-3">
          <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>{alertMessage}</div>
        </CAlert>
        <CRow
          className="mt-4"
          style={{ position: 'sticky', bottom: '1rem', alignSelf: 'flex-end' }}
        >
          <CCol md={2}>
            <CButton
              disabled={loading}
              color="primary"
              style={{ width: '100%', backgroundColor: COLORS.MAIN, border: '0px' }}
              onClick={() => addVoter()}
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

export default AddEditVoter
