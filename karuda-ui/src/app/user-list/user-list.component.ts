import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UserCreationComponent } from '../user-creation/user-creation.component';
import { User } from '../model/user';
import { DialogsService } from '../shared/dialogs.service';
import { UserListService } from './user-list.service';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

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
    private userService:UserListService,
    private router:Router,
    private commonService:CommonService
  ) { }

  displayedColumns = ['name', 'username', 'email','role', 'options'];
  dataSource = new MatTableDataSource<User>();
  user = new User();
  editFlag:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this. getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((data) => {
      console.log(data[0].roles);
      this.dataSource = new MatTableDataSource<User>(data);;
    });
  }

  editUser(user: User) {
    this.commonService.setUser(user);
    this.router.navigateByUrl('/createUser');
  }
  createUser(){
    this.commonService.setUser(null);
    this.router.navigateByUrl('/createUser');
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


/* const ELEMENT_DATA: User[] = [
  { id: 1, username: 'prabu', name: 'Prabu',role:'', email: 'prabu@gmail.com' },
  { id: 2, username: 'kavi', name: 'Kavi',role:'', email: 'kavi@gmail.com' },
  { id: 3, username: 'saravanan', name: 'Saravanan',role:'', email: 'saravanan@gmail.com' },
  { id: 4, username: 'dhansika', name: 'Dhansika',role:'', email: 'kutty@gmail.com' },
  { id: 5, username: 'mala', name: 'Mala',role:'', email: 'mala@gmail.com' },
  { id: 6, username: 'prakash', name: 'Prakash',role:'', email: 'prakash@gmail.com' },
  { id: 7, username: 'thulasi', name: 'Thulasi',role:'', email: 'thulasi@gmail.com' },
  { id: 8, username: 'muniyappan', name: 'Muniyappan',role:'', email: 'muniyappan@gmail.com' },
]; */
