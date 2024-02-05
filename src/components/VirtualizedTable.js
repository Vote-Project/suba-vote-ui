import React from 'react'
import { VariableSizeList  } from 'react-window';

const VirtualizedTable = ({ data, columns }) => {
    const rowHeight = 80;
    // Row renderer function
    const Row = ({ index, style }) => {
      
      return <div style={{ ...style, display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
        {columns?.map((column, i) => (
          <div key={i} style={{ flex: 1, padding: '5px', textAlign: 'left' }}>{data[index].attributes[column.value]}</div>
        ))}
        
        
        {/* Add other columns based on your data structure */}
      </div>
    };

    const calculateRowHeight = index => {
      const name = data[index].attributes.Name;
      const nic = data[index].attributes['NIC_Number'];
      const mobile = data[index].attributes['Mobile_Number_1'];
      const address = data[index].attributes['Address'];
  
      // Calculate the maximum length among the columns
      const maxLength = Math.max(name.length, nic.length, mobile.length, address.length);
  
      // Adjust the factor as needed for your specific case
      //const factor = 2.5;
      const factor = window.innerWidth < 600 ? 2.9 : 1;
      
      // Minimum row height is set to 50 pixels
      return Math.max(30, maxLength * factor);
    };
    return (
      <VariableSizeList
        height={400}
        itemCount={data.length}
        itemSize={calculateRowHeight}
        width={'auto'}
      >
        {Row}
      </VariableSizeList>
    );
  };

  export default VirtualizedTable