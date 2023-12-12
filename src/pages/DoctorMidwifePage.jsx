import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useContext, useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";

import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

import avt from "../assets/avatar_default.jpg";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/loading/Loading";
import _ from "lodash";
import AddModal from "../components/modal/AddModal";
import EditModal from "../components/modal/EditModal";
import { SelectYearContext } from "../context/SelectYearContext";
import { toast } from "react-toastify";
import AddStaffModal from "../components/modal/AddStaffModal";
import EditStaffModal from "../components/modal/EditStaffModal";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "fName", label: "Name", alignRight: false },
  { id: "contact", label: "Contact No.", alignRight: false },
  { id: "time", label: "Time Schedule", alignRight: false },
  { id: "day", label: "Day", alignRight: false },
  { id: "act", label: "", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DoctorMidwifePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [staffList, setStaffList] = useState([]);

  const [formID, setFormID] = useState("");

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [editData, setEditData] = useState({});

  const { userData } = useContext(AuthContext);

  const nav = useNavigate();




  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, "staff"));
        const dataSnap = await getDocs(dataRef);
        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setStaffList(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const deleteStaff = async (id) => {
    const staffRef = doc(db, "staff", id);
    toast.success("Staff deleted.", {
      position: "top-right",
      autoClose: 3000, // Automatically close the toast after 3 seconds
      hideProgressBar: false,
    });
    await deleteDoc(staffRef);
    nav("/dashboard/staff");
  };

  const handleEditModal = (id, data) => {
    setFormID(id);
    setEditData(data);
    setEditModalOpen(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = staffList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffList.length) : 0;

  const filteredUsers = applySortFilter(
    staffList,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Staffs | Pregnancy Monitoring System </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Doctor/Midwife
          </Typography>
          <Button
            onClick={() => setModalOpen(true)}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            style={{ display: userData.role === "Admin" ? "block" : "none" }}
          >
            New Staff
          </Button>
          <AddStaffModal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </Stack>
        {loading ? (
          <Loading />
        ) : (
          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={staffList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((staff, index) => {
                        const {
                          id,
                          fName,
                          startDay,
                          endDay,
                          startTime,
                          endTime,
                          contact,
                          role,
                        } = staff;
                        const selectedUser = selected.indexOf(index) !== -1;
                        return (
                          <TableRow
                            hover
                            tabIndex={index}
                            role="checkbox"
                            selected={selectedUser}
                            key={id}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedUser}
                                onChange={(event) => handleClick(event, fName)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={fName} src={avt} />
                                <Typography variant="subtitle2" noWrap>
                                  {fName} ({role})
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{contact}</TableCell>

                            <TableCell align="left">
                              {new Date(
                                startTime.seconds * 1000
                              ).toLocaleTimeString("en-US")}{" "}
                              -{" "}
                              {new Date(
                                endTime.seconds * 1000
                              ).toLocaleTimeString("en-US")}
                            </TableCell>

                            <TableCell align="left">
                              {new Date(
                                startDay.seconds * 1000
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                              })}{" "}
                              -{" "}
                              {new Date(
                                endDay.seconds * 1000
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                              })}
                            </TableCell>

                            <TableCell align="left">
                              {userData.role === "Admin" && (
                                <>
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => handleEditModal(id)}
                                  >
                                    <Iconify
                                      icon={"material-symbols:edit-outline"}
                                    />
                                  </IconButton>

                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => deleteStaff(id)}
                                  >
                                    <Iconify
                                      icon={"material-symbols:delete-outline"}
                                    />
                                  </IconButton>
                                </>
                              )}

                              {/* <Link
                                to={`view/${id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <IconButton size="large" color="inherit">
                                  <Iconify icon={"teenyicons:pdf-outline"} />
                                </IconButton>
                              </Link> */}
                            </TableCell>
                          </TableRow>
                        );
                      })}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete
                              words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <EditStaffModal
                open={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                id={formID}
                data={editData}
              />
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={staffList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </>
  );
}
