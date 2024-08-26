import {
  Dialog,
  DialogTitle,
  CardHeader,
  Typography,
  IconButton,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Address } from "../types/address";
import { Bankdetail } from "../types/bankdetail";
import { Contact } from "../types/contact";
import { Requisite } from "../types/requisite";

const AddressType = [
  { value: 1, label: "Địa chỉ" },
  { value: 4, label: "Địa chỉ đăng ký" },
  { value: 6, label: "Địa chỉ hợp pháp" },
  { value: 9, label: "Địa chỉ hưởng thụ" },
  { value: 11, label: "Địa chỉ giao hàng" },
];
interface Props {
  contact: Contact;
  requisite: Requisite;
  setContact: Dispatch<SetStateAction<Contact>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function RequisiteDialog({
  contact,
  requisite,
  setContact,
  setOpen,
  open,
}: Props) {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle>
        <CardHeader
          sx={{ p: 0 }}
          title={<Typography variant="h4">{"Thông tin chi tiết"}</Typography>}
          action={
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        />
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <Stack
          direction="row"
          flexWrap="wrap"
          columnGap={10}
          rowGap={2}
          alignItems="flex-start"
          useFlexGap
          justifyContent="center"
        >
          <TextField
            label={"First Name"}
            variant="outlined"
            name="name"
            value={requisite.RQ_FIRST_NAME}
            onChange={(event) => {
              const newRequisites = contact.REQUISITES!;
              const requisiteId = newRequisites.findIndex(
                (ele) => ele.ID == requisite.ID
              );
              newRequisites[requisiteId].RQ_FIRST_NAME = event.target.value;
              setContact({
                ...contact,
                REQUISITES: newRequisites,
              });
            }}
            sx={{ width: "45%" }}
          />
          <TextField
            label={"Last Name"}
            variant="outlined"
            name="name"
            value={requisite.RQ_LAST_NAME}
            onChange={(event) => {
              const newRequisites = contact.REQUISITES!;
              const requisiteId = newRequisites.findIndex(
                (ele) => ele.ID == requisite.ID
              );
              newRequisites[requisiteId].RQ_LAST_NAME = event.target.value;
              setContact({
                ...contact,
                REQUISITES: newRequisites,
              });
            }}
            sx={{ width: "45%" }}
          />

          <List
            subheader={<ListSubheader component="div">Địa chỉ</ListSubheader>}
            sx={{ border: 0.1, borderColor: "grey.500", width: "45%" }}
          >
            {requisite.ADDRESSES ? (
              requisite.ADDRESSES.map((address) => {
                return (
                  <>
                    <ListItem
                      dense={true}
                      sx={{ m: -1 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            const newAddresses = requisite.ADDRESSES?.filter(
                              (ele) => ele.ID != address.ID
                            );
                            const newRequisites = contact.REQUISITES!;
                            const requisiteId = newRequisites.findIndex(
                              (ele) => ele.ID == requisite.ID
                            );
                            newRequisites[requisiteId].ADDRESSES = newAddresses;

                            setContact({
                              ...contact,
                              REQUISITES: newRequisites,
                            });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <Select
                          value={address.TYPE_ID}
                          label="Loại"
                          onChange={(event) => {
                            const indexFound = requisite.ADDRESSES!.findIndex(
                              (ele) => ele.ID == address.ID
                            );
                            const newAddresses = requisite.ADDRESSES!;
                            newAddresses[indexFound].TYPE_ID = event.target
                              .value as number;
                            const newRequisites = contact.REQUISITES!;
                            const requisiteId = newRequisites.findIndex(
                              (ele) => ele.ID == requisite.ID
                            );
                            newRequisites[requisiteId].ADDRESSES = newAddresses;
                            setContact({
                              ...contact,
                              REQUISITES: newRequisites,
                            });
                          }}
                        >
                          {AddressType.filter((ele) => {
                            if (ele.value == address.TYPE_ID) return true;
                            else {
                              let show = true;
                              requisite.ADDRESSES!.map((e) => {
                                if (e.TYPE_ID == ele.value) {
                                  show = false;
                                }
                              });
                              return show;
                            }
                          }).map(({ value, label }) => {
                            return <MenuItem value={value}>{label}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                      <ListItemText
                        primary={
                          <TextField
                            name="value"
                            variant="standard"
                            value={address.ADDRESS_2}
                            onChange={(event) => {
                              const indexFound = requisite.ADDRESSES!.findIndex(
                                (ele) => ele.ID == address.ID
                              );
                              const newAddresses = requisite.ADDRESSES!;
                              newAddresses[indexFound].ADDRESS_2 =
                                event.target.value;
                              const newRequisites = contact.REQUISITES!;
                              const requisiteId = newRequisites.findIndex(
                                (ele) => ele.ID == requisite.ID
                              );
                              newRequisites[requisiteId].ADDRESSES =
                                newAddresses;
                              setContact({
                                ...contact,
                                REQUISITES: newRequisites,
                              });
                            }}
                          />
                        }
                      ></ListItemText>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })
            ) : (
              <></>
            )}
            <Button
              onClick={() => {
                const newAddresses = requisite.ADDRESSES
                  ? requisite.ADDRESSES
                  : [];
                newAddresses.push({
                  ID: Math.floor(Math.random() * 1000),
                } as Address);
                const newRequisites = contact.REQUISITES!;
                const requisiteId = newRequisites.findIndex(
                  (ele) => ele.ID == requisite.ID
                );
                newRequisites[requisiteId].ADDRESSES = newAddresses;
                setContact({
                  ...contact,
                  REQUISITES: newRequisites,
                });
              }}
            >
              <Typography textTransform={"none"}>Thêm</Typography>
            </Button>
          </List>
          <List
            subheader={<ListSubheader component="div">Ngân hàng</ListSubheader>}
            sx={{ border: 0.1, borderColor: "grey.500", width: "100%" }}
          >
            {requisite.BANKDETAILS ? (
              requisite.BANKDETAILS.map((bankdetail) => {
                return (
                  <>
                    <ListItem
                      dense={true}
                      sx={{ m: -1 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            const newBankdetails =
                              requisite.BANKDETAILS?.filter(
                                (ele) => ele.ID != bankdetail.ID
                              );
                            const newRequisites = contact.REQUISITES!;
                            const requisiteId = newRequisites.findIndex(
                              (ele) => ele.ID == requisite.ID
                            );
                            newRequisites[requisiteId].BANKDETAILS =
                              newBankdetails;

                            setContact({
                              ...contact,
                              REQUISITES: newRequisites,
                            });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      ></FormControl>
                      <ListItemText
                        primary={
                          <>
                            <TextField
                              name="value"
                              variant="standard"
                              placeholder="Tiêu đề*"
                              value={bankdetail.NAME}
                              required
                              sx={{ width: "25%" }}
                              error={bankdetail.NAME ? false : true}
                              onChange={(event) => {
                                const indexFound =
                                  requisite.BANKDETAILS!.findIndex(
                                    (ele) => ele.ID == bankdetail.ID
                                  );
                                const newBankdetails = requisite.BANKDETAILS!;
                                newBankdetails[indexFound].NAME =
                                  event.target.value;
                                const newRequisites = contact.REQUISITES!;
                                const requisiteId = newRequisites.findIndex(
                                  (ele) => ele.ID == requisite.ID
                                );
                                newRequisites[requisiteId].BANKDETAILS =
                                  newBankdetails;

                                setContact({
                                  ...contact,
                                  REQUISITES: newRequisites,
                                });
                              }}
                            />
                            <TextField
                              name="value"
                              variant="standard"
                              placeholder="Tên ngân hàng"
                              value={bankdetail.RQ_BANK_NAME}
                              sx={{ width: "25%" }}
                              onChange={(event) => {
                                const indexFound =
                                  requisite.BANKDETAILS!.findIndex(
                                    (ele) => ele.ID == bankdetail.ID
                                  );
                                const newBankdetails = requisite.BANKDETAILS!;
                                newBankdetails[indexFound].RQ_BANK_NAME =
                                  event.target.value;
                                const newRequisites = contact.REQUISITES!;
                                const requisiteId = newRequisites.findIndex(
                                  (ele) => ele.ID == requisite.ID
                                );
                                newRequisites[requisiteId].BANKDETAILS =
                                  newBankdetails;

                                setContact({
                                  ...contact,
                                  REQUISITES: newRequisites,
                                });
                              }}
                            />
                            <TextField
                              name="value"
                              variant="standard"
                              placeholder="Địa chỉ ngân hàng"
                              value={bankdetail.RQ_BANK_ADDR}
                              sx={{ width: "25%" }}
                              onChange={(event) => {
                                const indexFound =
                                  requisite.BANKDETAILS!.findIndex(
                                    (ele) => ele.ID == bankdetail.ID
                                  );
                                const newBankdetails = requisite.BANKDETAILS!;
                                newBankdetails[indexFound].RQ_BANK_ADDR =
                                  event.target.value;
                                const newRequisites = contact.REQUISITES!;
                                const requisiteId = newRequisites.findIndex(
                                  (ele) => ele.ID == requisite.ID
                                );
                                newRequisites[requisiteId].BANKDETAILS =
                                  newBankdetails;

                                setContact({
                                  ...contact,
                                  REQUISITES: newRequisites,
                                });
                              }}
                            />
                            <TextField
                              name="value"
                              variant="standard"
                              placeholder="Số tài khoản"
                              value={bankdetail.RQ_ACC_NUM}
                              sx={{ width: "25%" }}
                              onChange={(event) => {
                                const indexFound =
                                  requisite.BANKDETAILS!.findIndex(
                                    (ele) => ele.ID == bankdetail.ID
                                  );
                                const newBankdetails = requisite.BANKDETAILS!;
                                newBankdetails[indexFound].RQ_ACC_NUM =
                                  event.target.value;
                                const newRequisites = contact.REQUISITES!;
                                const requisiteId = newRequisites.findIndex(
                                  (ele) => ele.ID == requisite.ID
                                );
                                newRequisites[requisiteId].BANKDETAILS =
                                  newBankdetails;

                                setContact({
                                  ...contact,
                                  REQUISITES: newRequisites,
                                });
                              }}
                            />
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })
            ) : (
              <></>
            )}
            <Button
              onClick={() => {
                const newBankdetails = requisite.BANKDETAILS
                  ? requisite.BANKDETAILS
                  : [];
                newBankdetails.push({
                  ID: Math.floor(Math.random() * 1000),
                } as Bankdetail);
                const newRequisites = contact.REQUISITES!;
                const requisiteId = newRequisites.findIndex(
                  (ele) => ele.ID == requisite.ID
                );
                newRequisites[requisiteId].BANKDETAILS = newBankdetails;

                setContact({
                  ...contact,
                  REQUISITES: newRequisites,
                });
              }}
            >
              <Typography textTransform={"none"}>Thêm</Typography>
            </Button>
          </List>
        </Stack>
        <DialogActions sx={{ pt: 5 }}>
          <Button variant="outlined" onClick={handleClose} color="error">
            Đóng
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
