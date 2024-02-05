import {
  CCloseButton,
  CCol,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
} from '@coreui/react'
import React from 'react'

function LocationCanvas({ visibleLocation, setVisibleLocation, orgID }) {
  return (
    <COffcanvas
      backdrop={true}
      placement="end"
      scroll={true}
      visible={visibleLocation}
      onHide={() => setVisibleLocation(false)}
    >
      <COffcanvasHeader>
        <COffcanvasTitle>Location Tracking</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={() => setVisibleLocation(false)} />
      </COffcanvasHeader>
      <COffcanvasBody>
        <CRow><CCol><p>Last known location: 5 min ago</p></CCol></CRow>
        <CRow>
          <CCol>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15845.696386200647!2d79.94304551171565!3d6.839651413702712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2504ae05ec5ab%3A0x3a80b00229a71067!2sKottawa%20Town%2C%20Pannipitiya!5e0!3m2!1sen!2slk!4v1707138648749!5m2!1sen!2slk"
              width="100%"
              height="450"
              style={{ border: 1, borderRadius: '5%' }}
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </CCol>
        </CRow>
        <CRow></CRow>
      </COffcanvasBody>
    </COffcanvas>
  )
}

export default LocationCanvas
