import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import { User } from '../../store/users/types';

import './UsersTableRow.css';

interface ownProps {
  row: User;
}

type allProps = ownProps;

class DictionariesTableRow extends Component<allProps> {
  private user: User;

  constructor(props: allProps) {
    super(props);

    this.user = this.props.row;
  }

  render() {
    const {id, login, avatar_url} = this.user;
    return (
      <TableRow>
        <TableCell scope="row">
          {id}
        </TableCell>
        <TableCell>
          <Link to={`/users/${login}`}>
            <img className="avatar-img" src={avatar_url} alt={`${login} avatar`} />
          </Link>
        </TableCell>
        <TableCell>{login}</TableCell>
      </TableRow>
    );
  }
}

export default DictionariesTableRow;
