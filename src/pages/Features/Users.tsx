import { useEffect, useState } from "react";

import usersService from "../../core/api/users.service";
import { InfinitySpin } from "react-loader-spinner";
import type { UsersModel } from "../../configs/models/users.model";
import TableComponent from "../../components/common-components/TableComponent";
import UpdateUserDialog from "../../components/dialog/UpdateUserDialog";
import AlertDialog from "../../components/dialog/AlertDialog";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Users = () => {
  const [userData, setUserData] = useState<UsersModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersModel | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await usersService.getAllUsers();
        if (response && response.data) {
          setUserData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log("error:", error);
      }
    };
    getUsers();
  }, []);
  const columns = [
    "id",
    "email",
    "name",
    "role",
    "avatar",
    "creationAt",
    "updatedAt",
  ];

  // Dummy handlers for edit and delete actions
  const onEdit = (row: UsersModel) => {
    setSelectedUser(row);
    setOpenUpdateDialog(true);
  };

  const onDelete = (row: UsersModel) => {
    setSelectedUser(row);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    const userId = selectedUser?.id;
    const updatedData  = userData.filter((item) => item.id !== userId)
    setUserData(updatedData)
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const onSubmit = async (data: UsersModel) => {
    try {
      setLoading(true);
      const updatedUser = await usersService.updateUser(
        selectedUser?.id || "",
        {
          email: data.email,
          name: data.name,
        }
      );
      if (updatedUser) {
        setLoading(false);
        setOpenUpdateDialog(false);
        const response = await usersService.getAllUsers();
        if (response && response.data) {
          setUserData(response.data);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {loading ? (
        <InfinitySpin width="1000" color="#4fa94d" />
      ) : (
        <>
          <h1 style={{ textAlign: "left", marginBottom: 16, marginTop:'20px'}}>User Management</h1>
          <UpdateUserDialog
            open={openUpdateDialog}
            handleModal={setOpenUpdateDialog}
            onSubmit={onSubmit}
            email={selectedUser?.email}
            name={selectedUser?.name}
          />
          <AlertDialog
            open={openDeleteDialog}
            handleAlert={setOpenDeleteDialog}
            confirmAction={confirmDelete}
            title={"Confirm delete"}
            content={"Are you sure you want to delete this user?"}
          />
          <Box sx={{ border:2, borderColor:'#eee'}}>
            <Paper >
          <TableComponent
            columns={columns}
            userData={userData}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          </Paper>
          </Box>
        </>
      )}
    </>
  );
};

export default Users;
