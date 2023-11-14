import React, { useState } from "react";
import BackButton from "../component/BackButton";
import PostgresAPI from "../../../apis/PostgreAPI";
// import axios from "axios";
import Button from "@material-ui/core/Button";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  ImageField,
  ArrayField,
  SingleFieldList,
  ChipField,
  Filter,
  SearchInput,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  Create,
  PasswordInput,
  Show,
  SimpleShowLayout,
  SelectArrayInput,
  ReferenceArrayInput,
} from "react-admin";
import { valuesIn } from "lodash";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// let cancel,
//   count = 0;

const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="name" alwaysOn />
  </Filter>
);

export const UserList = (props) => {
  return (
    <List
      {...props}
      filters={<UserFilter />}
      sort={{ field: "name", order: "ASC" }}
    >
      <Datagrid rowClick="show">
        <TextField source="name" />
        <TextField source="username" />
        <ArrayField source="roles_names" label="Roles">
          <SingleFieldList linkType={false}>
            <ChipField source="roles_name" emptyText="Not have role" />
          </SingleFieldList>
        </ArrayField>
        <BooleanField source="isactive" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const UserTitle = ({ record }) => {
  return <span>{record ? `${record.name}` : ""}</span>;
};

const UserEditToolbar = (props) => {
  return (
    <Toolbar {...props}>
      <BackButton label={"Back"} />
      <SaveButton />
    </Toolbar>
  );
};

const ValidateUserEdit = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (
    values.new_password !== values.confirm_new_password &&
    values.new_password &&
    values.confirm_new_password
  ) {
    errors.confirm_new_password = "Password don't match.";
  }

  return errors;
};

const MyMultiSelect = (props) => {
  const { choices } = props;
  return (
    <>
      {console.log(props)}
      <Select value={choices} multiple>
        {choices.map((el) => (
          <MenuItem key={el.name} value={el.id}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export const UserEdit = (props) => {
  const [togglePassword, settogglePassword] = useState(false);
  return (
    <Edit {...props} title={<UserTitle />}>
      <SimpleForm toolbar={<UserEditToolbar />} validate={ValidateUserEdit}>
        <TextInput source="name" />
        <TextInput source="username" disabled />
        <ReferenceArrayInput
          label="Roles"
          source="ids"
          reference="roles"
          sort={{ field: "name", order: "ASC" }}
        >
          <MyMultiSelect />
          {/* <SelectArrayInput optionText="name" /> */}
        </ReferenceArrayInput>
        <BooleanInput source="isactive" />
        <Button
          style={{ marginBottom: 10 }}
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            settogglePassword(!togglePassword);
          }}
        >
          change password
        </Button>
        {togglePassword && <PasswordInput source="new_password" />}
        {togglePassword && <PasswordInput source="confirm_new_password" />}
      </SimpleForm>
    </Edit>
  );
};

const UserCreateToolbar = (props) => {
  return (
    <Toolbar {...props}>
      <BackButton label={"Back"} />
      <SaveButton label={"Create"} />
    </Toolbar>
  );
};

const ValidateUserCreation = async (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "ra.validation.required";
  }
  if (!values.username) {
    errors.username = "ra.validation.required";
  }
  if (!values.password) {
    errors.password = "ra.validation.required";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "ra.validation.required";
  }
  if (
    values.password !== values.confirm_password &&
    values.password &&
    values.confirm_password
  ) {
    errors.confirm_password = "Password don't match.";
  }
  // console.log(cancel, count++);
  // if (cancel) {
  //   cancel.cancel();
  // }
  // cancel = axios.CancelToken.source();
  let usercheck = await PostgresAPI.post(
    "reactadmin/users/checkuser",
    {
      username: values.username,
    }
    // { cancelToken: cancel.token }
  );
  if (usercheck.data) {
    errors.username = "User already exists";
  }
  return errors;
};

export const UserCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm
        toolbar={<UserCreateToolbar />}
        validate={ValidateUserCreation}
        redirect="/users"
      >
        <TextInput source="name" />
        <TextInput source="username" />
        <PasswordInput source="password" />
        <PasswordInput source="confirm_password" />
        <BooleanInput source="isactive" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
};

// const MyImageField = (props) => {
//   const { record, source, title } = props;
//   return (
//     <div>
//       {console.log(props)}
//       <img src={record[source]} title={record[title]} />
//     </div>
//   );
// };

export const UserShow = (props) => {
  return (
    <Show {...props} title={<UserTitle />}>
      <SimpleShowLayout>
        <TextField source="name" />
        <ImageField source="path" label="" />
        <ArrayField source="roles_names" label="Roles">
          <SingleFieldList linkType={false}>
            <ChipField source="roles_name" emptyText="Not have role" />
          </SingleFieldList>
        </ArrayField>
        <BackButton
          style={{ marginTop: 10 }}
          label={"Back"}
          color={"primary"}
          variant={"contained"}
        />
      </SimpleShowLayout>
    </Show>
  );
};
