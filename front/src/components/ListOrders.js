import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import OrdersService from '../services/OrdersService'
import Button from '@mui/material/Button';
import React, { Component } from 'react'
import dayjs from 'dayjs';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';

const columns = [
    { 
        field: 'id',
        headerName: 'ID',
        sortable: true,
        flex: 1
    },
    {
        field: 'originTown',
        headerName: 'Origin Town',
        sortable: false,
        flex: 1
    },
    {
        field: 'originAddress',
        headerName: 'Origin Address',
        sortable: false,
        flex: 1
    },
    {
        field: 'destinationTown',
        headerName: 'Dest. Town',
        sortable: false,
        flex: 1
    },
    {
        field: 'destinationAddress',
        headerName: 'Dest. Address',
        sortable: false,
        flex: 1
    },
    {
        field: 'weight',
        headerName: 'Weight (kg)',
        type: 'number',
        sortable: true,
        flex: 1
    },
    {
        field: 'date',
        headerName: 'Date',
        valueFormatter: ({ value }) => `${value.format('MM.DD.YYYY HH:MM')}`,
        flex: 1
    }
  ];

class ListOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            isDialogOpened: false,
            selectedRow: null
        }

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        OrdersService.getOrders().then((res) => {
            res.data.map((row) => {
                row.date = dayjs(row.date);
                return row;
            })
            this.setState({ orders: res.data});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleRowClick(row) {
        this.setState({
            isDialogOpened: true,
            selectedRow: row.row
        })
    }

    handleClose() {
        this.setState({
            isDialogOpened: false
        })
    }

    render() {
        return (
            <div>
                <DataGrid
                    autoHeight
                    hideFooter
                    onRowClick={this.handleRowClick}
                    columns={columns}
                    rows={this.state.orders}
                />

                <Dialog
                    open={this.state.isDialogOpened}
                >
                    <DialogTitle>Order: <strong>{this.state.selectedRow?.id}</strong></DialogTitle>
                    <DialogContent>
                        <Table>
                            <TableBody>
                            {
                                columns.map(
                                    (column) => {
                                    if (column.field === 'date')
                                    {
                                        return (
                                        <TableRow key={column.field}>
                                            <TableCell variant="head">{column.headerName}</TableCell>
                                            <TableCell variant="string">{this.state.selectedRow?.[column.field].format(('MM.DD.YYYY HH:MM'))}</TableCell>
                                        </TableRow>)
                                    }
                                    else
                                    {
                                        return (
                                        <TableRow key={column.field}>
                                            <TableCell variant="head">{column.headerName}</TableCell>
                                            <TableCell variant="string">{this.state.selectedRow?.[column.field]}</TableCell>
                                        </TableRow>)
                                    }
                                    }
                                )
                            }
                            </TableBody>
                        </Table>
                        <DialogActions>
                            <Button autoFocus onClick={this.handleClose}>
                                Close
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default ListOrders