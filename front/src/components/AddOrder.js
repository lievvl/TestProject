import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import OrdersService from '../services/OrdersService'
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import React, { Component } from 'react'

class AddOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOriginTownError: false,
            isOriginAddressError: false,
            isDestinationTownError: false,
            isDestinationAddressError: false,
            isWeightError: false,
            isDateError: false,
            originTown: '',
            originAddress: '',
            destinationTown: '',
            destinationAddress: '',
            weight: '',
            date: dayjs()
        }

        this.handleChangeOriginTown = this.handleChangeOriginTown.bind(this);
        this.handleChangeOriginAddress = this.handleChangeOriginAddress.bind(this);
        this.handleChangeDestinationTown = this.handleChangeDestinationTown.bind(this);
        this.handleChangeDestinationAddress = this.handleChangeDestinationAddress.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChangeOriginTown(e) {
        this.setState({
            originTown: e.target.value
        })
    }

    handleChangeOriginAddress(e) {
        this.setState({
            originAddress: e.target.value
        })
    }

    handleChangeDestinationTown(e) {
        this.setState({
            destinationTown: e.target.value
        })
    }

    handleChangeDestinationAddress(e) {
        this.setState({
            destinationAddress: e.target.value
        })
    }

    handleChangeWeight(e) {
        const regex = /[0-9]+\.?[0-9]*/;
        if (e.target.value === '' || regex.test(e.target.value))
        {
            this.setState({
                weight: e.target.value
            })
        }
    }

    handleChangeDate(newDate) {
        this.setState({
            date: newDate
        })
    }

    handleAdd() {
        let isInputValid = true;
        if (this.state.originTown === '')
        {
            this.setState({
                isOriginTownError: true
            });
            isInputValid = false;
        }
        else
        {
            this.setState({
                isOriginTownError: false
            });
        }
        if (this.state.originAddress === '')
        {
            this.setState({
                isOriginAddressError: true
            });
            isInputValid = false;
        }
        else
        {
            this.setState({
                isOriginAddressError: false
            });
        }
        if (this.state.destinationTown === '')
        {
            this.setState({
                isDestinationTownError: true
            });
            isInputValid = false;
        }
        else
        {
            this.setState({
                isDestinationTownError: false
            });
        }
        if (this.state.destinationAddress === '')
        {
            this.setState({
                isDestinationAddressError: true
            });
            isInputValid = false;
        }
        else
        {
            this.setState({
                isDestinationAddressError: false
            });
        }
        if (this.state.weight === '' || this.state.weight.charAt(this.state.weight.length - 1) === '.')
        {
            this.setState({
                isWeightError: true
            });
            isInputValid = false;
        }
        else
        {
            this.setState({
                isWeightError: false
            });
        }
        if (this.state.date !== undefined && this.state.date.isValid())
        {
            this.setState({
                isDateError: false
            });
        }
        else
        {
            this.setState({
                isDateError: true
            });
            isInputValid = false;
        }

        if (isInputValid)
        {
            let order = {
                originTown: this.state.originTown,
                originAddress: this.state.originAddress,
                destinationTown: this.state.destinationTown,
                destinationAddress: this.state.destinationAddress,
                weight: this.state.weight,
                date: this.state.date.toISOString(),
            }
            OrdersService.createOrder(order).then((res) => {
                window.location.href = 'http://localhost:3000';
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Box
                    sx={{
                        width: '50%',
                        borderRadius: 2,
                        border: '1px solid',
                        textAlign: 'center',
                        padding: 4
                    }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Stack spacing={4}>
                    <TextField
                        error={this.state.isOriginTownError}
                        required
                        value={this.state.originTown}
                        onChange={this.handleChangeOriginTown}
                        id="outlined-required"
                        label="Origin Town"
                    />
                    <TextField
                        error={this.state.isOriginAddressError}
                        required
                        value={this.state.originAddress}
                        onChange={this.handleChangeOriginAddress}
                        id="outlined-required"
                        label="Origin address"
                    />
                    <TextField
                        error={this.state.isDestinationTownError}
                        required
                        value={this.state.destinationTown}
                        onChange={this.handleChangeDestinationTown}
                        id="outlined-required"
                        label="Destination Town"
                    />
                    <TextField
                        error={this.state.isDestinationAddressError}
                        required
                        value={this.state.destinationAddress}
                        onChange={this.handleChangeDestinationAddress}
                        id="outlined-required"
                        label="Destination address"
                    />
                    <TextField
                        error={this.state.isWeightError}
                        required
                        value={this.state.weight}
                        onChange={this.handleChangeWeight}
                        id="outlined-required"
                        label="Weight (kg)"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date"
                            ampm={false}
                            value={this.state.date}
                            onChange={this.handleChangeDate}
                            renderInput={(params) => 
                                <TextField
                                    error={this.state.isDateError}
                                    required 
                                    {...params} 
                                />
                            }
                        />
                    </LocalizationProvider>
                    </Stack>
                    <Button variant="contained" sx={{mt: 2}} onClick={this.handleAdd}>
                        Add
                    </Button>
                </Box>
            </Grid> 
        )
    }
}

export default AddOrder