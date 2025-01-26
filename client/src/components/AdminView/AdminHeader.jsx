import React, { useState } from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Swal from "sweetalert2";

const AdminHeader = ({ setOpen }) => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
    Swal.fire({
      title: "Logout Successfully",
      imageUrl:
        "http://res.cloudinary.com/dwrhqimh9/image/upload/v1737358260/kb90vz3s5qqqdcx4tuzi.jpg",
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "whimsy bags logo",
    });
  }
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button
          onClick={() => {
            setLogoutAlert(true);
          }}
          className="inline-flex gap-2 items-center rounded-md px-4 py2 text-sm font-medium shadow"
        >
          Logout
          <LogOut />
        </Button>
      </div>
      <Dialog open={logoutAlert} onOpenChange={setLogoutAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setLogoutAlert(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleLogout();
                setLogoutAlert(false);
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHeader;
