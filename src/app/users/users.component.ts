import { Component, TemplateRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup} from '@angular/forms';
import { addUser, Users } from './model/users';
import { UsersService } from './services/users.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

// Define class properties
users: Users[] = []; // Store user data
addNewUser: addUser[] = []; // Store data for adding new users
editedUser: addUser[] = []; // Store data for editing users
processingUsers: boolean = false; // Indicates if user data is being processed
page: number = 1; // Pagination page number

// Constructor to inject services
constructor(private modalService: NgbModal, private usersService: UsersService, private notifierService: NotifierService) {}

// Initialize component
ngOnInit(): void {
  this.getUsers(); // Fetch initial user data
}

  // Define a form group for user input
userForm = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  username: new FormControl('', Validators.required),
})

 // Clear the user input form
clearForm(){
  this.userForm.reset();
}

// Fetch users from the service
getUsers() {
  this.processingUsers = true;
  this.usersService.getUsers().subscribe({
    next: (v) => {
      this.processingUsers = false;
      this.users = v;
    },
    error: (e) => {
      // Handle errors when fetching users
      this.notifierService.notify("error", "Error fetching Users!");
      this.processingUsers = false;
    }
  })
}

// Delete a user by ID
deleteUser(userId: number) {
  this.usersService.deleteUser(userId).subscribe({
    next: (v) => {
      // Notify success on user deletion
      this.notifierService.notify("success", "This user was deleted successfully!")
    },
    error: (error) => {
      // Handle errors when deleting a user
      console.error(error, "User cannot be deleted!" )
    }
  })
}


// Handle user form submission for editing
onEditSubmit(userForm: FormGroup, userId: number){
  this.editedUser = userForm.value;
  this.editUser(userId, this.editedUser);
}

// Edit a user's data
editUser(userId: number, editedUser: addUser[]) {
  this.usersService.editUser(userId, editedUser).subscribe({
    next: (v) => {
      // Notify success on user edit
      this.notifierService.notify("success", "This user had been updated!")
      this.clearForm(); // Clear the form after editing
  },
  error: (e) => {
    // Handle errors when editing a user
    console.error("Error editing user:",e);
  }
})
}

// Handle user form submission for adding
onSubmit(userForm: FormGroup){
  this.addNewUser = userForm.value;
  this.submitUserForm(this.addNewUser);
}

// Submit a new user's data
submitUserForm(addNewUser: addUser[]) {
  this.usersService.addNewUser(addNewUser).subscribe({
    next: (v) => {
      // Notify success on user addition
      this.notifierService.notify("success", "User added successfully!");
      this.clearForm(); // Clear the form after adding
    },
    error: (e) => {
      console.error("Error adding user:",e);
    }
  });
}

// Open a modal for adding a new user
openModal(content: any){
  this.modalService.open(content);
  this.clearForm(); // Clear the form when the modal is opened
}

// Open a modal for editing a user
openEditModal(editUserModal: TemplateRef<any>, user: number) {
  this.modalService.open(editUserModal);
}

// Close all open modals
closeModal(){
  this.modalService.dismissAll();
}

}
