import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../Models/chat-message.model'
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService{

  user: any;
  chatMessagesCollection: AngularFirestoreCollection<ChatMessage>;

  usersCollection: AngularFirestoreCollection<User>;
  
  userName: Observable<string>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {  }

  sendMessage(msg: string){

        this.getMessages().add({
          timeSent: new Date().toUTCString(),
          message: msg,
          uid: firebase.auth().currentUser.uid
        });
      }
  

  getMessages(){
    this.chatMessagesCollection = this.afs.collection('chatMessage', ref => ref.orderBy('timeSent'));
    return this.chatMessagesCollection;
  }

  getUsers()
  {
    this.usersCollection =  this.afs.collection('users', ref => ref.orderBy('status', 'desc'));
    return this.usersCollection;
  }

}
