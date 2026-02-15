export interface CommentDto {
  "id": number,

  "authorizedBy": string | null,
  "content": string | null,


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

  "createdDate":string
}
