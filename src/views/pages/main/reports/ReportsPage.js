import { CCard, CCardBody, CCardHeader, CCol, CFormLabel, CRow } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { jsonToSelectBox } from 'src/common/common'
import ReportsTypes from 'src/data/ReportTypes.json'
import SearchCategories from 'src/data/SearchCategories.json'

function ReportsPage() {
  const [searchByCivilStatus, setSearchByCivilStatus] = useState(false)

  const [selectedReportType, setSelectedReportType] = useState(null)
  const [selectedSearchCategories, setSelectedSearchCategories] = useState([])

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <h5>Reports Managment</h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
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
          ))}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ReportsPage
