import { provideRouter, RouterConfig } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Type } from '@angular/core';

import {ChatroomComponent} from "./components/chatroom/chatroom.component";

const routes: RouterConfig = [
    { path: '', component: <Type>ChatroomComponent},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
];
