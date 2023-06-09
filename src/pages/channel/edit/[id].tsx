import { addChannelMembers, getChannelById } from "@/provider/ChannelProvider";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { getAllUsers, getCurrentUserInfo } from "@/provider/AuthProvider";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "react-toastify/dist/ReactToastify.css";

export default function EditChannel({
  users,
  idChannel,
  token,
  channel,
  currentUser,
}) {
  const router = useRouter();
  const { push } = router.query;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [idMembersToAdd, setIdMembersToAdd] = useState<number[]>();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = users
    ? users.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addChannelMembers(idChannel, token, { members: idMembersToAdd }).then(
      (res) => {
        console.log(res.data);
        toast.success("Users added succesfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  useEffect(() => {
    console.log("selec  " + selectedIds);
    setIdMembersToAdd(selectedIds);
  }, [selectedIds]);

  return (
    <>
      <Navbar
        handleSideBarOpen={handleToggle}
        title={channel.name}
        userName={currentUser.name}
      />
      <Sidebar handleClose={handleToggle} isOpen={isSideBarOpen} />
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          width: "30vw",
          margin: " 100px auto",
        }}
      >
        <TextField
          label="Search by username"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ marginBottom: "16px" }}
        />
        <List style={{ height: "45vh", overflow: "auto" }}>
          {filteredItems.map((item) => (
            <ListItem key={item.id}>
              <FormControlLabel
                control={<Checkbox />}
                label={<ListItemText primary={item.name} />}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(event, item.id)
                }
                checked={selectedIds.includes(item.id)}
              />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            width: "10vw",
            marginTop: "20px",
            marginLeft: "280px",
          }}
        >
          <Button
            type={"submit"}
            variant={"contained"}
            endIcon={<PersonAddIcon />}
            sx={{ fontSize: "12px" }}
          >
            Add members
          </Button>
        </Box>
        <ToastContainer style={{ zIndex: "999999" }} />
      </Box>
    </>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const token = req.cookies.token;
  const { id } = params;
  if (!token) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  const channel = await getChannelById(id, token);
  const users = await getAllUsers(token);
  const currentUser = await getCurrentUserInfo(token);
  return {
    props: {
      channel,
      users,
      token,
      idChannel: id,
      currentUser,
    },
  };
}
