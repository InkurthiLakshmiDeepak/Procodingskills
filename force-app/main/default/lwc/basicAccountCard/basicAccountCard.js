import { LightningElement,api, track ,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
export default class BasicAccountCard extends LightningElement {
    @api accountDetails;
    @api rowIndex;
    @track editRecord = false;
    @wire(CurrentPageReference) pageRef;
    editRecordAction(event){
        this.editRecord= true;
    }
    handleSuccess(event){
        this.editRecord= false;
        const tostmsg = new ShowToastEvent({
            title: 'Account Updated',
            message: 'Action is completed.',
        });
        this.dispatchEvent(tostmsg);
        this.dispatchEvent(new CustomEvent('recordupdate',{
            detail: "Updated"
        }));
    }

    @track data;
    eventFiredCallback;
    @api
    pubsubRegister(event){
        this.data={accountName : "LakshmiDeepak",Phone : "9986973450"} ; 
        this.eventFiredCallback =  this.data; 
        fireEvent(this.pageRef, 'pubsubevents', this.eventFiredCallback);
    }
}