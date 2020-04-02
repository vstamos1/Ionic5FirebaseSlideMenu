import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user: any;
  public id: string;
  
  constructor(public afAuth: AngularFireAuth, private storage: Storage) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
          console.log(user)
          this.user = user;
          console.log(this.user.uid)
          this.id = this.user.uid
          //this.userProfile = this.af.database.ref(`user/${user.uid}`);
      }
            })
          
    
      console.log("user logged out");

  }

  getUser(){
    console.log(this.user);
    return this.afAuth.authState.subscribe(user => {
      if (user){
          console.log(user)
          this.user = user;
         
          //this.userProfile = this.af.database.ref(`user/${user.uid}`);
      }
            })
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  login (email: string, password: string){
    console.log('logging in.....')
    
    return this.afAuth.auth.signInWithEmailAndPassword(email,password).then((user) => {
      this.storage.set("userId", user.user.uid);
    })
    
  }

  async signup (email: string, password: string){
    console.log('signing up.....')
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    
  }

  signout(){
    this.afAuth.auth.signOut().then(function() {
      // Sign-out successful.
      console.log('signing out....');
    }).catch(function(error) {
      // An error happened.
      console.log('could not sign out. try again....')
    });
  }

  getUserUid(){
    return this.afAuth.user;
  }

  updateProfie(displayName: string, image: string){
    var user = this.afAuth.auth.currentUser;
    return user.updateProfile({displayName: displayName, photoURL: image}).then((data) => {
      // Update successful.
      console.log('success')
      
      
    }).catch(function(error) {
      // An error happened.
      
      console.log('error')
      
    });
  }

  setUser(user: object): Promise<any> {
    return this.storage.set('username', user);
  }

  resetPassword(email: string){
    

      var promise = new Promise((resolve, reject) => {


          this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
              resolve({ success: true });
              console.log("email sent")
          }).catch((err) => {
              reject(err);
              console.log("reset failed " +err.message)
          });
           
      });
     return promise;
  }
  
}
