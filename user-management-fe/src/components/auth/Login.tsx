import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/slices/authSlice';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the auth slice
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    {error && <CAlert color="danger">{error}</CAlert>}
                    <Formik
                      initialValues={{ username: '', password: '' }}
                      validationSchema={loginSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <Field
                              as={CFormInput}
                              name="username"
                              placeholder="Username"
                              autoComplete="username"
                            />
                          </CInputGroup>
                          {errors.username && touched.username && (
                            <div className="text-danger">{errors.username}</div>
                          )}

                          <CInputGroup className="mb-4">
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <Field
                              as={CFormInput}
                              type="password"
                              name="password"
                              placeholder="Password"
                              autoComplete="current-password"
                            />
                          </CInputGroup>
                          {errors.password && touched.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}

                          <CRow>
                            <CCol xs={6}>
                              <CButton
                                type="submit"
                                color="primary"
                                className="px-4"
                                disabled={loading}
                              >
                                {loading ? 'Loading...' : 'Login'}
                              </CButton>
                            </CCol>
                          </CRow>
                        </Form>
                      )}
                    </Formik>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login; 