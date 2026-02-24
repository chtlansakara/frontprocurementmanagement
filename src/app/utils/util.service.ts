import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

 //format request status on html - in list tables & view pages
  formatStatus(status: string): string{
    switch(status) {
      case 'PENDING_ADMIN_APPROVAL':
        return 'PENDING ADMIN';

      case 'REJECTED_ADMIN_APPROVAL':
        return 'X ADMIN';

        //when directed to supplies approval
      case 'PENDING_SUPPLIES_APPROVAL':
        return 'Pending SUPPLIES';

      case 'REJECTED_SUPPLIES_APPROVAL':
        return 'X SUPPLIES';

        //when approved by supplies
      case 'PENDING_PROCUREMENT':
        return '✔ SUPPLIES';

        //when a procurement is created for the request
      case 'PROCUREMENT_CREATED':
        return 'In Procurment';

        //postponed request - after approved by supplies
      case 'PROCUREMENT_POSTPONED':
        return 'Postponed';

        //cancelled request - after approved by supplies
      case 'PROCUREMENT_CANCELLED':
        return 'Cancelled';

      default:
        return 'Not defined';
    }
  }

  // request status formatting classes
  getStatusClass(status: string): string{
  switch(status) {
    case 'PENDING_ADMIN_APPROVAL':
      return 'status-admin-pending';

    case 'REJECTED_ADMIN_APPROVAL':
      return 'status-admin-rejected';

    case 'PENDING_SUPPLIES_APPROVAL':
      return 'status-supplies-pending';

    case 'REJECTED_SUPPLIES_APPROVAL':
      return 'status-supplies-rejected';

    case 'PENDING_PROCUREMENT':
      return 'status-pending-procurement';

    case 'PROCUREMENT_CREATED':
      return 'status-procuremnt-created';

        //postponed request - after approved by supplies
    // case 'PROCUREMENT_POSTPONED':
    //   return 'status-procuremnt-created';

    //   //cancelled request - after approved by supplies
    // case 'PROCUREMENT_CANCELLED':
    //   return 'status-procuremnt-created';

    default:
      return 'status-default';
  }
  }


  //format 'is previously purchased' column for requests
formatBoolean(value: boolean): string{
  if(value == true) return 'Yes';
  if(value == false) return 'No';
  return ' ';
}





}
