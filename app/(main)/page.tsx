"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { clearUser } from "../../store/actions";
import { RootState } from "../../store/store";
import Cookies from "js-cookie";
import UpdateButton from "../../components/UpdateButton";
import { userApi } from "../../api/userApi";

export default function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [otherUsers, setOtherUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await userApi.fetchUsers();
        setOtherUsers(res.data.data);
      } catch (error) {}
    };

    fetchOtherUsers();
  }, []);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ paddingY: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: theme.palette.primary.main,
                        fontSize: "3rem",
                        mb: 2,
                      }}
                    >
                      {user.name.split("")[0]?.toUpperCase()}
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ textAlign: "center" }}
                    >
                      Welcome, <br /> {user.name}!
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    You have successfully logged in.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card elevation={2} sx={{ padding: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      Your Profile
                    </Typography>
                    <IconButton onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </Box>
                  <Box
                    component="div"
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      disabled={!isEditing}
                    />
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <UpdateButton
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    data={{
                      email,
                      name,
                    }}
                  />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={2} sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Other Users
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List>
                    {otherUsers.map((otherUser) => (
                      <ListItem key={otherUser.id}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{ bgcolor: theme.palette.secondary.main }}
                          >
                            {otherUser.name.split("")[0]?.toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${otherUser.name} ${
                            user.id === otherUser.id ? "(You)" : ""
                          }`}
                          secondary={otherUser.email}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
