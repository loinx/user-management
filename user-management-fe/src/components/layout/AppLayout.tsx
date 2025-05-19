import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import { cilMenu, cilUser, cilPeople, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';

const AppLayout: React.FC = () => {
  const [sidebarShow, setSidebarShow] = useState(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <CHeader className="header header-sticky mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => setSidebarShow(!sidebarShow)}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            Admin Template
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink to="/dashboard" component={Link}>
                Dashboard
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              <CNavLink onClick={handleLogout}>
                Logout
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
      </CHeader>
      <div className="body flex-grow-1 px-3">
        <CContainer fluid>
          <CSidebar
            position="fixed"
            visible={sidebarShow}
            onVisibleChange={(visible) => setSidebarShow(visible)}
          >
            <CSidebarBrand className="d-none d-md-flex">
              Admin Template
            </CSidebarBrand>
            <CSidebarNav>
              <CNavItem href="/dashboard">
                <CIcon icon={cilMenu} customClassName="nav-icon" />
                Dashboard
              </CNavItem>
              <CNavItem href="/users">
                <CIcon icon={cilPeople} customClassName="nav-icon" />
                Users
              </CNavItem>
              <CNavItem href="/profile">
                <CIcon icon={cilUser} customClassName="nav-icon" />
                Profile
              </CNavItem>
              <CNavItem href="/change-password">
                <CIcon icon={cilLockLocked} customClassName="nav-icon" />
                Change Password
              </CNavItem>
            </CSidebarNav>
            <CSidebarToggler
              className="d-none d-lg-flex"
              onClick={() => setSidebarShow(!sidebarShow)}
            />
          </CSidebar>
          <main className="c-main">
            <Outlet />
          </main>
        </CContainer>
      </div>
    </div>
  );
};

export default AppLayout; 