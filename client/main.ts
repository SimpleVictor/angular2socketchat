/// <reference path="../typings/index.d.ts" />
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Type, enableProdMode } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";

enableProdMode();

import { AppComponent } from "./components/app.component";
import { APP_ROUTER_PROVIDERS } from "./routes";
import {MODAL_BROWSER_PROVIDERS} from "angular2-modal/platform-browser/index";
import {disableDeprecatedForms, provideForms} from "@angular/forms";

bootstrap(<Type>AppComponent, [
	// APP_ROUTER_PROVIDERS,
	disableDeprecatedForms(),
	provideForms(),
	HTTP_PROVIDERS
]);
