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
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "age", label: "Age", alignRight: false },
  { id: "dob", label: "Date of Birth", alignRight: false },
  { id: "cp", label: "Contact No.", alignRight: false },
  { id: "act", label: "Action", alignRight: false },
];

const SORT_OPTIONS = [
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
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

export default function PatientRecordPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pregnancyList, setPregnancyList] = useState([]);

  const [formID, setFormID] = useState("");

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [editData, setEditData] = useState({});

  const { selectedYear, setSelectedYear } = useContext(SelectYearContext);

  const { userData } = useContext(AuthContext);

  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, "pregnancy"));
        const dataSnap = await getDocs(dataRef);
        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // Apply filtering only when a year is selected
        if (selectedYear) {
          const filteredData = data.filter((item) => {
            // Convert Firestore timestamp to a JavaScript Date object
            const timestamp = item.timeStamp.toDate();

            // Get the year from the Date object
            const year = timestamp.getFullYear();

            // Compare the extracted year with selectedYear
            return year === selectedYear;
          });

          // Sort the filtered data by timestamp
          const sortedData = _.sortBy(
            filteredData,
            (item) => item.timeStamp.seconds
          ).reverse();

          setPregnancyList(sortedData);
        } else {
          // No selectedYear, so set the entire data unfiltered
          const sortedData = _.sortBy(
            data,
            (item) => item.timeStamp.seconds
          ).reverse();

          setPregnancyList(sortedData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedYear]);

  const deletePregnancy = async (id) => {
    const pregnancyDoc = doc(db, "pregnancy", id);
    toast.success("Pregnancy record deleted.", {
      position: "top-right",
      autoClose: 3000, // Automatically close the toast after 3 seconds
      hideProgressBar: false,
    });
    await deleteDoc(pregnancyDoc);
    if (userData.role === "Admin") {
      nav("/dashboard/pregnancy");
    } else {
      nav("/officer/pregnancy");
    }
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
      const newSelecteds = pregnancyList.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pregnancyList.length) : 0;

  const filteredUsers = applySortFilter(
    pregnancyList,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Pregnants | Pregnancy Monitoring System </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Pregnancy Records
          </Typography>

          <Button
            onClick={() => setModalOpen(true)}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            style={{ display: userData.role === "Admin" ? "block" : "none" }}
          >
            New Pregnancy
          </Button>

          <AddModal open={isModalOpen} onClose={() => setModalOpen(false)} />
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
                    rowCount={pregnancyList.length}
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
                      .map((pregnancy, index) => {
                        const { id, name, age, dob, contact } = pregnancy;
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
                                onChange={(event) => handleClick(event, name)}
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
                                <Avatar alt={name} src={avt} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{age}</TableCell>

                            <TableCell align="left">
                              {new Date(dob.seconds * 1000).toLocaleDateString(
                                "en-US"
                              )}
                            </TableCell>

                            <TableCell align="left">{contact}</TableCell>

                            <TableCell align="left">
                              {userData.role === "Admin" && (
                                <>
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() =>
                                      handleEditModal(id, pregnancy)
                                    }
                                  >
                                    <Iconify
                                      icon={"material-symbols:edit-outline"}
                                    />
                                  </IconButton>

                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => deletePregnancy(id)}
                                  >
                                    <Iconify
                                      icon={"material-symbols:delete-outline"}
                                    />
                                  </IconButton>
                                </>
                              )}

                              <Link
                                to={`view/${id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <IconButton size="large" color="inherit">
                                  <Iconify icon={"teenyicons:pdf-outline"} />
                                </IconButton>
                              </Link>
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
              <EditModal
                open={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                id={formID}
                data={editData}
              />
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pregnancyList.length}
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
