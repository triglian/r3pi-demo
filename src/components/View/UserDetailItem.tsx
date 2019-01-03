import React, { Component } from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface Item{
  field: string,
  value: string|number
}

interface OwnProps{
  item: Item
}

export default function UserDetailItem(props:OwnProps){
  const {field, value} = props.item;
  let valueMarkup;

  // all urls in the user github API end with URL
  if(field.endsWith('url')){
    valueMarkup= <a href={value as string} target="_blank">{value}</a>
  }else{
    valueMarkup = value;
  }

  return(
    <TableRow>
        <TableCell component="td" scope="row">
          {field}
        </TableCell>
        <TableCell>{valueMarkup}</TableCell>
      </TableRow>
  )
}
