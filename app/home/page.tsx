"use client";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CardHeader,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import oauthApi from "../api/oauth2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Contact, Phone } from "../types/contact";
import ContactDialog from "./dialog";
import { login } from "../store/reducers/app";
import toast from "react-hot-toast";
import { changeServerUrl, serverAxiosClient } from "../api/axiosClient";
import { contactApi } from "../api/contact";
import { Requisite } from "../types/requisite";
import compare2Contact from "./compare2Contact";
import { requisiteApi } from "../api/requisite";
import { addressApi } from "../api/address";
import { bankdetailApi } from "../api/bankdetail";
import OptionsMenu from "./optionMenu";

interface CellType {
  row: Contact;
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [oldContact, setOldContact] = useState<Contact>({} as Contact);
  const [addContact, setAddContact] = useState<Contact>({} as Contact);
  const [updateContact, setUpdateContact] = useState<Contact>({} as Contact);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const uninstallApp = () => {
    localStorage.removeItem("serverUrl");
    router.push("install");
  };
  const checkServerUrl = () => {
    if (!serverAxiosClient.defaults.baseURL) {
      const serverUrl = localStorage.getItem("serverUrl");
      if (serverUrl) {
        changeServerUrl(serverUrl);
      } else {
        router.push("install");
      }
    }
  };
  const getToken = async () => {
    const redirect_uri = searchParams.get("redirect_uri");
    const code = searchParams.get("code");

    if (code) {
      try {
        const userId = await oauthApi.getAccessToken(redirect_uri, code);

        await dispatch(login(userId));
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await dispatch(login(userId as any));
      } else {
        router.push("/");
      }
    }
  };
  const getListContact = async () => {
    try {
      // const res = await contactApi.getListContact(store.userId);
      const res = await contactApi.getListContact(1);
      setContacts(res.contacts);
    } catch (error) {}
  };

  const handleAddContact = async () => {
    await contactApi.addContact(store.userId, addContact);
    console.log(addContact);
    setAddDialog(false);
    getListContact();
  };
  const handleUpdateContact = async () => {
    if (oldContact.REQUISITES) {
      if (updateContact.REQUISITES) {
        for (let i = 0; i < oldContact.REQUISITES.length; i++) {
          const idFound = updateContact.REQUISITES.findIndex(
            (ele) => ele.ID == oldContact.REQUISITES![i].ID
          );
          if (idFound == -1) {
            await requisiteApi.deleteRequisite(
              store.userId,
              oldContact.REQUISITES![i].ID
            );
            console.log("delete" + i);
          } else {
            const oldRequisite = oldContact.REQUISITES![i];
            const updateRequisite = updateContact.REQUISITES![idFound];
            if (oldRequisite.ADDRESSES) {
              if (updateRequisite.ADDRESSES) {
                for (let j = 0; j < oldRequisite.ADDRESSES.length; j++) {
                  const idAddressFound = updateRequisite.ADDRESSES.findIndex(
                    (ele) => ele.ID == oldRequisite.ADDRESSES![j].ID
                  );
                  if (idAddressFound == -1) {
                    await addressApi.deleteAddress(
                      store.userId,
                      oldRequisite.ADDRESSES![j]
                    );
                    console.log("delete address" + j);
                  }
                }
              } else {
                //delete all address
                for (let j = 0; j < oldRequisite.ADDRESSES.length; j++) {
                  await addressApi.deleteAddress(
                    store.userId,
                    oldRequisite.ADDRESSES[j]
                  );
                  console.log("delete address" + j);
                }
              }
            }
            if (oldRequisite.BANKDETAILS) {
              if (updateRequisite.BANKDETAILS) {
                for (let j = 0; j < oldRequisite.BANKDETAILS.length; j++) {
                  const idBankdetailFound =
                    updateRequisite.BANKDETAILS.findIndex(
                      (ele) => ele.ID == oldRequisite.BANKDETAILS![j].ID
                    );
                  if (idBankdetailFound == -1) {
                    await bankdetailApi.deleteBankdetail(
                      store.userId,
                      oldRequisite.BANKDETAILS![j].ID
                    );
                    console.log("delete bankdetail" + j);
                  }
                }
              } else {
                //delete all bankdetail
                for (let j = 0; j < oldRequisite.BANKDETAILS.length; j++) {
                  await bankdetailApi.deleteBankdetail(
                    store.userId,
                    oldRequisite.BANKDETAILS[j].ENTITY_ID
                  );
                  console.log("delete bankdetail" + j);
                }
              }
            }
          }
        }
      } else {
        //delete all requiite
        for (let i = 0; i < oldContact.REQUISITES.length; i++) {
          await requisiteApi.deleteRequisite(
            store.userId,
            oldContact.REQUISITES![i].ID
          );
          console.log("delete" + i);
        }
      }
    }
    const diff: Contact = compare2Contact(oldContact, updateContact);
    console.log(diff);
    console.log(oldContact);
    console.log(updateContact);

    const res = await contactApi.updateContact(store.userId, diff);

    setUpdateDialog(false);
    getListContact();
  };
  useEffect(() => {
    checkServerUrl();
    getToken().then(getListContact);
    // getListContact();
  }, []);
  useEffect(() => {
    getListContact();
  }, [store.userId]);

