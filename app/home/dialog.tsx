import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { Contact, Email, Phone, Web } from "../types/contact";
import { Requisite } from "../types/requisite";
import RequisiteDialog from "./requisite";
interface Props {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirm: () => void;
  contact: Contact;
  setContact: Dispatch<SetStateAction<Contact>>;
}

export default function ContactDialog({
  title,
  setOpen,
  open,
  contact,
  setContact,
  confirm,
}: Props) {
  const [requisiteDialog, setRequisiteDialog] = useState<boolean>(false);
  const [requisiteData, setRequisiteData] = useState<Requisite>(
    {} as Requisite
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog open={open} maxWidth="md">
      {requisiteDialog ? (
        <RequisiteDialog
          contact={contact}
          requisite={requisiteData}
          setContact={setContact}
          open={requisiteDialog}
          setOpen={setRequisiteDialog}
        />
      ) : null}
      <DialogTitle>
        <CardHeader
          sx={{ p: 0 }}
          title={<Typography variant="h3">{title}</Typography>}
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
            label={"Tên"}
            variant="outlined"
            name="name"
            value={contact.NAME}
            onChange={(event) => [
              setContact({
                ...contact,
                NAME: event.target.value,
              }),
            ]}
            sx={{ width: "45%" }}
          />
          <TextField
            label={"Vai trò"}
            variant="outlined"
            name="email"
            value={contact.POST}
            onChange={(event) => [
              setContact({
                ...contact,
                POST: event.target.value,
              }),
            ]}
            sx={{ width: "45%" }}
          />

          <List
            subheader={
              <ListSubheader component="div">Điện thoại</ListSubheader>
            }
            sx={{ border: 0.1, borderColor: "grey.500", width: "45%" }}
          >
            {contact.PHONE ? (
              contact.PHONE.map((phone) => {
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
                            setContact({
                              ...contact,
                              PHONE: contact.PHONE?.filter((ele) => {
                                return ele.ID != phone.ID;
                              }),
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
                          value={phone.VALUE_TYPE}
                          label="Loại"
                          onChange={(event) => {
                            const newPhone = contact.PHONE!;
                            const idFound = newPhone?.findIndex(
                              (ele) => ele.ID == phone.ID
                            );
                            newPhone[idFound].VALUE_TYPE = event.target.value;
                            setContact({
                              ...contact,
                              PHONE: newPhone,
                            });
                          }}
                        >
                          <MenuItem value={"WORK"}>Điện thoại công ty</MenuItem>
                          <MenuItem value={"MOBILE"}>Di động</MenuItem>
                          <MenuItem value={"FAX"}>Fax</MenuItem>
                          <MenuItem value={"HOME"}>Nhà</MenuItem>
                          <MenuItem value={"OTHER"}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                      <ListItemText
                        primary={
                          <TextField
                            name="value"
                            variant="standard"
                            value={phone.VALUE}
                            onChange={(event) => {
                              const newPhone = contact.PHONE!;
                              const idFound = newPhone?.findIndex(
                                (ele) => ele.ID == phone.ID
                              );
                              newPhone[idFound].VALUE = event.target.value;
                              setContact({
                                ...contact,
                                PHONE: newPhone,
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
                const newPhone: Phone[] | undefined = contact.PHONE
                  ? contact.PHONE
                  : [];

                newPhone?.push({
                  ID: Math.floor(Math.random() * 1000),
                } as Phone);
                setContact({
                  ...contact,
                  PHONE: newPhone,
                });
              }}
            >
              <Typography textTransform={"none"}>Thêm</Typography>
            </Button>
          </List>
          <List
            subheader={<ListSubheader component="div">Email</ListSubheader>}
            sx={{ border: 0.1, borderColor: "grey.500", width: "45%" }}
          >
            {contact.EMAIL ? (
              contact.EMAIL.map((email) => {
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
                            setContact({
                              ...contact,
                              EMAIL: contact.EMAIL?.filter((ele) => {
                                return ele.ID != email.ID;
                              }),
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
                          value={email.VALUE_TYPE}
                          label="Loại"
                          onChange={(event) => {
                            const newEmail = contact.EMAIL!;
                            const idFound = newEmail?.findIndex(
                              (ele) => ele.ID == email.ID
                            );
                            newEmail[idFound].VALUE_TYPE = event.target.value;
                            setContact({
                              ...contact,
                              EMAIL: newEmail,
                            });
                          }}
                        >
                          <MenuItem value={"WORK"}>Công việc</MenuItem>
                          <MenuItem value={"MAILING"}>Cho bản tin</MenuItem>
                          <MenuItem value={"HOME"}>Cá nhân</MenuItem>
                          <MenuItem value={"OTHER"}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                      <ListItemText
                        primary={
                          <TextField
                            name="value"
                            variant="standard"
                            value={email.VALUE}
                            onChange={(event) => {
                              const newEmail = contact.EMAIL!;
                              const idFound = newEmail?.findIndex(
                                (ele) => ele.ID == email.ID
                              );
                              newEmail[idFound].VALUE = event.target.value;
                              setContact({
                                ...contact,
                                EMAIL: newEmail,
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
                const newEmail: Email[] | undefined = contact.EMAIL
                  ? contact.EMAIL
                  : [];
                newEmail?.push({
                  ID: Math.floor(Math.random() * 1000),
                } as Email);
                setContact({
                  ...contact,
                  EMAIL: newEmail,
                });
              }}
            >
              <Typography textTransform={"none"}>Thêm</Typography>
            </Button>
          </List>
          <List
            subheader={<ListSubheader component="div">Website</ListSubheader>}
            sx={{ border: 0.1, borderColor: "grey.500", width: "45%" }}
          >
            {contact.WEB ? (
              contact.WEB.map((web) => {
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
                            setContact({
                              ...contact,
                              WEB: contact.WEB?.filter((ele) => {
                                return ele.ID != web.ID;
                              }),
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
                          value={web.VALUE_TYPE}
                          label="Loại"
                          onChange={(event) => {
                            const newWeb = contact.WEB!;
                            const idFound = newWeb?.findIndex(
                              (ele) => ele.ID == web.ID
                            );
                            newWeb[idFound].VALUE_TYPE = event.target.value;
                            setContact({
                              ...contact,
                              WEB: newWeb,
                            });
                          }}
                        >
                          <MenuItem value={"WORK"}>Công ty</MenuItem>
                          <MenuItem value={"HOME"}>Cá nhân</MenuItem>
                          <MenuItem value={"FACEBOOK"}>Facebook</MenuItem>
                          <MenuItem value={"VK"}>VK</MenuItem>
                          <MenuItem value={"OTHER"}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                      <ListItemText
                        primary={
                          <TextField
                            name="value"
                            variant="standard"
                            value={web.VALUE}
                            onChange={(event) => {
                              const newWeb = contact.WEB!;
                              const idFound = newWeb?.findIndex(
                                (ele) => ele.ID == web.ID
                              );
                              newWeb[idFound].VALUE = event.target.value;
                              setContact({
                                ...contact,
                                WEB: newWeb,
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
                const newWeb: Web[] | undefined = contact.WEB
                  ? contact.WEB
                  : [];
                newWeb?.push({
                  ID: Math.floor(Math.random() * 1000),
                } as Phone);
                setContact({
                  ...contact,
                  WEB: newWeb,
                });
              }}
            >
              <Typography textTransform={"none"}>Thêm</Typography>
            </Button>
          </List>
          <List
            subheader={<ListSubheader component="div">Chi tiết</ListSubheader>}
            sx={{ border: 0.1, borderColor: "grey.500", width: "45%" }}
          >
            {contact.REQUISITES ? (
              contact.REQUISITES.map((requisite) => {
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
                            setContact({
                              ...contact,
                              REQUISITES: contact.REQUISITES?.filter((ele) => {
                                return ele.ID != requisite.ID;
                              }),
                            });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText>
                        <Button
                          sx={{
                            width: "100%",
                            height: "100%",
                          }}
                          variant="text"
                          onClick={() => {
                            setRequisiteDialog(true);
                            setRequisiteData(requisite);
                          }}
                        >
                          <Typography textTransform={"none"} color={"black"}>
                            {requisite.RQ_FIRST_NAME
                              ? requisite.RQ_FIRST_NAME
                              : ""}
                            {requisite.RQ_LAST_NAME
                              ? requisite.RQ_LAST_NAME
                              : ""}
                            &nbsp;
                          </Typography>
                        </Button>
                      </ListItemText>
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
                const newRequisite: Requisite[] | undefined = contact.REQUISITES
                  ? contact.REQUISITES
                  : [];
                newRequisite.push({
                  ID: Math.floor(Math.random() * 1000),
                } as Requisite);
                setContact({
                  ...contact,
                  REQUISITES: newRequisite,
                });
              }}
            >
              <Typography textTransform={"none"}>Thêm</Typography>
            </Button>
          </List>
        </Stack>
        <DialogActions sx={{ pt: 5 }}>
          <Button variant="outlined" onClick={confirm} color="success">
            Xác nhận
          </Button>
          <Button variant="outlined" onClick={handleClose} color="error">
            Đóng
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
