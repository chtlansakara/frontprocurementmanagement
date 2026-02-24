export interface RequestDto{
        "id": number,

        "title": string | null,
        "description": string | null,

        "quantity": string | null,
        "fund": string | null,
        "estimation": string | null,



        "authorizedBy": string | null,
        "approvedDate": string  | null,

        "previouslyPurchased": boolean | null,
        "previousPurchaseYear": number | null,
        "reasonForRequirement": string | null,

        "status": string,

        "createdDate": string  | null,


        "emailCreatedBy": string,


        "userRoleCreatedBy": string,
        "admindivCodeCreatedBy": string,
        "admindivCreatedBy": string,
        "subdivCodeCreatedBy": string,
        "subdivCreatedBy": string,

        "employeeIdCreatedBy": string,
        "userIdCreatedBy": number,
        "userNameCreatedBy": string,

         "lastUpdatedDate": string |null,

        "emailLastUpdatedBy":string |null,
        "employeeIdLastUpdatedBy": string|null,
        "userIdLastUpdatedBy": number|null,
        "userNameLastUpdatedBy": string|null,
         "userRoleLastUpdatedBy": string|null,
        "admindivCodeLastUpdattedBy": string|null,
        "admindivLastUpdattedBy": string|null,
        "subdivCodeLastUpdatedBy": string|null,
        "subdivLastUpdatedBy": string|null,

        "subdivCodeList": string[],
        "subdivIdList": number[],
        "subdivNameList": string[],


        "procurementId":number,
        "procurementName": string |null,
        "procurementScheduledCommenceDate":string |null,
        "procurementExpectedCompletionDate":string |null,
        "procurementStatusId": number,
        "procurementStatusName":string |null,

}
