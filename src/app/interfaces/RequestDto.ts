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
        "userNameCreatedBy": string



        "subdivCodeList": string[],
        "subdivIdList": number[],
        "subdivNameList": string[],

}
