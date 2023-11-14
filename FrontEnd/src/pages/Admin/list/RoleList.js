import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DataField,
  BooleanField,
  Filter,
  SearchInput,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  Toolbar,
  SaveButton,
  Button,
} from "react-admin";

const RoleFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="name" alwaysOn />
  </Filter>
);

export const RoleList = (props) => {
  return (
    <List
      {...props}
      filters={<RoleFilter />}
      sort={{ field: "name", order: "ASC" }}
    >
      <Datagrid>
        <TextField source="name" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
