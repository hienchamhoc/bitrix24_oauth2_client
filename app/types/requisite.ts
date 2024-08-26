import { Address } from "./address";
import { Bankdetail } from "./bankdetail";

interface Requisite {
  ID: number;
  ENTITY_TYPE_ID: number;
  ENTITY_ID: number;
  NAME: string;
  RQ_FIRST_NAME: string;
  RQ_LAST_NAME: string;
  ADDRESSES: Address[] | undefined;
  BANKDETAILS: Bankdetail[] | undefined;
}

export type { Requisite };
