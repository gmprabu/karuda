import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UserCreationComponent } from '../user-creation/user-creation.component';
import { User } from '../model/user';
import { DialogsService } from '../shared/dialogs.service';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers :[UserListService]
})
export class UserListComponent implements OnInit {

  constructor(private authService: AuthService, 
    private dialog: MatDialog, 
    private dialogsService: DialogsService,
    private userService:UserListService
  ) { }

  displayedColumns = ['name', 'username', 'email', 'options'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  user = new User();
  editFlag:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(user: User) {
    this.editFlag = false;
    if(user){
    this.editFlag = true;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(UserCreationComponent, 
      { width: '500px', height: '500px', data: dialogConfig });

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

  delete(item: User) {
    this.dialogsService
      .confirm('Confirm  delete', 'Are you sure to delete this user?')
      .subscribe((res) => {
        if (res) {

        }
      });
  }

  logout() {
    this.authService.logout();
  }
}


const ELEMENT_DATA: User[] = [
  { id: 1, username: 'prabu', name: 'Prabu', email: 'prabu@gmail.com' },
  { id: 2, username: 'kavi', name: 'Kavi', email: 'kavi@gmail.com' },
  { id: 3, username: 'saravanan', name: 'Saravanan', email: 'saravanan@gmail.com' },
  { id: 4, username: 'dhansika', name: 'Dhansika', email: 'kutty@gmail.com' },
  { id: 5, username: 'mala', name: 'Mala', email: 'mala@gmail.com' },
  { id: 6, username: 'prakash', name: 'Prakash', email: 'prakash@gmail.com' },
  { id: 7, username: 'thulasi', name: 'Thulasi', email: 'thulasi@gmail.com' },
  { id: 8, username: 'muniyappan', name: 'Muniyappan', email: 'muniyappan@gmail.com' },
];
