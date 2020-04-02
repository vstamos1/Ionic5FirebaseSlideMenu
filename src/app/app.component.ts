import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { Plugins } from '@capacitor/core';
const { SplashScreen} = Plugins;
import { ThemeService } from './services/theme.services.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  loggedIn = false;
  dark = false;
  isAuthenticated;
  user;

  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    
    private storage: Storage,
    private auth: AuthService,
    private router: Router,
    private theme: ThemeService
  ) {
    this.initializeApp();
    if ( localStorage.getItem('theme') === 'dark') {
      console.log('should be dark')
      this.theme.enableDark();
    }else {console.log('should be light');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
     
      SplashScreen.hide();
      
    });
  }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(user => {
      
      if (user) {
        console.log("user logged in " + user);
        this.isAuthenticated = true;
        this.user = user
        console.dir(this.user);
        
        
          
      } else {
        this.isAuthenticated = false;
        console.log("user logged out");
        //this.nav.setRoot('SigninPage');
        this.router.navigateByUrl("login")
      }
    });
    

    // used for an example of ngFor and navigation
    //this.router.navigateByUrl('home');
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }


    
  }
}


  

  

  

