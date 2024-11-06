// src/pages/admin/UserListPage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import {
  Typography,
  Button,
  Select,
  Option,
  Card,
  CardBody,
  Alert,
} from "@material-tailwind/react";

const UserListPage = () => {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [updateUser, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateUserMutation();
  const loggedInUserId = useSelector((state) => state.auth.userData._id);
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users.</div>;

  const users = Array.isArray(data) ? data : data?.users || [];

  const handleEditClick = (userId, currentRole) => {
    setEditUserId(userId);
    setNewRole(currentRole);
    setFeedbackMessage("");
  };

  const handleSaveClick = async (userId) => {
    try {
      await updateUser({ id: userId, role: newRole }).unwrap();
      setFeedbackMessage("Role updated successfully.");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setFeedbackMessage("Failed to update role.");
    }
    setEditUserId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
        User List
      </Typography>

      {feedbackMessage && (
        <Alert
          color={isError ? "red" : "green"}
          className="mb-4"
          onClose={() => setFeedbackMessage("")}
        >
          {feedbackMessage}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user._id}
            className={`p-4 shadow-md ${
              user._id === loggedInUserId
                ? "border-2 border-blue-500 bg-blue-50"
                : "bg-white"
            }`}
          >
            <CardBody>
              <div className="flex items-center justify-between">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-bold"
                >
                  {user.firstName} {user.lastName}
                </Typography>
                {user._id === loggedInUserId && (
                  <Typography
                    variant="small"
                    color="blue"
                    className="font-semibold"
                  >
                    (You)
                  </Typography>
                )}
              </div>
              <Typography color="gray" className="mb-2">
                Email: {user.email}
              </Typography>
              <Typography color="gray" className="mb-2">
                Page Balance: {user.pageBalance}
              </Typography>
              <div className="flex items-center">
                <Typography color="gray" className="mr-2">
                  Role:
                </Typography>
                {editUserId === user._id ? (
                  <Select
                    value={newRole}
                    onChange={(value) => setNewRole(value)}
                    className="w-full"
                  >
                    <Option value="customer">Customer</Option>
                    <Option value="SPSO">SPSO</Option>
                  </Select>
                ) : (
                  <Typography color="blue-gray">{user.role}</Typography>
                )}
              </div>
              {user._id === loggedInUserId ? (
                <Typography variant="small" color="blue" className="mt-2">
                  You cannot edit your own role.
                </Typography>
              ) : editUserId === user._id ? (
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    color="blue"
                    size="sm"
                    onClick={() => handleSaveClick(user._id)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    color="gray"
                    size="sm"
                    onClick={() => setEditUserId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="mt-4 flex justify-end">
                  <Button
                    color="blue"
                    size="sm"
                    onClick={() => handleEditClick(user._id, user.role)}
                  >
                    Edit Role
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
