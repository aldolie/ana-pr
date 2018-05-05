import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  page: number = 0;
  size: number = 0;

  searchValue: string = "";


  users: User[];

  displayedColumns = ['email', 'name', 'active', 'action'];

  dataSource: MatTableDataSource<User>;


  pageEvent: PageEvent;


  constructor(private userService: UserService) { 
     
  }

  ngOnInit() {
    this.getUsers(this.searchValue);
  }

  getData($event): any {
     this.page = $event.pageIndex;
     this.getUsers(this.searchValue);
     return $event;
  }

  getUsers(email: string): void {
    this.userService.getUsers(email ,this.page + 1).subscribe((data: any) => {
      this.page = data.page - 1;
      this.size = data.count;
      this.users = data.result;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  searchUser() {
     this.getUsers(this.searchValue);
  }
}
