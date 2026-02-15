import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RequestDto{
        "approvedDate": string  | null,
        "authorizedBy": string | null,
        "createdDate": string  | null,
        "description": string | null,
        "emailCreatedBy": string,
        "employeeIdCreatedBy": string,
        "estimation": string | null,
        "fund": string | null,
        "id": number,
        "previousPurchaseYear": number | null,
        "previouslyPurchased": boolean | null,
        "quantity": string | null,
        "reasonForRequirement": string | null,
        "status": string,
        "subdivCodeList": string[],
        "subdivIdList": number[],
        "subdivNameList": string[],
        "title": string | null,
        "userIdCreatedBy": number,
        "userNameCreatedBy": string
}

//for data source
const requestsList : RequestDto[] = [
    {
        "approvedDate": "2026-02-15T00:00:00.000Z",
        "authorizedBy": null,
        "createdDate": null,
        "description": "Purchase 10 new laptops for the development team",
        "emailCreatedBy": "cht@test.com",
        "employeeIdCreatedBy": "50021500",
        "estimation": "1500 USD per laptop",
        "fund": "IT Budget 2026",
        "id": 6,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "10",
        "reasonForRequirement": "Upgrade outdated equipment",
        "status": "REJECTED_ADMIN_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Laptops for Staff",
        "userIdCreatedBy": 2,
        "userNameCreatedBy": "Chathurangi"
    },
    {
        "approvedDate": "2026-02-13T00:00:00.000Z",
        "authorizedBy": "Finance Manager",
        "createdDate": null,
        "description": "Ergonomic chairs for staff",
        "emailCreatedBy": "cht@test.com",
        "employeeIdCreatedBy": "50021500",
        "estimation": "5000 USD",
        "fund": "Office Budget 2026",
        "id": 7,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "20",
        "reasonForRequirement": "Replacing old chairs",
        "status": "REJECTED_ADMIN_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Office Chairs",
        "userIdCreatedBy": 2,
        "userNameCreatedBy": "Chathurangi"
    },
    {
        "approvedDate": "2026-02-13T00:00:00.000Z",
        "authorizedBy": "Finance Manager",
        "createdDate": null,
        "description": "Ergonomic chairs for staff",
        "emailCreatedBy": "cht@test.com",
        "employeeIdCreatedBy": "50021500",
        "estimation": "5000 USD",
        "fund": "Office Budget 2026",
        "id": 8,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "20",
        "reasonForRequirement": "Replacing old chairs",
        "status": "PENDING_ADMIN_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Office Chairs",
        "userIdCreatedBy": 2,
        "userNameCreatedBy": "Chathurangi"
    },
    {
        "approvedDate": "2026-02-13T00:00:00.000Z",
        "authorizedBy": "Finance Manager",
        "createdDate": null,
        "description": "Ergonomic chairs for staff",
        "emailCreatedBy": "cht@test.com",
        "employeeIdCreatedBy": "50021500",
        "estimation": "5000 USD",
        "fund": "Office Budget 2026",
        "id": 9,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "20",
        "reasonForRequirement": "Replacing old chairs",
        "status": "PENDING_ADMIN_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Office Chairs",
        "userIdCreatedBy": 2,
        "userNameCreatedBy": "Chathurangi"
    },
    {
        "approvedDate": null,
        "authorizedBy": "HR Head",
        "createdDate": "2026-02-14T14:53:59.162Z",
        "description": "Laptops",
        "emailCreatedBy": "rangika@test.com",
        "employeeIdCreatedBy": "500214875",
        "estimation": "1000 USD",
        "fund": "101",
        "id": 15,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "2",
        "reasonForRequirement": "New staff onboarding",
        "status": "PENDING_SUPPLIES_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Laptops",
        "userIdCreatedBy": 3,
        "userNameCreatedBy": "Rangika"
    },
    {
        "approvedDate": "2026-02-13T00:00:00.000Z",
        "authorizedBy": "Finance Manager",
        "createdDate": "2026-02-14T15:35:51.424Z",
        "description": "Ergonomic chairs for staff",
        "emailCreatedBy": "cht@test.com",
        "employeeIdCreatedBy": "50021500",
        "estimation": "5000 USD",
        "fund": "Office Budget 2026",
        "id": 19,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "20",
        "reasonForRequirement": "Replacing old chairs",
        "status": "PENDING_SUPPLIES_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Office Chairs",
        "userIdCreatedBy": 2,
        "userNameCreatedBy": "Chathurangi"
    },
    {
        "approvedDate": "2026-02-13T00:00:00.000Z",
        "authorizedBy": "Finance Manager",
        "createdDate": "2026-02-14T15:38:16.416Z",
        "description": "Ergonomic chairs for staff",
        "emailCreatedBy": "cht@test.com",
        "employeeIdCreatedBy": "50021500",
        "estimation": "5000 USD",
        "fund": "Office Budget 2026",
        "id": 20,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "20",
        "reasonForRequirement": "Replacing old chairs",
        "status": "PENDING_SUPPLIES_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Office Chairs",
        "userIdCreatedBy": 2,
        "userNameCreatedBy": "Chathurangi"
    },
    {
        "approvedDate": null,
        "authorizedBy": "HR Head",
        "createdDate": "2026-02-14T15:47:27.681Z",
        "description": "Laptops",
        "emailCreatedBy": "rangika@test.com",
        "employeeIdCreatedBy": "500214875",
        "estimation": "1000 USD",
        "fund": "101",
        "id": 21,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "2",
        "reasonForRequirement": "New staff onboarding",
        "status": "PENDING_SUPPLIES_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Laptops",
        "userIdCreatedBy": 3,
        "userNameCreatedBy": "Rangika"
    },
    {
        "approvedDate": null,
        "authorizedBy": "HR Head",
        "createdDate": "2026-02-14T15:48:34.812Z",
        "description": "Laptops",
        "emailCreatedBy": "rangika@test.com",
        "employeeIdCreatedBy": "500214875",
        "estimation": "1000 USD",
        "fund": "101",
        "id": 22,
        "previousPurchaseYear": null,
        "previouslyPurchased": false,
        "quantity": "2",
        "reasonForRequirement": "New staff onboarding",
        "status": "PENDING_SUPPLIES_APPROVAL",
        "subdivCodeList": [
            "DOM-FOS"
        ],
        "subdivIdList": [
            6
        ],
        "subdivNameList": [
            "Department of Mathematics"
        ],
        "title": "New Laptops",
        "userIdCreatedBy": 3,
        "userNameCreatedBy": "Rangika"
    }
];


