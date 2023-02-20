import { AppBar, Toolbar, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <header>
                <AppBar position='sticky'>
                    <Toolbar> 
                        <Typography variant="h6" component="h1">
                            Orders Managment Service
                        </Typography>
                        <Button variant="contained" href="/" sx={{ml: 4}}>
                            List Orders
                        </Button>
                        <Button variant="contained" href="/add-order" sx={{ml: 2}}>
                            Add Order
                        </Button>
                    </Toolbar>
                </AppBar>
            </header>
        )
    }
}

export default HeaderComponent