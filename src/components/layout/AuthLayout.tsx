import { useState, type ReactNode } from "react";
import Header from "./partials/Header";
import Sidebar from "./partials/Sidebar";
import { Button } from "@mui/material";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
    const [open, setOpen] = useState(false);
  return (
    <>
   
      <Header toggleDrawer={toggleDrawer} open={open} />
      <div style={{ display: "flex" }}>
        <Sidebar toggleDrawer={toggleDrawer} open={open} />
        <main style={{ flexGrow: 1, marginTop: '70px', maxWidth: '1700px', padding: 10, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>{children}</main>
      </div>
    </>
  );
};

export default AuthLayout;
