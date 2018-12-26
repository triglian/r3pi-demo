import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import { User } from './store/users/types';

import './UsersTableRow.css';

interface ownProps {
  row: User;
  idx: number;
}

type allProps = ownProps;

class DictionariesTableRow extends Component<allProps> {
  private user: User;

  constructor(props: allProps) {
    super(props);

    this.user = this.props.row;
  }

  render() {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {this.props.idx}
        </TableCell>
        <TableCell>
          <img className="avatar-img" src={this.user.avatar_url} alt="" />
        </TableCell>
        <TableCell>{this.user.login}</TableCell>
      </TableRow>
    );
  }
}

export default DictionariesTableRow;
