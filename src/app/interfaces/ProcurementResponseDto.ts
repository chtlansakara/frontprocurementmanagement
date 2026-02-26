export interface ProcurementResponseDto{
        "id": number,
        "number": string |null,
        "name" :string |null,
        "quantity": number,
        "estimatedAmount": number,
        "category": string |null,
        "procurementStage": string,

        "donorName" : string |null,
        "method":  string |null,
        "authorityLevel": string |null,
        "priorityStatus": string |null,
        "remarks":  string |null,
        "vendorDetails": string |null,
        "scheduledCommenceDate":  string |null,
        "expectedCompletionDate": string |null,
        "commencedDate":string |null,
        "completedDate":string |null,
         "VendorComments": null,

        "assignedToUserId": number,
        "assignedToUserEmail": string |null,
        "assignedToUsername": string |null,
        "assignedToUserEmployeeId": string |null,
        "assignedToUserDesignation": string |null,

        "statusId":number | null,
        "statusName":  string |null,

        "vendorId": number,
        "vendorName":  string |null,
        "vendorRegisteredDate" :  string |null,
        "vendorComments" :  string |null,

        "sourceId": number,
        "sourceName":string ,
        "sourceDescription":  string |null,


        "createdOn" : string,
        "lastUpdatedOn" : string |null,


        "userIdCreatedBy": number,
        "emailCreatedBy":string |null,
        "userNameCreatedBy":string |null,
        "employeeIdCreatedBy":string |null,
        "userRoleCreatedBy":string |null,
        "designationCreatedBy":string |null,

        "subdivCreatedBy":string |null,
        "subdivCodeCreatedBy":string |null,
        "admindivCreatedBy":string |null,
        "admindivCodeCreatedBy":string |null,



        "userIdLastUpdatedBy":number,
        "emailLastUpdatedBy":string |null,
        "userNameLastUpdatedBy":string |null,
        "employeeIdLastUpdatedBy":string |null,
        "userRoleLastUpdatedBy":string |null,
        "designationUpdatedBy":string |null,

        "subdivLastUpdatedBy":string |null,
        "subdivCodeLastUpdatedBy":string |null,
        "admindivLastUpdatedBy":string |null,
        "admindivCodeLastUpdatedBy":string |null,



        "requestId": number,
        "requestTitle": string | null,
        "requestApprovedBy": string,
        "requestApprovedDate": string,
        "requestSubdivIdList": [],
        "requestSubdivNameList": [],
        "requestSubdivCodeList": [],
        "requestEstimation": string,
        "requestFund": string | null,

        "requestAdmindivId": number,
    "requestAdmindivName": string,
    "requestAdmindivCode": string,
    "requestAdmindivResponsible": string,


        "requestCreatedDate": string,

        "requestUserIdCreatedBy": string,
        "requestUserEmailCreatedBy": string,
         "requestSubdivCodeCreatedBy": string,
        "requestAdmindivCodeCreatedBy": string,

        "requestEmployeeCreatedBy": string,
        "requestEmployeeIdCreatedBy": string,

}
