import { Component, TemplateRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule, Form} from '@angular/forms';
import { Users } from './model/users';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


users: Users[] = [];
editedUser: Users[] = [];

constructor(private modalService: NgbModal, private usersService: UsersService) {}  

ngOnInit(): void {
  this.getUsers();
}

getUsers() {
  this.usersService.getUsers().subscribe({
    next: (v) => {
      this.users = v;
      console.log(v)
    },
    error: (e) => {
      console.log("this is the error " + e)
    }
  })
}

deleteUser(userId: number) {
  this.usersService.deleteUser(userId).subscribe({
    next: (v) => {
      console.log("This user has been deleted " + v)
    },
    error: (e) => {
      console.log(e)
    }
  })  
}

editUser(userId: number){
  this.usersService.editUser(userId).subscribe()
}



openModal(content: any){
  this.modalService.open(content);
}

closeModal(){
  // this.modalService.close();
}

}
