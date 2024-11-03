import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import UserForm from '../components/UserForm';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Home() {
  const [editingUser, setEditingUser] = useState(null);
  const { data: users, error } = useSWR('/api/users', fetcher);

  const createUser = async (userData) => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      mutate('/api/users');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      setEditingUser(null);
      mutate('/api/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      mutate('/api/users');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">Failed to load users</div>
    </div>
  );
  
  if (!users) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Create, view, edit, and delete users</p>
        </div>
        
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingUser ? 'Edit User' : 'Create New User'}
            </h2>
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? updateUser : createUser}
              buttonText={editingUser ? 'Update User' : 'Create User'}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Users</h2>
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No users found. Create one above!</p>
            ) : (
              users.map(user => (
                <div 
                  key={user.id} 
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}