import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,OnDestroy{
  registerForm :FormGroup = new FormGroup({});

  hidePwd = true;
  constructor(private navbarService : NavbarService,
              private formBuilder: FormBuilder,
              public http :HttpClient,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.navbarService.hide();

    //FORM:
    this.registerForm= this.formBuilder.group({
      name : [''],
      email : [''],
      telephone : [''],
      pwd : ['']
    })
  }

  ngOnDestroy(): void {
    this.navbarService.show();
  }

  //Getters:
  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get telephone(){
    return this.registerForm.get('telephone');
  }

  get pwd(){
    return this.registerForm.get('pwd');
  }


  register() {
    let name = this.name?.value;
    let email = this.email?.value;
    let telephone = this.telephone?.value;
    let pwd = this.pwd?.value;

    let body = {
      name: name,
      email: email,
      telephone: telephone,
      pwd: pwd
    }


    this.http.post('http://localhost:8080/register', body, { 'responseType': 'text' }).subscribe(
      (response) => this.router.navigate(["/login"]),
      (error) => console.log("Error al registrar usuario"),
      ()=> console.info("Fin registro usuario")
    );
  }
}
