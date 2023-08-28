import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authService/auth.service";
import {PopUpService} from "../../services/PopUpService/pop-up.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,OnDestroy{
  registerForm :FormGroup = new FormGroup({});

  constructor(private navbarService : NavbarService,
              private formBuilder: FormBuilder,
              public http :HttpClient,
              private router: Router,
              private userService :AuthService,
              private popUpService : PopUpService
  ) {
  }

  ngOnInit(): void {
    this.navbarService.hide();

    //FORM:
    this.registerForm= this.formBuilder.group({
      name : ['',Validators.compose([Validators.required,Validators.pattern('[A-Za-záéíóúÁÉÍÓÚ\s]+$')])],
      email : ['',Validators.compose([Validators.required,Validators.email])],
      telephone : ['',Validators.compose([Validators.required,Validators.pattern('[0-9]{9}')])],
      pwd : ['',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{8,}')])]
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
    if(!this.registerForm.invalid){
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

      this.userService.register(body).subscribe(
        (response) => this.router.navigate(["/login"]),
        (error) => this.popUpService.showPopup("Ya existe un usuario registrado con ese email"),
        ()=> console.info("Fin registro usuario")
      );
    } else {
      this.popUpService.showPopup("Debe rellenar todos los campos. Introduzca valores válidos");
    }
  }
}
