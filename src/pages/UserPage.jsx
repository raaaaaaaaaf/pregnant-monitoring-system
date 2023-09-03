import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useContext, useEffect, useState } from 'react';
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

} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import avt from '../assets/avatar_default.jpg'
import Swal from 'sweetalert2';
import { EditFormContext } from '../context/EditContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'age', label: 'Age', alignRight: false },
  { id: 'dob', label: 'Date of Birth', alignRight: false },
  { id: 'cp', label: 'Contact No.', alignRight: false },
  { id: 'act', label: 'Action', alignRight: false },
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
  return order === 'desc'
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [open1, setOpen1] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pregnancyList, setPregnancyList] = useState([]);

  //Add Pregnancy
  const [newPregnancyName, setNewPregnancyName] = useState("");
  const [newPregnancyAge, setNewPregnancyAge] = useState(0);
  const [newPregnancyDob, setNewPregnancyDob] = useState(new Date());
  const [newPregnancyContact, setNewPregnancyContact] = useState(0);

  //Add Pregnancy
  const [updatePregnancyName, setupdatePregnancyName] = useState(""); 
  const [updatePregnancyAge, setupdatePregnancyAge] = useState(0);
  const [updatePregnancyDob, setupdatePregnancyDob] = useState(new Date());
  const [updatePregnancyContact, setupdatePregnancyContact] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const {setFormData, setFormId} = useContext(EditFormContext);

  const nav = useNavigate();


  const pregnancyCollectionRef = collection(db, "pregnancy")

  useEffect(() => {
    getPregnancyList(); 
  }, [])

  const getPregnancyList = async () => {
    try {
      const data = await getDocs(pregnancyCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPregnancyList(filteredData);
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  }

  const handleDateChange = (date) => {
    newPregnancyDob(date);
  };
  const handleDateChange1 = (date) => {
    updatePregnancyDob(date);
  };

  const onSubmitNewPregnancy = async () => {
    try {

      await addDoc(pregnancyCollectionRef, {
        name: newPregnancyName, 
        age: newPregnancyAge, 
        contact: newPregnancyContact, 
        dob: newPregnancyDob})
        Swal.fire(
          'Added!',
          'Information has been added.',
          'success'
        )
        getPregnancyList(); 
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  const deletePregnancy = async (id) => {
    const pregnancyDoc = doc(db, "pregnancy", id)
    Swal.fire(
      'Deleted!',
      'Information has been deleted.',
      'success'
    )
    await deleteDoc(pregnancyDoc);
    getPregnancyList();
  };

  const updateUser = async (id) => {
    const pregnancyDoc = doc(db, "pregnancy", id)
    const newData = {name: updatePregnancyName, age: updatePregnancyAge, contact: updatePregnancyContact, dob: updatePregnancyDob}
    await updateDoc(pregnancyDoc, newData);
    getPregnancyList();
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
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

  const handleClickOpen1 = () => {
    setOpen1(true);
  };


  const handleClose = () => {
    setModalOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pregnancyList.length) : 0;

  const filteredUsers = applySortFilter(pregnancyList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Pregnants | Pregnancy Monitoring System </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pregnancy Records
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                  {Object.keys(pregnancyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((id, index) => {
                    const selectedUser = selected.indexOf(pregnancyList[id].name) !== -1;
                    return (

                      <TableRow hover tabIndex={-1} role="checkbox" selected={selectedUser} key={id}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={pregnancyList[id].name} src={avt} />
                            <Typography variant="subtitle2" noWrap>
                              {pregnancyList[id].name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{pregnancyList[id].age}</TableCell>

                        <TableCell align="left">{pregnancyList[id].dob}</TableCell>

                        <TableCell align="left">{pregnancyList[id].contact}</TableCell>

                        <TableCell align="left">
                          <Link to={`edit/${pregnancyList[id].id}`} style={{ textDecoration: 'none', color: 'black'}}>
                          <IconButton size="large" color="inherit" onClick={() =>setFormId(pregnancyList[id].id)}>
                            <Iconify icon={'material-symbols:edit-outline'}/>
                          </IconButton>
                          </Link>
                          <IconButton size="large" color="inherit" onClick={() => deletePregnancy(pregnancyList[id].id)}>
                            <Iconify icon={'material-symbols:delete-outline'} />
                          </IconButton>
                          <Link to={`view/${pregnancyList[id].id}`} style={{ textDecoration: 'none', color: 'black'}}>
                          <IconButton size="large" color="inherit">
                            <Iconify icon={'teenyicons:pdf-outline'}/>
                          </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                      )
                  })}
                  {/* {pregnancyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).keys(data).map((id, index) => {
                    
                    const selectedUser = selected.indexOf(row.name) !== -1;
                    return (

                        <TableRow hover tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none" key={id}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={data[id].name} src={avt} />
                            <Typography variant="subtitle2" noWrap>
                              {row.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{data[id].age}</TableCell>

                        <TableCell align="left">{data[id].dob}</TableCell>

                        <TableCell align="left">{data[id].contact}</TableCell>

                        <TableCell align="left">
                          <IconButton size="large" color="inherit" onClick={() => handleLink} >
                            <Iconify icon={'material-symbols:edit-outline'}/>
                          </IconButton>
                          <IconButton size="large" color="inherit" onClick={() => deletePregnancy()}>
                            <Iconify icon={'material-symbols:delete-outline'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      )
                    })} */}

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
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
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
      </Container>


      <div>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Add Pregnancy</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmitNewPregnancy}>
            <Stack spacing={2} margin={2} >
              <TextField label="Full Name" fullWidth onChange={(e) => setNewPregnancyName(e.target.value)}/>
              <TextField label="Age" fullWidth onChange={(e) => setNewPregnancyAge(e.target.value)}/>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker selected={newPregnancyDob} onChange={handleDateChange} label="Date of Birth"/>
              </LocalizationProvider>
              <TextField label="Contact No." fullWidth onChange={(e) => setNewPregnancyContact(e.target.value)}/>
            </Stack>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitNewPregnancy} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    <div>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Edit Pregnancy</DialogTitle>
        <DialogContent>
          <form onSubmit={updateUser}>
            <Stack spacing={2} margin={2} >
              <TextField label="Full Name" fullWidth onChange={(e) => setupdatePregnancyName(e.target.value)}/>
              <TextField label="Age" fullWidth onChange={(e) => setupdatePregnancyAge(e.target.value)}/>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker selected={updatePregnancyDob} onChange={handleDateChange1} label="Date of Birth"/>
              </LocalizationProvider>
              <TextField label="Contact No." fullWidth onChange={(e) => setupdatePregnancyContact(e.target.value)}/>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {updateUser(modalData.id), setModalOpen(false)}} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    </>
  );
}