@Component({
  selector: 'app-subdiv-requests-list',
  standalone: false,
  templateUrl: './subdiv-requests-list.component.html',
  styleUrl: './subdiv-requests-list.component.scss'
})
export class SubdivRequestsListComponent {

  diplayedColumns: string[] = [
    'id',
    'title',
    'description',
    'quantity',
    'fund',
    'estimation',
    'previouslyPurchased',
    'previousPurchaseYear',
    'reasonForRequirement',
    'authorizedBy',
    'approvedDate',

    'status',
    'userNameCreatedBy',
    'employeeIdCreatedBy',
    'createdDate',
    // 'actions'
  ];

  datasource = new MatTableDataSource<RequestDto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.datasource.data= requestsList;
  }

  ngAfterViewInit(): void{
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


  //status formatting
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

      default:
        return 'status-default';
    }
  }

  //format status on html
  formatStatus(status: string): string{
    switch(status) {
      case 'PENDING_ADMIN_APPROVAL':
        return 'ADMIN Pending';

      case 'REJECTED_ADMIN_APPROVAL':
        return 'ADMIN Rejected';

      case 'PENDING_SUPPLIES_APPROVAL':
        return 'ADMIN Approved';

      case 'REJECTED_SUPPLIES_APPROVAL':
        return 'Supplies Pending';

      case 'PENDING_PROCUREMENT':
        return 'Supplies Approved';

      case 'PROCUREMENT_CREATED':
        return 'In Procurment';

      default:
        return 'status-default';
  }
}

//format previously purchased column

formatBoolean(value: boolean): string{
  if(value == true) return 'Yes';
  if(value == false) return 'No';
  return ' ';
}

//get if of a row
getId(row: RequestDto){
  console.log(row.id);
}
}
