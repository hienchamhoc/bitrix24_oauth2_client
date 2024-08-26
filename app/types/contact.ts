import { Requisite } from "./requisite";

interface Phone {
  ID: number;
  VALUE_TYPE: string | undefined;
  VALUE: string | undefined;
  TYPE_ID: string | undefined;
}
interface Email {
  ID: number;
  VALUE_TYPE: string | undefined;
  VALUE: string | undefined;
  TYPE_ID: string | undefined;
}
interface Web {
  ID: number;
  VALUE_TYPE: string | undefined;
  VALUE: string | undefined;
  TYPE_ID: string | undefined;
}

interface Contact {
  ID: number;
  NAME: string;
  POST: string | undefined;
  BIRTHDATE: Date | undefined;
  PHONE: Phone[] | undefined;
  EMAIL: Email[] | undefined;
  WEB: Web[] | undefined;
  REQUISITES: Requisite[] | undefined;
  DATE_CREATE: Date;
  DATE_MODIFY: Date;
}

export type { Phone, Email, Web, Contact };
