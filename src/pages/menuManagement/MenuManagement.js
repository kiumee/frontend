import React from 'react';
import MenuTable from './menuTable';
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";



export default function MenuManagement() {
  const classes = useStyles();
  return (
    < >
      <PageTitle title="메뉴 관리하기" />
      <div className={classes.tableContainer}>
        <MenuTable/>
      </div>
    </>
  );
}
