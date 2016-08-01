import {Component, OnInit, ViewChild} from "@angular/core";
import {NavbarComponent} from "../directives/navbar.directive";
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import any = jasmine.any;

declare var jQuery:any;

@Component({
    directives: [NavbarComponent, MODAL_DIRECTIVES],
    viewProviders: [],
    selector: "app",
    templateUrl: "client/components/app.component.html",
    styleUrls: ["client/components/app.component.css"]

})
export class AppComponent implements OnInit{
    @ViewChild('modal')
    modal: ModalComponent;

    users= [];
    messages = [];

    private url = 'http://localhost:3000';
    private socket;

    constructor(){
    }

    testArray(){
        console.log(this.users);
    }


    ngOnInit(){
        this.modal.open();
        this.socket = io.connect(this.url);


        this.socket.emit('request-users', function(data){
            console.log(data);
        });

        this.getMessages().subscribe(item => {

            this.messages.push(item);

            console.log(this.messages);
        });

        this.getUsers().subscribe(item => {
            console.log(item);
           this.users = item;
        });


        this.removeUser().subscribe(item=> {
            this.users.splice(this.users.indexOf(item),1);
        });


        this.newUsers().subscribe(item => {
            this.users.push(item);
        })

    }

    removeUser(){
        let observable = new Observable(observer => {
            this.socket.on("remove-player", data => {
                observer.next(data);
            });
        });
        return observable;
    }


    newUsers(){
        let observable = new Observable(observer => {
            this.socket.on('new-user', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    getUsers(){
     let observable = new Observable(observer => {
            this.socket.on('request-users', (data) => {
             observer.next(data);
            });
        });
        return observable;
    }

    sendMessage(message){
        this.socket.emit('add-message', message);
    }

    getMessages() {
        let observable = new Observable(observer => {
            // this.socket = io(this.url);
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        })
        return observable;
    }

    onSubmit(f){
        if(f.valid){
            this.modal.close();
            this.socket.emit('new-user', f.value);
        };
    }

    onModalClose(f){
        if(!f.valid){
            this.modal.open();
        };
    }

}
