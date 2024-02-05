import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import VirtualizedTable from './VirtualizedTable'
import { CLIENT_NAME, COLORS } from 'src/common/const'
import { CButton, CCol, CFormLabel, CFormText } from '@coreui/react'
import Select from 'react-select'
import { exportToExcel } from 'react-json-to-excel'
import { LocationService } from 'src/services/location.service'
import { OrganizersService } from 'src/services/organizers.service'
import moment from 'moment'
import WarningModal from './Modals/WarningModal'

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

  const [warningModalVisible, setWarningModalVisible] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(null)
  const [downloadButtonDisable, setDownloadButtonDisable] = useState(false)

  const [sortedData, setSortedData] = useState(null)

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

  useEffect(() => {
    let filteredData = data.map((item) => item.attributes)
    const sortedDetails = filteredData.map((item) => {
      const sortedItem = {}

      // Specify the desired order of property names
      const propertyOrder = [
        'NIC_Number',
        'Title',
        'Name',
        'Gender',
        'Civil_Status',
        'Occupation',
        'Date_of_Birth',
        'NJP_Party_Member',
        'Address',
        'Mobile_Number_1',
        'Mobile_Number_2',
        'WhatsApp_Number',
        'Facebook_Link',
        'District',
        'Seat',
        'Local_Authority',
        'Ward',
        'GN_Division',
        'Street_Village',
        'Organizer_Category',
        'Level_of_Strength',
        'Political_Background',
        'Meeting_Complete',
        'Meeting_Date',
        'createdAt',
        'updatedAt',
        'publishedAt',
      ]

      // Sort the properties based on the specified order
      propertyOrder.forEach((property) => {
        if (item.hasOwnProperty(property)) {
          sortedItem[property] = item[property]
        }
      })

      return sortedItem
    })
    setSortedData(sortedDetails)
  }, [])

  const downloadAsExcel = async () => {
    setDownloadButtonDisable(true)

    const totalItems = sortedData.length
    let completedItems = 0
    setLoadingMsg(null)

    const processData = async () => {
      if (completedItems < totalItems) {
        const item = sortedData[completedItems]

        try {
          item.NJP_Party_Member = item.NJP_Party_Member ? 'Yes' : 'No'
          item.Meeting_Complete = item.Meeting_Complete ? 'Yes' : 'No'
          item.Date_of_Birth = moment(item.Date_of_Birth).format('DD-MM-YYYY')
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

          if (type == 'voter') {
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

          await new Promise((resolve) => setTimeout(resolve, 500))
          await processData() // Process the next item

          return item
        } catch (err) {
          console.error(err)
          setLoadingMsg('Please Genarate Report Again')
          setDownloadButtonDisable(false)
          return item // You might want to handle the error differently or skip the item
        }
      } else {
        // All items processed
        const newData = sortedData
        exportToExcel(newData, `Full_Report_${new Date().toLocaleString()}`)
        setDownloadButtonDisable(false)
      }
    }

    await processData() // Start processing

    // exportToExcel(newData, `Full_Report_${new Date().toLocaleString()}`)
    // setDownloadButtonDisable(false)
  }

  const calculateEstimation = () => {
    const estimation = ((0.5 * sortedData?.length) / 60).toFixed(2)

    var integerPart = parseInt(estimation);
    var decimalPart = ((estimation - integerPart).toFixed(2) * 100) * 60 / 100
    
    if(integerPart == 0) {
     return <span style={{fontWeight: 'bold'}}>{decimalPart.toFixed(0)} seconds. </span>
    }

    return <span style={{fontWeight: 'bold'}}>{integerPart} minutes and {decimalPart.toFixed(0)} seconds. </span>
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
          onClick={() => setWarningModalVisible(true)}
          disabled={downloadButtonDisable}
        >
          Download Excel <br></br>(Full Report)
        </CButton>
      </div>
      <div className="mt-2 gap-3 d-flex justify-content-end">
        <p>{loadingMsg}</p>
      </div>

      <CCol
        xs="12"
        sm="8"
        style={{ backgroundColor: COLORS.LIGHT, padding: '20px', borderRadius: '10px' }}
      >
        <p>Excel Tips:</p>
        <ul>
          <li>
            Ctrl + a to select all and Alt + H, then O, and then I. You can auto fit all the columns
            width.
          </li>
          <li>Ctrl + L to aligns the line or selected text to the left of the screen.</li>
        </ul>
      </CCol>
      <WarningModal
        open={warningModalVisible}
        onOpen={(status) => setWarningModalVisible(status)}
        okay={(status) => {
          if (status) {
            downloadAsExcel()
          }
        }}
        title={'Action Required!'}
        description={
          <div>
            The estimation time for file generation is {calculateEstimation()} If acceptable, please proceed.
          </div>
        }
      />
    </div>
  )
}

export default PdfDocument
