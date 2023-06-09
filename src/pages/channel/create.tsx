import Navbar from "../../components/NavBar";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UserData, UserMember } from "../../utils/type";
import { Add } from "@mui/icons-material";
import { createChannel } from "../../provider/ChannelProvider";
import { useRouter } from "next/router";
import BasicModal from "../../components/Modal";
import { getAllUsers, getCurrentUserInfo } from "@/provider/AuthProvider";

export default function CreateChannel({
  suggestedMembers,
  token,
  currentUser,
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [memberId, setMemberId] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [idMembersToAdd, setIdMembersToAdd] = useState<number[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const { push } = useRouter();

  const allMembersId = suggestedMembers.map((item: UserMember) => item.id);

  const handleToggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = suggestedMembers
    ? suggestedMembers.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const addChannel = async (channel: object) => {
    await createChannel(channel, token).then((response) =>
      push(`/channel/${response.data.channel.id}`)
    );
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name == "" || type == "") {
      handleModalOpen();
    } else {
      type === "private"
        ? addChannel({ name: name, type: type, members: idMembersToAdd }).then(
            () => console.log(idMembersToAdd)
          )
        : addChannel({ name: name, type: type, members: allMembersId });
      console.log(memberId);
    }
  };

  useEffect(() => {
    console.log("selec  " + selectedIds);
    setIdMembersToAdd(selectedIds);
  }, [selectedIds]);

  return (
    <>
      <BasicModal open={isModalOpen} handleClose={handleModalClose} />
      <Navbar
        handleSideBarOpen={handleToggle}
        title={"Create a channel"}
        userName={currentUser.name}
      />
      <Sidebar handleClose={handleToggle} isOpen={isSideBarOpen} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"form"}
          sx={{
            width: 300,
            height: 600,
            mt: 5,
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            type="text"
            name="channelName"
            value={name}
            onChange={(e: React.FormEvent) => setName(e.target.value)}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <br />
          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={handleTypeChange}
              label="Type"
              fullWidth
              name="type"
            >
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="public">Public</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Members"
            value={searchTerm}
            onChange={handleSearchChange}
            margin="normal"
            fullWidth
            sx={{ marginBottom: "16px" }}
            disabled={type === "public"}
          />
          <Collapse in={type === "private"}>
            <List style={{ height: "45vh", overflow: "auto" }}>
              {filteredItems.length > 0 &&
                filteredItems.map((item) => (
                  <ListItem key={item.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleCheckboxChange(event, item.id)}
                        />
                      }
                      label={<ListItemText primary={item.name} />}
                      checked={selectedIds.includes(item.id)}
                    />
                  </ListItem>
                ))}
            </List>
          </Collapse>

          <Button
            className="createChannelButton"
            sx={{ mt: 5 }}
            variant="outlined"
            color="primary"
            endIcon={<Add />}
            type={"submit"}
          >
            Create channel
          </Button>
        </Box>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = req.cookies.token;
  if (!token) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  let users = await getAllUsers(token);
  let currentUser = await getCurrentUserInfo(token);
  return {
    props: {
      suggestedMembers: users,
      token,
      currentUser,
    },
  };
}
