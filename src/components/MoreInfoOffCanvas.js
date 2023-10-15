import {
  CCloseButton,
  CLink,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { LocationService } from 'src/services/location.service'
const INITIAL_VALUE = ''

function MoreInfoOffCanvas({ title, type = 'voter', data, isMoreInfo, setIsMoreInfo }) {

  const [district, setDistrict] = useState(INITIAL_VALUE)
  const [seat, setSeat] = useState(INITIAL_VALUE)
  const [localAuthority, setLocalAuthority] = useState(INITIAL_VALUE)
  const [ward, setWard] = useState(INITIAL_VALUE)
  const [streetVillage, setStreetVillage] = useState(INITIAL_VALUE)
  const [gnDivision, setGnDivision] = useState(INITIAL_VALUE)


  useEffect(() => {
    console.log(data?.attributes.District)
    if(data) {
      LocationService.getDistrictById(data?.attributes.District).then((res) => setDistrict(res.data.attributes.Name))
      LocationService.getSeatById(data?.attributes.Seat).then((res) => setSeat(res.data.attributes.Name))
      LocationService.getLocalAuthorityById(data?.attributes.GN_Division).then((res) => setLocalAuthority(res.data.attributes.Name))
      LocationService.getWardById(data?.attributes.Ward).then((res) => setWard(res.data.attributes.Name))
      LocationService.getStreetById(data?.attributes.Street_Village).then((res) => setStreetVillage(res.data.attributes.Name))
      LocationService.getGnDivisionById(data?.attributes.GN_Division).then((res) => setGnDivision(res.data.attributes.Name))

    }

  }, [data])
  

  return (
    <COffcanvas
      backdrop={true}
      placement="end"
      scroll={true}
      visible={isMoreInfo}
      onHide={() => setIsMoreInfo(false)}
    >
      <COffcanvasHeader>
        <COffcanvasTitle>{title + ` (ID - ${data?.id})`}</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={() => setIsMoreInfo(false)} />
      </COffcanvasHeader>
      <COffcanvasBody>
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Name</span>
          <span>{data?.attributes.Title + ' ' + data?.attributes.Name || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>NIC Number</span>
          <span>{data?.attributes.NIC_Number || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Occupation</span>
          <span>{data?.attributes.Occupation || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>NJP_Party_Member</span>
          <span>{data?.attributes.NJP_Party_Member ? 'Yes' : 'No'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Date_of_Birth</span>
          <span>{data?.attributes.Date_of_Birth || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Gender</span>
          <span>{data?.attributes.Gender || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Address</span>
          <span>{data?.attributes.Address || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Civil_Status</span>
          <span>{data?.attributes.Civil_Status || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Mobile No</span>
          {data?.attributes.Mobile_Number_1 ? (
            <a href={`tel:${data?.attributes.Mobile_Number_1}`}>
              {data?.attributes.Mobile_Number_1 || '-'}
            </a>
          ) : (
            <span>-</span>
          )}
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Mobile No (2)</span>
          {data?.attributes.Mobile_Number_2 ? (
            <a href={`tel:${data?.attributes.Mobile_Number_2}`}>
              {data?.attributes.Mobile_Number_2 || '-'}
            </a>
          ) : (
            <span>-</span>
          )}
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>WhatsApp No</span>
          {data?.attributes.WhatsApp_Number ? (
            <a href={`tel:${data?.attributes.WhatsApp_Number}`}>
              {data?.attributes.WhatsApp_Number || '-'}
            </a>
          ) : (
            <span>-</span>
          )}
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Facebook_Link</span>
          {data?.attributes.WhatsApp_Number ? (
            <a href={data?.attributes.Facebook_Link}>{data?.attributes.Facebook_Link || ''}</a>
          ) : (
            <span>-</span>
          )}
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>District</span>
          <span>{ district || '-'}</span>
        </CRow>
        <hr />

        {type == 'voter' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>District Organizer</span>
              <span>{data?.attributes.District_Organizer || '-'}</span>
            </CRow>
            <hr />
          </>
        )}
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Seat</span>
          <span>{seat || '-'}</span>
        </CRow>
        <hr />

        {type == 'voter' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Seat Organizer</span>
              <span>{data?.attributes.Seat_Organizer || '-'}</span>
            </CRow>
            <hr />
          </>
        )}
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Local Authority</span>
          <span>{localAuthority || '-'}</span>
        </CRow>
        <hr />

        {type == 'voter' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Local Authority Organizer</span>
              <span>{data?.attributes.Local_Authority_Organizer || '-'}</span>
            </CRow>
            <hr />
          </>
        )}
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Ward</span>
          <span>{ward || '-'}</span>
        </CRow>
        <hr />

        {type == 'voter' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Ward Organizer</span>
              <span>{data?.attributes.Ward_Organizer || '-'}</span>
            </CRow>
            <hr />
          </>
        )}
        <CRow>
          <span style={{ fontWeight: 'bold' }}>GN Division</span>
          <span>{gnDivision || '-'}</span>
        </CRow>
        <hr />

        {type == 'voter' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>GN Division Organizer</span>
              <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
            </CRow>
            <hr />
          </>
        )}
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Street Village</span>
          <span>{streetVillage || '-'}</span>
        </CRow>
        <hr />
        {type == 'voter' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Street Village Organizer</span>
              <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
            </CRow>
            <hr />
          </>
        )}

        {type == 'voter' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Program Ward Organizer</span>
              <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
            </CRow>
            <hr />
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Program</span>
              <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
            </CRow>
            <hr />
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Location</span>
              <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
            </CRow>
            <hr />
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Date of Program Conducted</span>
              <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
            </CRow>
            <hr />
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Program Description</span>
              <span>{data?.attributes.Program_Description || '-'}</span>
            </CRow>
          </>
        )}
        {type == 'organizer' && (
          <>
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Level of Strength</span>
              <span>{data?.attributes.Level_of_Strength || '-'}</span>
            </CRow>
            <hr />
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Organizer Category</span>
              <span>{data?.attributes.Organizer_Category || '-'}</span>
            </CRow>
            <hr />
            <CRow>
              <span style={{ fontWeight: 'bold' }}>Political Background</span>
              <span>{data?.attributes.Political_Background || '-'}</span>
            </CRow>
          </>
        )}
      </COffcanvasBody>
    </COffcanvas>
  )
}

export default MoreInfoOffCanvas
