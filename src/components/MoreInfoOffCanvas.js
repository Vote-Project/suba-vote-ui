import {
  CCloseButton,
  CLink,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
} from '@coreui/react'
import React from 'react'

function MoreInfoOffCanvas({ title, type = 'voter', data, isMoreInfo, setIsMoreInfo }) {
  return (
    <COffcanvas
      backdrop={true}
      placement="end"
      scroll={true}
      visible={isMoreInfo}
      onHide={() => setIsMoreInfo(false)}
    >
      <COffcanvasHeader>
        <COffcanvasTitle>{title}</COffcanvasTitle>
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
            <a href={`tel:${data?.attributes.WhatsApp_Number}`}>{data?.attributes.WhatsApp_Number || '-'}</a>
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
          <span>{data?.attributes.District || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>District Organizer</span>
          <span>{data?.attributes.District_Organizer || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Seat</span>
          <span>{data?.attributes.Seat || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Seat Organizer</span>
          <span>{data?.attributes.Seat_Organizer || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Local Authority</span>
          <span>{data?.attributes.Local_Authority || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Local Authority Organizer</span>
          <span>{data?.attributes.Local_Authority_Organizer || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Ward</span>
          <span>{data?.attributes.Ward || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Ward Organizer</span>
          <span>{data?.attributes.Ward_Organizer || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>GN Division</span>
          <span>{data?.attributes.GN_Division || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>GN Division Organizer</span>
          <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Street Village</span>
          <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
        </CRow>
        <hr />
        <CRow>
          <span style={{ fontWeight: 'bold' }}>Street Village Organizer</span>
          <span>{data?.attributes.GN_Division_Organizer || '-'}</span>
        </CRow>
        <hr />
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
