import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoleService} from "./services/roleService/role.service";
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'notlix-frontend';

  constructor(private roleService :RoleService) {
  }

  ngOnInit(): void {
    this.verifyRoles();
  }


  /**
   * Checks if user and admin roles exists. If not, it creates them.
   */
  async verifyRoles(){
    await lastValueFrom(this.roleService.getAllRoles().pipe()).then((roles) => {
      if(!roles.length){
        this.roleService.createRoles().subscribe();
      }
    });
  }

}
