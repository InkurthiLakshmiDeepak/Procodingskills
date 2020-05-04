import { LightningElement, wire, track } from "lwc";
import getAccounts from "@salesforce/apex/BasicAccountInformationServer.getAccounts";
import { CurrentPageReference } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { registerListener, unregisterAllListeners, fireEvent } from "c/pubsub";
const actions = [
  { label: "Show details", name: "show_details" },
  { label: "Delete", name: "delete" },
];
export default class BasicAccountInformation extends LightningElement {
  accountName;
  accountPhone;
  @track record = {};
  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Phone", fieldName: "Phone", type: "phone" },
    { label: "Active", fieldName: "Active__c" },
    {
      type: "action",
      typeAttributes: { rowActions: actions },
    },
  ];
  @wire(CurrentPageReference) pageRef;
  connectedCallback() {
    registerListener("pubsubevents", this.pubsubhandler, this);
  }

  disconnectedCallback() {
     unregisterAllListeners(this);
  }
  accountNameChange(event) {
    this.accountName = event.target.value;
  }
  accountPhoneChange(event) {
    this.accountPhone = event.target.value;
  }

  @track accounts;
  @track accountserror;
  searchAccounts(event) {
    let nameLooking = this.template.querySelector(
      "lightning-input[data-my-id=account-name]"
    ).value;
    let phoneLooking = this.template.querySelector(
      "lightning-input[data-my-id=account-phone]"
    ).value;
    getAccounts({ accountName: nameLooking, accountPhone: phoneLooking })
      .then((result) => {
        this.accounts = result;
        this.accountserror = undefined;
      })
      .catch((error) => {
        if (Array.isArray(error.body)) {
          this.accountserror = error.body.map((e) => e.message).join(", ");
        } else if (typeof error.body.message === "string") {
          this.accountserror = error.body.message;
        }
        this.accounts = undefined;
      });
  }
 handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "delete":
        this.deleteRow(row);
        break;
      case "show_details":
        this.showRowDetails(row);
        break;
      default:
    }
  }
  deleteRow(row) {
    const recId = row.Id;
    const index = this.findRowIndexById(recId);
    if (index !== -1) {
      this.accounts = this.accounts
        .slice(0, index)
        .concat(this.accounts.slice(index + 1));
    }
  }
  findRowIndexById(id) {
    let ret = -1;
    this.accounts.some((row, index) => {
      if (row.Id === id) {
        ret = index;
        return true;
      }
      return false;
    });
    return ret;
  }
  showRowDetails(row) {
    this.record = row;
  }

  pubsubhandler(payload) {
    const tostmsg = new ShowToastEvent({
      title: "Account Updated",
      message: JSON.stringify(payload.accountName),
      variant: "success",
    });
    this.dispatchEvent(tostmsg);
  }
 
}
