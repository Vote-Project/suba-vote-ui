import React, { useState } from 'react'
import jsPDF from 'jspdf'
import VirtualizedTable from './VirtualizedTable'
import { CLIENT_NAME, COLORS } from 'src/common/const'
import { CButton, CCol, CFormLabel, CFormText } from '@coreui/react'
import Select from 'react-select'
import { exportToExcel } from 'react-json-to-excel'
import { LocationService } from 'src/services/location.service'
import { OrganizersService } from 'src/services/organizers.service'

const options = [
  { value: 'Name', label: 'Name', rectVal: 100, textVal: 105, align: 'left' },
  { value: 'NIC_Number', label: 'NIC', rectVal: 30, textVal: 25, align: 'center' },
  { value: 'Mobile_Number_1', label: 'Contact No.', rectVal: 30, textVal: 30, align: 'center' },
  { value: 'Gender', label: 'Gender', rectVal: 30, textVal: 25, align: 'center' },
  { value: 'Civil_Status', label: 'Civil Status', rectVal: 30, textVal: 25, align: 'center' },
  { value: 'Address', label: 'Address', rectVal: 30, textVal: 25, align: 'left' },
]

const PdfDocument = ({ data, type }) => {
  const [selectedOption, setSelectedOption] = useState([
    { value: 'Name', label: 'Name', rectVal: 100, textVal: 105, align: 'left' },
    { value: 'NIC_Number', label: 'NIC', rectVal: 30, textVal: 25, align: 'center' },
    { value: 'Mobile_Number_1', label: 'Contact No.', rectVal: 30, textVal: 30, align: 'center' },
  ])

  const [loadingMsg, setLoadingMsg] = useState(null)
  const [downloadButtonDisable, setDownloadButtonDisable] = useState(false)

  const generatePdf = () => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' })
    const pageHeight = pdf.internal.pageSize.height - 10 // Adjust for margin
    const cellWidth = 100

    let yPosition = 15
    pdf.text(CLIENT_NAME.toUpperCase(), 150, 5, { align: 'center', baseline: 'middle' })
    pdf.setFontSize(10)
    pdf.text('Report: ' + new Date().toLocaleDateString(), 150, 10, {
      align: 'center',
      baseline: 'middle',
    })
    pdf.setFontSize(12)

    // Draw table header
    pdf.setDrawColor(0) // Reset color
    let initialRectVal = 10
    let initialTextVal = 15
    selectedOption?.forEach((column, i) => {
      pdf.setFontSize(12)
      pdf.setFillColor(200, 220, 255)
      if (i == 0) {
        pdf.rect(initialRectVal, yPosition, cellWidth, 8, 'F')
        pdf.text(column.label, initialTextVal, yPosition + 5)
      } else {
        initialRectVal = initialRectVal + selectedOption[i - 1].rectVal
        initialTextVal = initialTextVal + selectedOption[i - 1].textVal
        if (column.label == 'Address') {
          pdf.rect(initialRectVal, yPosition, 100, 8, 'F')
        } else {
          pdf.rect(initialRectVal, yPosition, 30, 8, 'F')
        }

        pdf.text(column.label, initialTextVal, yPosition + 5)
      }
    })

    yPosition += 10 // Move to the next row

    // Iterate over each row and add it to the PDF
    data.forEach((row, index) => {
      const rowHeight = 7 // Adjust as needed
      if (yPosition + rowHeight > pageHeight) {
        // Start a new page
        pdf.addPage()
        yPosition = 10

        // Draw table header on each new page
        pdf.setDrawColor(0) // Reset color
        let initialRectVal_b = 10
        let initialTextVal_b = 15
        selectedOption?.forEach((column, i) => {
          pdf.setFillColor(200, 220, 255)
          if (i == 0) {
            pdf.rect(initialRectVal_b, yPosition, cellWidth, 8, 'F')
            pdf.text(column.label, initialTextVal_b, yPosition + 5)
          } else {
            initialRectVal_b = initialRectVal_b + selectedOption[i - 1].rectVal
            initialTextVal_b = initialTextVal_b + selectedOption[i - 1].textVal
            if (column.label == 'Address') {
              pdf.rect(initialRectVal_b, yPosition, 100, 8, 'F')
            } else {
              pdf.rect(initialRectVal_b, yPosition, 30, 8, 'F')
            }

            pdf.text(column.label, initialTextVal_b, yPosition + 5)
          }
        })

        yPosition += 10 // Move to the next row
      }
      pdf.setFontSize(10)

      // Draw cell content
      let initialRectVal_b = 10
      let initialTextVal_b = 15
      selectedOption?.forEach((column, i) => {
        if (i == 0) {
          pdf.rect(initialRectVal_b, yPosition, cellWidth, rowHeight)
          pdf.text(row.attributes[column.value], initialTextVal_b, yPosition + rowHeight / 2, {
            align: column.align,
            baseline: 'middle',
          })
        } else {
          initialRectVal_b = initialRectVal_b + selectedOption[i - 1].rectVal
          initialTextVal_b = initialTextVal_b + selectedOption[i - 1].textVal + 5

          if (column.value == 'Address') {
            pdf.rect(initialRectVal_b, yPosition, 100, rowHeight)
            pdf.text(
              row.attributes[column.value],
              initialTextVal_b - 10,
              yPosition + rowHeight / 2,
              {
                align: column.align,
                baseline: 'middle',
              },
            )
          } else {
            pdf.rect(initialRectVal_b, yPosition, 30, rowHeight)
            pdf.text(row.attributes[column.value], initialTextVal_b, yPosition + rowHeight / 2, {
              align: column.align,
              baseline: 'middle',
            })
          }
        }
      })

      // Add other columns based on your data structure

      yPosition += rowHeight
    })

    // Save or download the PDF
    pdf.save(`Report_${new Date().toLocaleString()}.pdf`)
  }

  const downloadAsExcel = async () => {
    setDownloadButtonDisable(true)
    let filteredData = data.map((item) => item.attributes)
    const totalItems = filteredData.length
    let completedItems = 0
    setLoadingMsg(null)

    const newData = await Promise.all(
      filteredData.map(async (item) => {
        try {
          item.NJP_Party_Member = item.NJP_Party_Member ? 'Yes' : 'No'
          item.Meeting_Complete = item.Meeting_Complete ? 'Yes' : 'No'
          item.District = (
            await LocationService.getDistrictById(item.District)
          ).data.attributes.Name
          item.Seat = (await LocationService.getSeatById(item.Seat)).data.attributes.Name
          item.Local_Authority = (
            await LocationService.getLocalAuthorityById(item.Local_Authority)
          ).data.attributes.Name
          item.Ward = (await LocationService.getWardById(item.Ward)).data.attributes.Name
          item.Street_Village = (
            await LocationService.getStreetById(item.Street_Village)
          ).data.attributes.Name
          item.GN_Division = (
            await LocationService.getGnDivisionById(item.GN_Division)
          ).data.attributes.Name

          if(type == 'voter') {
            item.District_Organizer = (
              await OrganizersService.getOrganizer(item.District_Organizer)
            ).data.attributes.Name
            item.Street_Village_Organizer = (
              await OrganizersService.getOrganizer(item.Street_Village_Organizer)
            ).data.attributes.Name
            item.Seat_Organizer = (
              await OrganizersService.getOrganizer(item.Seat_Organizer)
            ).data.attributes.Name
            item.Local_Authority_Organizer = (
              await OrganizersService.getOrganizer(item.Local_Authority_Organizer)
            ).data.attributes.Name
            item.Ward_Organizer = (
              await OrganizersService.getOrganizer(item.Ward_Organizer)
            ).data.attributes.Name
            item.GN_Division_Organizer = (
              await OrganizersService.getOrganizer(item.GN_Division_Organizer)
            ).data.attributes.Name
          }

          completedItems += 1

          // Calculate loading percentage
          const loadingPercentage = (completedItems / totalItems) * 100
          setLoadingMsg(`Loading: ${loadingPercentage.toFixed(2)}%`)
          setDownloadButtonDisable(false)
          return item
        } catch (err) {
          console.error(err)
          setLoadingMsg('Please Genarate Report Again')
          setDownloadButtonDisable(false)
          return item // You might want to handle the error differently or skip the item
        }
      }),
    )

    exportToExcel(newData, `Full_Report_${new Date().toLocaleString()}`)
  }

  return (
    <div className="mt-4">
      <div className="mt-2" id="print-table-container">
        <h3>Preview Records</h3>

        <CCol xs="12" sm="6">
          <CFormLabel htmlFor="columns-sel"> Select Columns: (For PDF Document) </CFormLabel>
          <Select
            id="columns-sel"
            className="mb-4"
            isMulti
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </CCol>
        <VirtualizedTable data={data} columns={selectedOption} />
      </div>
      <div className="mt-2 gap-3 d-flex justify-content-end">
        <CButton
          size="sm"
          className="ml-auto"
          style={{ width: '150px', backgroundColor: COLORS.MAIN, border: '0px' }}
          onClick={generatePdf}
          disabled={downloadButtonDisable}
        >
          Download PDF
        </CButton>
        <CButton
          size="sm"
          className="ml-auto"
          style={{ width: '150px', backgroundColor: COLORS.MAIN, border: '0px' }}
          onClick={downloadAsExcel}
          disabled={downloadButtonDisable}
        >
          Download Excel <br></br>(Full Report)
        </CButton>
      </div>
      <div className="mt-2 gap-3 d-flex justify-content-end">
        <p>{loadingMsg}</p>
      </div>
     
      <CCol xs="12" sm="8" style={{backgroundColor: COLORS.LIGHT , padding: "20px", borderRadius: '10px'}}>
      <p>Excel Tips:</p>
        <ul>
          <li>
            Ctrl + a to select all and Alt + H, then O, and then I. You can auto fit all the columns
            width.
          </li>
          <li>Ctrl + L to aligns the line or selected text to the left of the screen.</li>
        </ul>
      </CCol>
    </div>
  )
}

export default PdfDocument
