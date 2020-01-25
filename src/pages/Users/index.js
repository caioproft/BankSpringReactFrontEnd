import React, { useState, useEffect } from 'react';
import { ptBR } from '@material-ui/core/locale';
import Paper from '@material-ui/core/Paper';
import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
    withStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from '../../utils/httpClient';
import { Container, Delete, Edit, Deposit, Withdraw } from './styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '80vh',
    }
});

export default function Users() {

    const classes = useStyles();

    const HeaderTableCell = withStyles({
        head: {
            backgroundColor: '#fff',
            color: '#248EFA',
            fontSize: 17,
            borderColor: '#248EFA',
        },
    })(TableCell);

    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const theme = createMuiTheme({}, ptBR);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        async function retrieveUsers() {
            await axios
                .get('/accounts')
                .then(({ data }) => setUsers(data));
        }

        retrieveUsers();
    }, []);

    return (
        <Container>
            <Paper>
                <TableContainer className={classes.container}>
                    <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <HeaderTableCell>ID</HeaderTableCell>
                                <HeaderTableCell>Cliente</HeaderTableCell>
                                <HeaderTableCell>Saldo</HeaderTableCell>
                                <HeaderTableCell>Editar cliente</HeaderTableCell>
                                <HeaderTableCell>Excluir cliente</HeaderTableCell>
                                <HeaderTableCell>Depositar</HeaderTableCell>
                                <HeaderTableCell>Sacar</HeaderTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(user => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell align="left">{user.id}</TableCell>
                                            <TableCell align="left">{user.nameUser}</TableCell>
                                            <TableCell align="left">R$ {user.balance}</TableCell>
                                            <TableCell align="left">
                                                <Button>
                                                    <Link to={`/users/edit/${user.id}`}>
                                                        <Edit />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button>
                                                    <Delete />
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button>
                                                    <Deposit />
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button>
                                                    <Withdraw />
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ThemeProvider theme={theme}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </ThemeProvider>
            </Paper>
        </Container>
    );
}
