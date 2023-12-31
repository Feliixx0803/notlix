import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authService/auth.service";
import {PopUpService} from "../../services/PopUpService/pop-up.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm :FormGroup = new FormGroup({});

  constructor(private navbarService : NavbarService,
              private formBuilder :FormBuilder,
              private router :Router,
              private userService :AuthService,
              private popUpService : PopUpService
  ) {
  }

  ngOnInit(): void {
    this.navbarService.hide();

    //FORM:
    this.loginForm= this.formBuilder.group({
      email : ['',Validators.compose([Validators.required,Validators.email])],
      pwd : ['',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{8,}')])]
    })
  }

  ngOnDestroy(): void {
    this.navbarService.show();
  }

//Getters:

  get email(){
    return this.loginForm.get('email');
  }

  get pwd(){
    return this.loginForm.get('pwd');
  }

  login(){
    let email = this.email?.value;
    let pwd = this.pwd?.value;

    let body = {
      email: email,
      pwd: pwd
    }

    this.userService.login(body).subscribe(
      (response) => {
        console.log(response.name);
        localStorage.setItem('user', response.email);
        this.userService.userLogged.next(true);
        this.router.navigate(["/home"]);
      },
      (error) => this.popUpService.showPopup("El email o la contraseña no son correctos"),
      ()=> console.info("Fin login usuario")
    )

  }




}
