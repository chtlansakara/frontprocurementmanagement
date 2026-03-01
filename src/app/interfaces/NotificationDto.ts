export type NotificationType =
| 'REQUEST_SUBMITTED'
  | 'REQUEST_APPROVED_BY_ADMIN'
  | 'REQUEST_REJECTED_BY_ADMIN'
  | 'REQUEST_APPROVED_BY_SUPPLIES'
  | 'REQUEST_REJECTED_BY_SUPPLIES'
  | 'PROCUREMENT_CREATED'
  | 'PROCUREMENT_STATUS_UPDATE';

  export type AuditEntityType = 'REQUEST' | 'PROCUREMENT';

  export interface AppNotification{
    id: number,
    message: string,
    type: NotificationType,
    referenceType: AuditEntityType,
    referenceId : number,
    userId : number;
    isRead: boolean,
    createdAt : string
  }


