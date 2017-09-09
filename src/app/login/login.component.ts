import { Component, HostListener, NgZone, ViewChild, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
declare var Wallet: any;
declare var filestore: any;
declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('keyFile') keyFile: any;
  @ViewChild('passwd') passwd: any;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  fileChange(event: any) {
    this.readThis(event.target, this.fileSave);
  }

  readThis(inputValue: any, callback: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = callback;
    myReader.readAsText(file);
  }

  fileSave = function (e) {
    const data = e.target.result;
    localStorage.setItem('filestore', data);
  };

  login() {
    const keystore = localStorage.getItem('filestore');
    const password = this.passwd.nativeElement.value;
    const response = this.auth.checkCredential(keystore, password).then(result => {
      if (result == 'dist') { this.router.navigate(['/distributor']); };
      if (result == 'mfg') { this.router.navigate(['/manufacturer']); };
      if (result == 'retail') { this.router.navigate(['/retailer']); };
      if (result == 'supplier') { this.router.navigate(['/supplier']); };
    });

  }

}
