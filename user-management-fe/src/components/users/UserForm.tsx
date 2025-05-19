import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createUser, updateUser, fetchUserById } from '../../store/slices/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .when('isNew', {
      is: true,
      then: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
  role: Yup.string().required('Role is required'),
});

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const { loading, error, currentUser } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchUserById(parseInt(id)));
    }
  }, [dispatch, id, isNew]);

  const formik = useFormik({
    initialValues: {
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      password: '',
      role: currentUser?.role || 'USER',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (isNew) {
          await dispatch(createUser(values)).unwrap();
        } else {
          await dispatch(updateUser({ id: parseInt(id!), ...values })).unwrap();
        }
        navigate('/users');
      } catch (err) {
        // Error handling is done in the slice
      }
    },
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isNew ? 'Create User' : 'Edit User'}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="role"
              name="role"
              select
              label="Role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </TextField>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate('/users')}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {isNew ? 'Create' : 'Update'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default UserForm; 