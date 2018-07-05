import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UserCreationComponent } from '../user-creation/user-creation.component';
import { UserListService } from './user-list.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DialogsService } from '../../shared/dialogs.service';
import { CommonService } from '../../shared/common.service';
import { User } from '../../model/user';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

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
    private commonService:CommonService,
    private toastr: ToastrService,
  ) {
    this.options = this.toastr.toastrConfig;
   }

  displayedColumns = ['name', 'username', 'email','role', 'options'];
  dataSource = new MatTableDataSource<User>();
  user = new User();
  editFlag:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  options: GlobalConfig;
  ngOnInit() {
    this.options.closeButton = true;
    this.options.positionClass = 'toast-top-full-width';
    this.options.timeOut = 5000000;
    this.dataSource.paginator = this.paginator;
    this.commonService.startSpinner();
    this. getAllUsers();
    this.toastr.success('Hello world!', 'Toastr fun!', this.options);
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource<User>(data);
      this.commonService.stopSpinner();
    });
  }

  editUser(user: User) {
    this.commonService.setUser(user);
    this.router.navigateByUrl('/editUser');
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
          this.commonService.startSpinner();
          this.userService.removeUser(item).subscribe((data) => {
            this.getAllUsers(); console.log('deleted successfully');
          });
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
