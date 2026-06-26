import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';

import { routes } from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: LOCALE_ID, useValue: 'es-CL'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'CLP'},
  ]
};
