import axios from 'axios';
import { useState, useEffect, useContext } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
// import Loading from 'src/_mock/loading'; (couldnt apply)
// import { Audio } from 'react-loader-spinner'

import { OrbitProgress } from 'react-loading-indicators';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { AuthContext } from '../../../context/AuthContext';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const authContext = useContext(AuthContext);

  console.log('User view authContext data', authContext.isAdmin);

  const contextIsAdmin = authContext.isAdmin;
  console.log('contextIsadmin ??', contextIsAdmin);

  // ----------------------------------------------------

  // const [users, setUsers] = useState([
  //   {
  //     "id": 1,
  //     "avatarId": 0,
  //     "email": "admin@admin.com",
  //     "userName": "admin@admin.com",
  //     "firstName": "kamil",
  //     "lastName": "can",
  //     "country": null,
  //     "city": null,
  //     "phone": null,
  //     "status": "active",
  //     "profession": null,
  //     "roles": [
  //       {
  //         "id": 2,
  //         "name": "ADMIN"
  //       }
  //     ]
  //   },
  //   {
  //     "id": 2,
  //     "avatarId": 0,
  //     "email": "realronaldo@fakemail.com",
  //     "userName": "realronaldo@fakemail.com",
  //     "firstName": "real",
  //     "lastName": "ronaldo",
  //     "country": null,
  //     "city": null,
  //     "phone": null,
  //     "status": "active",
  //     "profession": null,
  //     "roles": [
  //       {
  //         "id": 1,
  //         "name": "USER"
  //       }
  //     ]
  //   },
  //   {
  //     "id": 3,
  //     "avatarId": 0,
  //     "email": "test@test.com",
  //     "userName": "test@test.com",
  //     "firstName": "test",
  //     "lastName": "test",
  //     "country": null,
  //     "city": null,
  //     "phone": null,
  //     "status": "active",
  //     "profession": null,
  //     "roles": [
  //       {
  //         "id": 1,
  //         "name": "USER"
  //       }
  //     ]
  //   },
  //   {
  //     "id": 5,
  //     "avatarId": 0,
  //     "email": "realronaldo1@fakemail.com",
  //     "userName": "realronaldo1@fakemail.com",
  //     "firstName": "real",
  //     "lastName": "ronaldo",
  //     "country": null,
  //     "city": null,
  //     "phone": null,
  //     "status": "active",
  //     "profession": null,
  //     "roles": [
  //       {
  //         "id": 1,
  //         "name": "USER"
  //       }
  //     ]
  //   }
  // ])

  // ----------------------------------------------------

  // ----------------------------------------------------------------------

  const [users, setUsers] = useState([]);

  // ----------------------------------------------------------------------

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  /*eslint-disable */
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('https://shopping-app-be.onrender.com/admin/users');
  //       setUsers(response.data);
  //       console.log("response from users request" , response);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://shopping-app-be.onrender.com/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();

    // Clean up function to cancel any pending requests or cleanup when component unmounts
    return () => {
      // Any cleanup code can go here
    };
  }, []);


  // ------------------------------------------------------


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://shopping-app-be.onrender.com/admin/users', {
          headers: {
            'accept': '*/*',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE3Mzk2Nzc2LCJleHAiOjE3MTczOTczODF9.PMV0IFMF7TB8cKOhsB1bC6fiEtkyBA6DfvSbAtBcbV7VW9KDFJxO08KMC0hk1Nt9FQom6ThkIIVjDtslpjJz4A'
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();

    // Clean up function to cancel any pending requests or cleanup when component unmounts
    return () => {
      // Any cleanup code can go here
    };
  }, []);




  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (loading) {
    return <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" />;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      /*eslint-disable */
                      name={row.firstName + ' ' + row.lastName}
                      role={row.roles[0].name}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
