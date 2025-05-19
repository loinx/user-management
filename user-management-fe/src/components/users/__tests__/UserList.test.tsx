import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import UserList from '../UserList';
import { store } from '../../../store';
import { fetchUsers, deleteUser } from '../../../store/slices/userSlice';

// Mock the user slice
vi.mock('../../../store/slices/userSlice', () => ({
  fetchUsers: vi.fn(),
  deleteUser: vi.fn(),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUsers = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    role: 'USER',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

const renderUserList = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    </Provider>
  );
};

describe('UserList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchUsers as any).mockResolvedValueOnce({ payload: mockUsers });
  });

  it('renders user list', async () => {
    renderUserList();
    
    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    renderUserList();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    const errorMessage = 'Failed to fetch users';
    (fetchUsers as any).mockRejectedValueOnce(new Error(errorMessage));
    
    renderUserList();
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('handles user deletion', async () => {
    global.confirm = vi.fn(() => true);
    (deleteUser as any).mockResolvedValueOnce({ payload: { id: 1 } });
    
    renderUserList();
    
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
    });
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(global.confirm).toHaveBeenCalled();
    expect(deleteUser).toHaveBeenCalledWith(1);
  });

  it('navigates to edit user page', async () => {
    renderUserList();
    
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
    });
    
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    
    expect(mockNavigate).toHaveBeenCalledWith('/users/1/edit');
  });

  it('navigates to add user page', async () => {
    renderUserList();
    
    await waitFor(() => {
      expect(screen.getByText('Add User')).toBeInTheDocument();
    });
    
    const addButton = screen.getByRole('button', { name: /add user/i });
    fireEvent.click(addButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/users/new');
  });
}); 