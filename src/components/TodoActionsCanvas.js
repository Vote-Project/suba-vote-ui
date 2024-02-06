import {
  CCard,
  CCardBody,
  CCloseButton,
  CCol,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
} from '@coreui/react'
import React from 'react'
import { COLORS } from 'src/common/const'

function TodoActionsCanvas({ visible, setVisible, id = null, page = 1, setAction }) {
  return (
    <COffcanvas
      backdrop={true}
      placement="bottom"
      scroll={true}
      style={{ height: 'auto' }}
      visible={visible}
      onHide={() => setVisible(false)}
    >
      <COffcanvasHeader>
        <COffcanvasTitle>Select Your Action</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
      </COffcanvasHeader>
      <COffcanvasBody>
        <CRow>
          {page == 1 ? (
            <CCol>
              <CCard
                className=" mb-3 p-3"
                style={{ border: `solid ${COLORS.MAIN}` }}
                onClick={() => setAction('In-progress')}
              >
                <CCardBody
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: COLORS.MAIN, fontSize: '3em' }}
                  >
                    play_circle
                  </span>
                  <div>
                    <span className="mt-3 fs-5" style={{ fontWeight: 'bold' }}>
                      Start Task
                    </span>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ) : (
            <CCol xs={6}>
              <CCard
                className=" mb-3 p-3"
                style={{ border: `solid ${COLORS.MAIN}` }}
                onClick={() => setAction('Initiate')}
              >
                <CCardBody
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: COLORS.MAIN, fontSize: '3em' }}
                  >
                    refresh
                  </span>
                  <div>
                    <span className="mt-3 fs-5" style={{ fontWeight: 'bold' }}>
                    Revert Task
                    </span>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          )}
          {page == 2 && (
            <CCol xs={6}>
              <CCard
                className=" mb-3 p-3"
                style={{ border: `solid green` }}
                onClick={() => setAction('Initiate')}
              >
                <CCardBody
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'green', fontSize: '3em' }}
                  >
                    check_circle
                  </span>
                  <div>
                    <span className="mt-3 fs-5" style={{ fontWeight: 'bold' }}>
                    Complete Task
                    </span>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          )}
        </CRow>
        {page == 2 && (
          <CRow>
            <CCol xs={6}>
              <CCard
                className=" mb-3 p-3"
                style={{ border: `solid ${COLORS.DANGER_BTN}` }}
                onClick={() => setAction('Un-Successes')}
              >
                <CCardBody
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: COLORS.DANGER_BTN, fontSize: '3em' }}
                  >
                    cancel
                  </span>
                  <div>
                    <span className="mt-3 fs-5" style={{ fontWeight: 'bold' }}>
                      Cannot Complete
                    </span>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard
                className=" mb-3 p-3"
                style={{ border: `solid ${COLORS.MAIN}` }}
                onClick={() => setAction('Partial-Successes')}
              >
                <CCardBody
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: COLORS.MAIN, fontSize: '3em' }}
                  >
                    flaky
                  </span>
                  <div>
                    <span className="mt-3 fs-5" style={{ fontWeight: 'bold' }}>
                      Partially Complete
                    </span>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}

        <CRow></CRow>
      </COffcanvasBody>
    </COffcanvas>
  )
}

export default TodoActionsCanvas
