import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import User from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Logout } from "@mui/icons-material";
import storageService from "../../../core/services/storage.service";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../dialog/AlertDialog";
import UserIcon from "@mui/icons-material/PeopleAlt";
const Sidebar: React.FC<{
  toggleDrawer: (open: boolean) => void;
  open: boolean;
}> = ({ toggleDrawer, open }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const MenuList = [
    { text: "Dashboard", icon: <InboxIcon />, link: "/dashboard" },
    // { text: "Profile", icon: <User />, link: "/profile" },
    // { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
    { text: "Users", icon: <UserIcon />, link: "/users" },
    { text: "Logout", icon: <Logout />, link: "" },
  ];

  const handleAlert = (confirm: boolean) => {
    setOpenDialog(confirm);
  };

  const handleLogout = () => {
    handleAlert(true);
  };

  const confirmLogout = () => {
    handleAlert(false);
    storageService.remove("access_token");
    navigate("/login");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {MenuList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={
                item.text === "Logout" ? handleLogout : () => navigate(item.link) 
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <AlertDialog
        open={openDialog}
        handleAlert={handleAlert}
        confirmAction={confirmLogout}
        title={"Are you sure you want to log out?"}
        content={"Logging out will end your current session, and you will need to log in again to continue. Do you want to proceed?"}
      />
    </div>
  );
};

export default Sidebar;
