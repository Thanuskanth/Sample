import React, { Component } from 'react';
import {
    Box,
    Typography,
    makeStyles,
    Button
} from '@material-ui/core';
import Page from 'src/components/Page';

import { connect } from 'react-redux';
import { getFromStorage, removeFromStorage, setInStorage } from "../../../storage"
import { logout } from "../../../actions/authaction"




class ListRole extends Component {
    state = {

        data: {}

    }


    componentDidMount() {
        this.setState({
            data: getFromStorage("auth").user
        })
    }
    toggle = () => {
        this.props.logout();
        window.location.replace("/app")
    }

    render() {
        return (
            <Page
                title="Customers"
            >
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <Typography
                        color="textPrimary"
                        variant="h5"

                    >
                        {this.state.data.username}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >

                    </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <Button

                        color="primary"
                        variant="contained"
                        onClick={this.toggle}
                    >
                        Logout

                </Button>
                </div>

            </Page>
        );
    };
}


export default connect(null, { logout })(ListRole);