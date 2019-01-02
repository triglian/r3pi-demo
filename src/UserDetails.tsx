import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Paper from '@material-ui/core/Paper';
import { User } from "./store/users/types";
import UserDetailItem from './UserDetailItem';
import { ClassNameMap, WithStyles } from "@material-ui/core/styles/withStyles";
import './UserDetails.css';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    table: {
      minWidth: 700
    }
  });

interface OwnProps{
  user: User
}

type allProps = OwnProps & WithStyles<typeof styles>;

class UserDetails extends Component<allProps>{

  render(){
    const infoItems = Object.keys(this.props.user).map((k, idx)=> {
      return {
        field: k,
        value: this.props.user[k]
      };
    });

    return(
      <div>
        <header className="user-header ">
          <div className="user-header-img-container">
            <img src={this.props.user.avatar_url} alt={`${this.props.user.login} avatar`}/> 
          </div>
          <h1>{this.props.user.login}</h1>
        </header>

        <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
          <colgroup>
            <col width="150px" />
            <col width="120px" />
          </colgroup>
          <TableBody>
            {infoItems.map((infoItem, idx) => {
              return <UserDetailItem item={infoItem} key={this.props.user.id.toString() + idx.toString()} />;
            })}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserDetails);