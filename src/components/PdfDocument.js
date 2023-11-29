import React from 'react'
import jsPDF from 'jspdf'
import moment from 'moment'
import html2pdf from 'html2pdf.js'
import VirtualizedTable from './VirtualizedTable'
import { CLIENT_NAME, COLORS } from 'src/common/const'
import { CButton } from '@coreui/react'

const PdfDocument = ({ data }) => {
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
    pdf.setFillColor(200, 220, 255)
    pdf.rect(10, yPosition, cellWidth, 8, 'F')
    pdf.text('Name', 15, yPosition + 5)
    pdf.setFillColor(200, 220, 255)
    pdf.rect(110, yPosition, 30, 8, 'F')
    pdf.text('NIC', 120, yPosition + 5)
    pdf.setFillColor(200, 220, 255)
    pdf.rect(140, yPosition, 30, 8, 'F')
    pdf.text('Contact No.', 145, yPosition + 5)

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
        pdf.setFillColor(200, 220, 255)
        pdf.rect(10, yPosition, cellWidth, 8, 'F')
        pdf.text('Name', 100, yPosition + 5)

        pdf.setFillColor(200, 220, 255)
        pdf.rect(110, yPosition, 30, 8, 'F')
        pdf.text('NIC', 100, yPosition + 5)

        pdf.setFillColor(200, 220, 255)
        pdf.rect(140, yPosition, 30, 8, 'F')
        pdf.text('Contact No.', 145, yPosition + 5)

        yPosition += 10 // Move to the next row
      }
      pdf.setFontSize(10)
      // Draw cell border
      pdf.rect(10, yPosition, cellWidth, rowHeight)
      pdf.rect(110, yPosition, 30, rowHeight)
      pdf.rect(140, yPosition, 30, rowHeight)
      // Draw cell content
      pdf.text(row.attributes.Name, 15, yPosition + rowHeight / 2, {
        align: 'left',
        baseline: 'middle',
      })
      pdf.text(row.attributes['NIC_Number'], 125, yPosition + rowHeight / 2, {
        align: 'center',
        baseline: 'middle',
      })
      pdf.text(row.attributes['Mobile_Number_1'], 155, yPosition + rowHeight / 2, {
        align: 'center',
        baseline: 'middle',
      })

      // Add other columns based on your data structure

      yPosition += rowHeight
    })

    // Save or download the PDF
    pdf.save(`Report_${new Date().toLocaleString()}.pdf`)
  }

  return (
    <div className="mt-4">
      <div className="mt-2" id="print-table-container">
        <h3>Preview Records</h3>
        <VirtualizedTable data={data} />
      </div>
      <div className="mt-2 justify-content-end">
        <CButton
          size="sm"
          style={{ width: '150px', backgroundColor: COLORS.MAIN, border: '0px' }}
          onClick={generatePdf}
        >
          Download PDF
        </CButton>
      </div>
    </div>
  )
}

export default PdfDocument
