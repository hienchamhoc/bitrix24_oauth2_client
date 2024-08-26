import { Address } from "../types/address";
import { Bankdetail } from "../types/bankdetail";
import { Contact, Email, Phone, Web } from "../types/contact";
import { Requisite } from "../types/requisite";

const compare2Contact = (before: Contact, after: Contact) => {
  let diff: Contact = { ID: after.ID } as Contact;
  for (const [key, value] of Object.entries(after)) {
    switch (key) {
      case "PHONE":
        let diffPhones: Phone[] = [];
        const phoneBefore = (before as any)[key]
          ? ((before as any)[key] as Phone[])
          : [];
        let phoneAfter = (after as any)[key]
          ? ((after as any)[key] as Phone[])
          : [];
        let diffPhone: Phone = {} as Phone;
        for (let i = 0; i < phoneAfter.length; i++) {
          const idFound = phoneBefore.findIndex(
            (ele) => ele.ID == phoneAfter[i].ID
          );

          if (idFound != -1) {
            for (const [phoneKey, PhoneValue] of Object.entries(
              phoneAfter[i]
            )) {
              if (
                (phoneAfter[i] as any)[phoneKey] !==
                (phoneBefore[idFound] as any)[phoneKey]
              ) {
                (diffPhone as any)[phoneKey] = (phoneAfter[i] as any)[phoneKey];
              }
            }

            if (JSON.stringify(diffPhone) !== JSON.stringify({})) {
              diffPhone.ID = phoneAfter[i].ID;
            }
            diffPhones.push(diffPhone);
          } else {
            delete (phoneAfter[i] as any).ID;
            diffPhones.push(phoneAfter[i]);
          }
        }
        for (let i = 0; i < phoneBefore.length; i++) {
          const idFound = phoneAfter.findIndex(
            (ele) => ele.ID == phoneBefore[i].ID
          );
          if (idFound == -1) {
            diffPhones.push({ ID: phoneBefore[i].ID } as Phone);
          }
        }
        (diff as any)[key] = diffPhones;
        break;
      case "EMAIL":
        let diffEmails: Email[] = [];
        const emailBefore = (before as any)[key]
          ? ((before as any)[key] as Email[])
          : [];
        const emailAfter = (after as any)[key]
          ? ((after as any)[key] as Email[])
          : [];
        let diffEmail: Email = {} as Email;
        for (let i = 0; i < emailAfter.length; i++) {
          const idFound = emailBefore.findIndex(
            (ele) => ele.ID == emailAfter[i].ID
          );
          if (idFound != -1) {
            for (const [emailKey, emailValue] of Object.entries(
              emailAfter[i]
            )) {
              if (
                (emailAfter[i] as any)[emailKey] !==
                (emailBefore[idFound] as any)[emailKey]
              ) {
                (diffEmail as any)[emailKey] = (emailAfter[i] as any)[emailKey];
              }
            }
            if (JSON.stringify(diffEmail) !== JSON.stringify({})) {
              diffEmail.ID = emailAfter[i].ID;
            }
            diffEmails.push(diffEmail);
          } else {
            delete (emailAfter[i] as any).ID;
            diffEmails.push(emailAfter[i]);
          }
        }
        for (let i = 0; i < emailBefore.length; i++) {
          const idFound = emailAfter.findIndex(
            (ele) => ele.ID == emailBefore[i].ID
          );
          if (idFound == -1) {
            diffEmails.push({ ID: emailBefore[i].ID } as Email);
          }
        }
        (diff as any)[key] = diffEmails;
        break;
      case "WEB":
        let diffWebs: Web[] = [];
        const webBefore = (before as any)[key]
          ? ((before as any)[key] as Web[])
          : [];
        const webAfter = (after as any)[key]
          ? ((after as any)[key] as Web[])
          : [];
        let diffWeb: Web = {} as Web;
        for (let i = 0; i < webAfter.length; i++) {
          const idFound = webBefore.findIndex(
            (ele) => ele.ID == webAfter[i].ID
          );
          if (idFound != -1) {
            for (const [webKey, webValue] of Object.entries(webAfter[i])) {
              if (
                (webAfter[i] as any)[webKey] !==
                (webBefore[idFound] as any)[webKey]
              ) {
                (diffWeb as any)[webKey] = (webAfter[i] as any)[webKey];
              }
            }
            if (JSON.stringify(diffWeb) !== JSON.stringify({})) {
              diffWeb.ID = webAfter[i].ID;
            }
            diffWebs.push(diffWeb);
          } else {
            delete (webAfter[i] as any).ID;
            diffWebs.push(webAfter[i]);
          }
        }
        for (let i = 0; i < webBefore.length; i++) {
          const idFound = webAfter.findIndex(
            (ele) => ele.ID == webBefore[i].ID
          );
          if (idFound == -1) {
            diffWebs.push({ ID: webBefore[i].ID } as Web);
          }
        }
        (diff as any)[key] = diffWebs;
        break;
      case "BIRTHDATE":
        if (
          new Date((before as any)[key]).getTime() !==
          new Date((after as any)[key]).getTime()
        ) {
          (diff as any)[key] = (after as any)[key];
        }
        break;
      case "DATE_CREATE":
        if (
          new Date((before as any)[key]).getTime() !==
          new Date((after as any)[key]).getTime()
        ) {
          (diff as any)[key] = (after as any)[key];
        }
        break;
      case "DATE_MODIFY":
        if (
          new Date((before as any)[key]).getTime() !==
          new Date((after as any)[key]).getTime()
        ) {
          (diff as any)[key] = (after as any)[key];
        }
        break;
      case "REQUISITES":
        const diffRequisites: Requisite[] = [];
        const requisiteBefore = (before as any)[key]
          ? ((before as any)[key] as Requisite[])
          : [];
        const requisiteAfter = (after as any)[key]
          ? ((after as any)[key] as Requisite[])
          : [];
        for (let i = 0; i < requisiteAfter.length; i++) {
          const idFound = requisiteBefore.findIndex(
            (ele) => ele.ID == requisiteAfter[i].ID
          );
          if (idFound != -1) {
            let diffRequisite: Requisite = {
              ID: requisiteAfter[i].ID,
            } as Requisite;
            for (const [requisiteKey, requisiteValue] of Object.entries(
              requisiteAfter[i]
            )) {
              switch (requisiteKey) {
                case "ADDRESSES":
                  let diffAddresses: Address[] = [];
                  const addressBefore = (requisiteBefore[idFound] as any)[
                    requisiteKey
                  ]
                    ? ((requisiteBefore[idFound] as any)[
                        requisiteKey
                      ] as Address[])
                    : [];
                  const addressAfter = (requisiteAfter[i] as any)[requisiteKey]
                    ? ((requisiteAfter[i] as any)[requisiteKey] as Address[])
                    : [];
                  for (let j = 0; j < addressAfter.length; j++) {
                    const idAddressFound = addressBefore.findIndex(
                      (ele) => ele.ID == addressAfter[j].ID
                    );
                    if (idAddressFound != -1) {
                      let diffAddress: Address = {
                        ID: addressAfter[j].ID,
                      } as Address;
                      for (const [addressKey, addressValue] of Object.entries(
                        addressAfter[j]
                      )) {
                        if (
                          (addressAfter[j] as any)[addressKey] !==
                          (addressBefore[idAddressFound] as any)[addressKey]
                        ) {
                          (diffAddress as any)[addressKey] = (
                            addressAfter[j] as any
                          )[addressKey];
                        }
                      }

                      diffAddresses.push(diffAddress);
                    } else {
                      delete (addressAfter[j] as any).ID;
                      diffAddresses.push(addressAfter[j]);
                    }
                  }
                  (diffRequisite as any)[requisiteKey] = diffAddresses;
                  break;
                case "BANKDETAILS":
                  let diffBankdetails: Bankdetail[] = [];
                  const bankdetailBefore = (requisiteBefore[idFound] as any)[
                    requisiteKey
                  ] as Bankdetail[];
                  const bankdetailAfter = (requisiteAfter[i] as any)[
                    requisiteKey
                  ] as Bankdetail[];
                  for (let j = 0; j < bankdetailAfter.length; j++) {
                    const idBakdetailFound = bankdetailBefore.findIndex(
                      (ele) => ele.ID == bankdetailAfter[j].ID
                    );
                    if (idBakdetailFound != -1) {
                      let diffBankdetail: Bankdetail = {
                        ID: bankdetailAfter[j].ID,
                      } as Bankdetail;
                      for (const [
                        bankdetailKey,
                        bankdetailValue,
                      ] of Object.entries(bankdetailAfter[j])) {
                        if (
                          (bankdetailAfter[j] as any)[bankdetailKey] !==
                          (bankdetailBefore[idBakdetailFound] as any)[
                            bankdetailKey
                          ]
                        ) {
                          (diffBankdetail as any)[bankdetailKey] = (
                            bankdetailAfter[j] as any
                          )[bankdetailKey];
                        }
                      }

                      diffBankdetails.push(diffBankdetail);
                    } else {
                      delete (bankdetailAfter[j] as any).ID;
                      diffBankdetails.push(bankdetailAfter[j]);
                    }
                  }
                  (diffRequisite as any)[requisiteKey] = diffBankdetails;
                  break;
                default:
                  if (
                    (requisiteBefore[idFound] as any)[requisiteKey] !==
                    (requisiteAfter[i] as any)[requisiteKey]
                  ) {
                    (diffRequisite as any)[requisiteKey] = (
                      requisiteAfter[i] as any
                    )[requisiteKey];
                  }
                  break;
              }
            }

            diffRequisites.push(diffRequisite);
          } else {
            delete (requisiteAfter[i] as any).ID;
            diffRequisites.push(requisiteAfter[i]);
          }
        }
        (diff as any)[key] = diffRequisites;
        break;
      default:
        if ((before as any)[key] !== (after as any)[key]) {
          (diff as any)[key] = (after as any)[key];
        }
        break;
    }
  }

  return diff;
};

export default compare2Contact;
