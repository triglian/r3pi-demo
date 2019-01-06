import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

import './UsersPagination.css';

interface ownProps {
  since: string;
  pagePrevUserId: string;
  pageNextUserId: string;
}

type allProps = ownProps;

export default class UsersPagination extends Component<allProps> {
  constructor(props: allProps) {
    super(props);
  }

  render() {
    // disable button only if we have already requested the start page right before
    const prevPageButtonDisabled: boolean =
      this.props.pagePrevUserId === '' && this.props.since === '';

    return (
      <div className="pagination-container">
        {/* The reason we pass the component as a function is incompatibility
          of the types of material-ui components. See:
          https://github.com/mui-org/material-ui/issues/8598#issuecomment-399166441
           */}
        <Tooltip title="Previous page">
          <IconButton
            component={({ innerRef, ...props }) => (
              <Link
                {...props}
                to={`/users?since=${this.props.pagePrevUserId}`}
              />
            )}
            disabled={prevPageButtonDisabled}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Next page">
          <IconButton
            component={({ innerRef, ...props }) => (
              <Link
                {...props}
                to={`/users?since=${this.props.pageNextUserId}`}
              />
            )}
            aria-label="Next page"
          >
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}
