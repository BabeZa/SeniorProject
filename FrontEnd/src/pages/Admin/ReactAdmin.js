import React, { useEffect } from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import PostgreAPI from "../../apis/PostgreAPI";

import { UserList, UserEdit, UserCreate, UserShow } from "./list/UserList";
import { RoleList } from "./list/RoleList";

import UserIcon from "@material-ui/icons/Person";
import RoleIcon from "@material-ui/icons/Group";

const api = simpleRestProvider("http://167.99.70.72:55011/reactadmin");

const ReactAdmin = () => {
  return (
    <>
      <Admin dataProvider={api}>
        <Resource
          name="users"
          icon={UserIcon}
          list={UserList}
          create={UserCreate}
          edit={UserEdit}
          show={UserShow}
        />
        <Resource name="roles" icon={RoleIcon} list={RoleList} />
      </Admin>
    </>
  );
};

export default ReactAdmin;
