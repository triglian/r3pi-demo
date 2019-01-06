import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Paper from '@material-ui/core/Paper';
import { User } from '../../store/users/types';
import UsersTableRow from './UsersTableRow';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    table: {
      minWidth: 300
    }
  });

interface PropsFromMaterialUi {
  classes: any;
}

interface OwnProps {
  rows: User[];
}

type AllProps = PropsFromMaterialUi & OwnProps;

const UsersTable = (props: AllProps) => {
  const { classes, rows } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <colgroup>
          <col width="120px" />
          <col width="120px" />
          <col />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">User id</TableCell>
            <TableCell component="th" scope="row">Avatar</TableCell>
            <TableCell component="th" scope="row">Login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((user, idx) => {
            return <UsersTableRow row={user} key={user.id} />;
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UsersTable);
