import { LightningElement,api } from 'lwc';

export default class BasicContactList extends LightningElement {
    @api accountrecordid;
    @api accountname;
}