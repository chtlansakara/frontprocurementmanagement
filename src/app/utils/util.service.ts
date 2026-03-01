import { Injectable } from '@angular/core';
import { StorageService } from '../auth/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

   //format procurement stages on html - in list tables & view pages
  formatProcurementStage(stage: string): string{


    switch(stage) {
      case "PROCUREMENT_PROCESS_NOT_COMMENCED":
        return 'Not Commenced yet';

      case "PURCHASE_PROCESS_COMMENCED":
        return 'In Purchase Process';

      case "PURCHASE_ORDERS_ISSUED":
        return 'PO Issued';

      case "GOODS_RECEIVED":
        return 'Goods Received';


      case "PAID_AND_COMPLETED":
        return 'Paid & Completed';

      default:
        return 'Not defined';
    }
  }





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
        return 'In Procurement';

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
      return 'status-procurement-created';

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


//getting user info to show in the navigation bar
getUserInfo(){
  const user = StorageService.getUser();

  let userAccount : string = '';

  //getting account name by the user role
  if(user.userRole == 'SUBDIVUSER'){userAccount = user.subdivName + ' User'; }
  else if(user.userRole == 'ADMINDIVUSER'){userAccount = user.admindivName + ' User'; }
  else if(user.userRole == 'SUPPLIESUSER'){userAccount =  'Supplies User'; }
  else if(user.userRole == 'ADMIN'){userAccount = 'Admin User';}

  const userInfo = {
    email: user.email,
    account: userAccount
  };

  return userInfo;
}


//for notifications
  getDotClass(type: string): string {
    const map: Record<string, string> = {
      'REQUEST_SUBMITTED':            'dot-yellow',
      'REQUEST_APPROVED_BY_ADMIN':    'dot-green',
      'REQUEST_REJECTED_BY_ADMIN':    'dot-red',
      'REQUEST_APPROVED_BY_SUPPLIES': 'dot-green',
      'REQUEST_REJECTED_BY_SUPPLIES': 'dot-red',
      'PROCUREMENT_CREATED':          'dot-blue',
      'PROCUREMENT_STATUS_UPDATE':    'dot-purple',
    };
    return map[type] ?? 'dot-gray';
  }

  getToastIcon(type: string): string {
    const map: Record<string, string> = {
      success: 'check_circle',
      error:   'error',
      warning: 'warning',
      info:    'info'
    };
    return map[type] ?? 'info';
  }

}
