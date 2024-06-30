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


// eslint-disable-next-line import/no-extraneous-dependencies

import { OrbitProgress } from 'react-loading-indicators';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, getComparator } from '../utils';
import UserTableToolbar from '../user-table-toolbar';
import { AuthContext } from '../../../context/AuthContext';


// ----------------------------------------------------------------------

export default function UserPage() {
  const authContext = useContext(AuthContext);

  console.log('User view authContext data', authContext.isAdmin);



  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  // const [filterName, setFilterName] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    company: '',
    mail: '',
    phone: '',
    city: '',
    country: '',
    role: '',
    status: ''
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  /*eslint-disable */
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');


  // ------------------------------------------------------


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Ensure setPage is defined somewhere in your component
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setPage(0);
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  useEffect(() => {

const accessToken  = localStorage.getItem("accessToken")

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://shopping-app-be.onrender.com/admin/users', {
          headers: {
            Authorization: accessToken,
          },
        }); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
      
    };

   
    fetchUsers();


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

  const applyFilter = ({ inputData, comparator, searchTerm, filters }) => {
    const lowercasedTerm = searchTerm.toLowerCase();

    return inputData.filter((user) => {
      const matchesSearchTerm = !searchTerm || user.name.toLowerCase().includes(lowercasedTerm);
      const matchesFilters = Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        return user[key].toLowerCase().includes(filters[key].toLowerCase());
      });
      return matchesSearchTerm && matchesFilters;
    }).sort(comparator);
  };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    searchTerm,
    filters
  });



  const notFound = !dataFiltered.length && !!searchTerm;

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
          filters={filters}
          onFilterChange={handleFilterChange}
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
                  { id: 'phone', label: 'Phone' },
                  { id: 'email', label: 'Email' },
                  { id: 'city', label: 'City' },
                  { id: 'country', label: 'Country' },
                  { id: 'profession', label: 'Profession' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified' },
                  { id: 'status', label: 'Status' },

                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.firstName + " " + row.lastName }
                      phone={row.phone}
                      email={row.email}
                      city={row.city}
                      country={row.country}
                      profession={row.profession}         
                      company={row.company }
                      role={row.roles[0].name}
                      isVerified={row.isVerified}
                      status={row.status}
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
