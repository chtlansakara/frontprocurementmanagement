export interface ApprovalDto{
  "id": number,

  "comment": string | null,
  "allocatedAmount": number,
  "amountInWords": string |null,
  "approvedDate": string | null,
  "authorizedBy": string | null,

  "fund": string |null,
  "planNo": number,

  "type": string,

  "requestId" : number,
  "requestTitle": string |null,
  "requestSubdivCodeList": string [],
  "requestSubdivIdList" : number[],
  "requestSubdivNameList" : string[],

  "createdByUserEmail": string,
  "createdByUserEmployeeId": string,
  "createdByUserId": number,
  "createdbyUsername": string,

  "userRoleCreatedBy": string,
  "admindivCodeCreatedBy": string,
  "admindivCreatedBy": string,
  "subdivCodeCreatedBy": string,
  "subdivCreatedBy": string,

  "createdDate":string
}
