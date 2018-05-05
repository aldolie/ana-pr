import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: number;
  email: string;
  form: FormGroup;                    
  private formSubmitAttempt: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {

  /*id: number;
  priviledge: number;*/
    this.form = this.fb.group({     
      email: ['', Validators.required],
      name: ['', Validators.required],
      active: [false],
      dateOfBirth: ['', Validators.required],
      country: ['',Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: [null, Validators.required], 
      basic: [false],
      pro: [false],
    });
    this.form.get('email').disable();
    this.getUser();
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    let { name, email, active, dateOfBirth, country, region, postalCode, phoneNumber, role, basic, pro} = this.form.value;
    if (this.form.valid) {
      this.userService.updateUser(this.id, {
        id: this.id,
        name: name,
        email: this.email,
        active: active,
        dateOfBirth: dateOfBirth,
        country: country,
        region: region,
        postalCode: postalCode,
        phoneNumber:phoneNumber,
        role:role,
      }).subscribe(user => {
        this.setValue(user);
      }, error => {
        console.log(error);
      }) 
    }
    this.formSubmitAttempt = true;            
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.userService.getUser(id)
      .subscribe(user => {
        this.setValue(user);
      }, error => {
        console.log(error);
      });
  }

  setValue(user: User): void {
        this.email = user.email;
        this.form.controls['email'].setValue(user.email);
        this.form.controls['name'].setValue(user.name);
        this.form.controls['country'].setValue(user.country);
        this.form.controls['region'].setValue(user.region);
        this.form.controls['postalCode'].setValue(user.postalCode);
        this.form.controls['phoneNumber'].setValue(user.phoneNumber);
        this.form.controls['dateOfBirth'].setValue(user.dateOfBirth);
        this.form.controls['active'].setValue(user.active);
        this.form.controls['role'].setValue(user.role);
  }

}
