import React, { useState } from "react";
import "./TableCarDetail.scss";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { UserOutlined, CarOutlined } from "@ant-design/icons";
import { ReactComponent as Gear } from "../../assets/images/gear.svg";
import mappingCarType from "../../util/mappingCarType";

const TableCarDetail = (props) => {
  const { carList } = props;
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ข้อมูลรถ</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              ปีจดทะเบียน
            </StyledTableCell>
            <StyledTableCell align="center">
              {carList.car_register}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                เกียร์
            </StyledTableCell>
            <StyledTableCell align="center">
            <Gear /> {carList.car_transmission}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                ประเภท
            </StyledTableCell>
            <StyledTableCell align="center">
            <CarOutlined /> {mappingCarType(carList.car_type)}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                จำนวนผู้โดยสาร
            </StyledTableCell>
            <StyledTableCell align="center">
            <UserOutlined /> {carList.car_seat}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCarDetail;
