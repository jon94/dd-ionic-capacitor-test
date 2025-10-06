import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { datadogRum } from '@datadog/browser-rum';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Initialize Datadog RUM before bootstrapping the app
datadogRum.init({
  applicationId: environment.datadog.applicationId,
  clientToken: environment.datadog.clientToken,
  site: environment.datadog.site,
  service: environment.datadog.service,
  env: environment.datadog.env,
  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
  // Critical for Capacitor apps - use local storage instead of cookies
  sessionPersistence: 'local-storage'
});

// Start session replay recording
datadogRum.startSessionReplayRecording();

console.log('✅ Datadog RUM initialized successfully');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