  const columns: GridColDef[] = [
    {
      flex: 0.05,
      field: "",
      minWidth: 50,
      headerName: "#",
      renderCell: ({ api, id }) => {
        const index = api.getRowIndexRelativeToVisibleRows(id);

        return <Typography>{index + 1}</Typography>;
      },
    },
    {
      flex: 0.1,
      field: "name",
      minWidth: 100,
      headerName: "Tên",
      renderCell: ({ row }: CellType) => {
        return <Typography>{row.NAME}</Typography>;
      },
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: "post",
      headerName: "Vai trò",
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return <Typography>{row.POST}</Typography>;
      },
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: "bỉthday",
      headerName: "Ngày sinh",
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography>
            {row.BIRTHDATE
              ? dayjs(row.BIRTHDATE).format("HH:mm DD/MM/YYYY")
              : ""}
          </Typography>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: "DATE_CREATE",
      headerName: "Ngày tạo",
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography>
            {dayjs(row.DATE_CREATE).format("HH:mm DD/MM/YYYY")}
          </Typography>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: "DATE_MODIFY",
      headerName: "Lần chỉnh sửa cuối",
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography>
            {dayjs(row.DATE_MODIFY).format("HH:mm DD/MM/YYYY")}
          </Typography>
        );
      },
    },
    {
      flex: 0.05,
      minWidth: 50,
      sortable: false,
      field: "actions",
      headerName: "",
      renderCell: ({ row }: CellType) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <OptionsMenu
              menuProps={{ sx: { "& .MuiMenuItem-root svg": { mr: 2 } } }}
              iconButtonProps={{
                size: "small",
                sx: { color: "text.secondary" },
              }}
              options={[
                {
                  text: "Xoá",
                  icon: <DeleteIcon />,
                  menuItemProps: {
                    onClick: async () => {
                      await contactApi.deleteContact(store.userId, row.ID);
                      getListContact();
                    },
                  },
                },
              ]}
            />
          </Box>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={0} rowGap={4}>
        <Grid item xs={12}>
          {addDialog ? (
            <ContactDialog
              title="Tạo mới liên hệ"
              open={addDialog}
              setOpen={setAddDialog}
              confirm={handleAddContact}
              contact={addContact}
              setContact={setAddContact}
            />
          ) : null}
          <Card>
            {updateDialog ? (
              <ContactDialog
                title="Cập nhật liên hệ"
                open={updateDialog}
                setOpen={setUpdateDialog}
                confirm={handleUpdateContact}
                contact={updateContact}
                setContact={setUpdateContact}
              />
            ) : null}
            <CardHeader
              title={
                <Button variant="contained" onClick={uninstallApp}>
                  {"Uninstall"}
                </Button>
              }
              action={
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.removeItem("userId");
                    router.push("/");
                  }}
                >
                  {"Logout"}
                </Button>
              }
            ></CardHeader>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Grid container>
                  <Grid item xs={12} sm={10} md={9} lg={10}>
                    Danh sách các liên hệ
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} lg={2}></Grid>
                </Grid>
              }
              action={
                <Button
                  variant="contained"
                  onClick={() => {
                    setOldContact({} as Contact);
                    setAddDialog(true);
                  }}
                >
                  &nbsp; Thêm liên hệ
                </Button>
              }
            ></CardHeader>
            <CardContent>
              <DataGrid
                autoHeight
                paginationMode="client"
                slotProps={{
                  pagination: {
                    labelRowsPerPage: "Số bản ghi mỗi trang",
                    labelDisplayedRows(paginationInfo) {
                      return (
                        <Typography>
                          {paginationInfo.from} - {paginationInfo.to} trên{" "}
                          {paginationInfo.count}
                        </Typography>
                      );
                    },
                  },
                }}
                getRowId={(row) => row.ID}
                pagination
                pageSizeOptions={[10, 25, 50]}
                rowHeight={62}
                sx={{
                  // disable cell selection style
                  ".MuiDataGrid-cell:focus": {
                    outline: "none",
                  },

                  // pointer cursor on ALL rows
                  "& .MuiDataGrid-row:hover": {
                    cursor: "pointer",
                  },
                }}
                hideFooterSelectedRowCount
                // rowCount={data.total}
                rows={contacts ? contacts : []}
                columns={columns}
                disableColumnFilter
                disableColumnMenu
                onRowClick={async ({ id }) => {
                  // const res = await contactApi.getContact(
                  //   store.userId,
                  //   id as any
                  // );
                  const res = await contactApi.getContact(1, id as any);
                  let ResContact: Contact = res.contact;
                  if (ResContact.REQUISITES) {
                    for (let i = 0; i < ResContact.REQUISITES!.length; i++) {
                      if (ResContact.REQUISITES![i].ADDRESSES) {
                        for (
                          let j = 0;
                          j < ResContact.REQUISITES![i].ADDRESSES!.length;
                          j++
                        ) {
                          ResContact.REQUISITES![i].ADDRESSES![j].ID =
                            Math.floor(Math.random() * 1000);
                        }
                      }
                    }
                  }
                  const otherPoint = structuredClone(res.contact);
                  setOldContact(otherPoint);
                  setUpdateContact(res.contact);
                  setUpdateDialog(true);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
