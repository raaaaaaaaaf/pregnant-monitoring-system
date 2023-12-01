import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { auth, db } from "../../../firebase/firebaseConfig";
// mock

// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import adminConfig from "./adminConfig";
import userConfig from "./userConfig";
import avtimg from "../../../assets/avatar_default.jpg";
import { AuthContext } from "../../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../../../components/loading/Loading";
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { currentUser, userData, loading } = useContext(AuthContext);
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>
      {loading ? (
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount>
              <Avatar src={currentUser.photoURL ?? avtimg} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {currentUser.displayName}
                </Typography>

                {userData.role === "Admin" ? (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Admin
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Officer
                  </Typography>
                )}
              </Box>
            </StyledAccount>
          </Link>
        </Box>
      )}
      {userData.role === "Admin" ? (
        <NavSection data={adminConfig} />
      ) : (
        <NavSection data={userConfig} />
      )}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
