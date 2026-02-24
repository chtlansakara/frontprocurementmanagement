export interface ProcurementCreateDto{

        "number": string |null,
        "name" :string |null,
        "quantity": number,
        "estimatedAmount": number,
        "category": string |null,
        "source" : string |null,
        "donorName" : string |null,
        "method":  string |null,
        "authorityLevel": string |null,
        "priorityStatus": string |null,
        "remarks":  string |null,
        "vendorDetails": string |null,
        "scheduledCommenceDate":  string |null,
        "expectedCompletionDate": string |null,

        "assignedToUserId": number,


        "statusId":number,


        "vendorId": number,

        "requestIdList": number[]


}
