import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF,
} from '@coreui/react';
import { cilPeople, cilUser, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useAppSelector } from '../../hooks/redux';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.user);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Dashboard</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={6} lg={3}>
                <CWidgetStatsF
                  className="mb-3"
                  icon={<CIcon icon={cilPeople} height={24} />}
                  title="Total Users"
                  value={users.length.toString()}
                />
              </CCol>
              <CCol sm={6} lg={3}>
                <CWidgetStatsF
                  className="mb-3"
                  icon={<CIcon icon={cilUser} height={24} />}
                  title="Current User"
                  value={user?.username || 'Guest'}
                />
              </CCol>
              <CCol sm={6} lg={3}>
                <CWidgetStatsF
                  className="mb-3"
                  icon={<CIcon icon={cilLockLocked} height={24} />}
                  title="Role"
                  value={user?.role || 'N/A'}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard; 