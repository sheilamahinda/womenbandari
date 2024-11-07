import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { toast } from "sonner";
import {
  Contacts,
  DownloadSharp,
  Grade,
  Home,
  LibraryBooks,
  LiveHelp,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ElearningContext } from "../context/ElearningContext";
import { Stack } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardLayout({ children }) {
  const { deleteCookie, cookie } = React.useContext(ElearningContext);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleLogout = async () => {
  //   try {
  //     deleteCookie();
  //     await axios.delete("http://localhost:3005/auth/logout");
  //     navigate("/LoginPage");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/api/v1/user/logout`);
      deleteCookie();
      window.localStorage.setItem("role", "");
      window.localStorage.setItem("username", "");
      window.localStorage.setItem("adm", "");
      navigate("/LoginPage");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ background: "white" }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <header style={{ width: "100%" }}>
            <nav style={{ boxShadow: "0 0 0 0" }} className="navbar">
              <Stack direction="row" sx={{ width: "100%" }}>
                <Stack flexGrow={1}>
                  <ul className="nav-links">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    
                    <li>
                    <Link to="/services">Services</Link>
                    </li>
                    
                    <li>
                      <Link to="/dashboard">Profile/Dashboard</Link>
                    </li>
                  </ul>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <button
                    className="contact-btn"
                    onClick={() => navigate("/contact")}
                  >
                    Contact
                  </button>
                  <button onClick={logOutHandler} className="contact-btn">
                    Logout
                  </button>
                </Stack>
              </Stack>
            </nav>
          </header>{" "}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div className="logo">
            <img src="/wifiii.png" alt="Native English Logo" />
          </div>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarItems?.map((item, index) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/${item.path}`)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

const sidebarItems = [
  {
    id: 0,
    name: "Dashboard",
    path: "dashboard",
    icon: <Home />,
  },
  {
    id: 1,
    name: "Digital Library",
    path: "resources",
    icon: <LibraryBooks />,
  },
  //   {
  //     id: 2,
  //     name: "Downloads",
  //     path: "downloads",
  //     icon: <DownloadSharp />,
  //   },
  {
    id: 3,
    name: "Progress",
    path: "grade",
    icon: <Grade />,
  },
  
  {
    id: 4,
    name: "Chats",
    path: "communicate",
    icon: <LiveHelp />,
  },
  {
    id: 5,
    name: "Budget Planner",
    path: "budget-planner",
    icon: <Grade />,
  },
  {
    id: 6,
    name: "Leadership Practice", // New entry
    path: "leadership-practice", // Ensure this matches the route in App.js
    icon: <LiveHelp />, // Update the icon if needed
  },
  {
    id: 7,
    name: "Chatbot",
    path: "chat", // Ensure this matches the route in App.js
    icon: <LiveHelp />,
  },
  {
    id: 8,
    name: "Contact",
    path: "contact",
    icon: <Contacts />,
  },
];
