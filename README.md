# Datadog RUM Ionic Angular Capacitor App

A **proper Ionic Angular Capacitor application** demonstrating Datadog Real User Monitoring (RUM) integration.

## 🎯 Overview

This is a **real Ionic Angular framework application** that showcases how to integrate Datadog Browser SDK with an Ionic Capacitor app. It follows the [official Datadog documentation](https://docs.datadoghq.com/real_user_monitoring/guide/monitor-capacitor-applications-using-browser-sdk/) for monitoring Capacitor applications.

## ✨ Features

- ✅ **Full Ionic Angular 16 framework** with proper component architecture
- ✅ Datadog RUM SDK integration with local storage persistence
- ✅ Session replay recording enabled
- ✅ User interaction tracking with Angular event handlers
- ✅ User identification and association
- ✅ Error tracking and monitoring
- ✅ Performance timing measurements
- ✅ API call monitoring
- ✅ Real-time activity statistics dashboard
- ✅ Beautiful Ionic UI components with proper styling

## 📋 Prerequisites

- Node.js v23.11.0
- npm 10.9.2
- Ionic CLI 5.4.16
- Angular CLI 16.2.14
- Capacitor CLI 6.1.0
- Xcode 16 (for iOS development)
- Android Studio (for Android development)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run in Browser (Development)

```bash
npm start
```

This will start a local development server at `http://localhost:4200`

### 3. Build for Production

```bash
npm run build
```

### 4. Run on iOS

```bash
# Add iOS platform (first time only)
npx cap add ios

# Sync and open in Xcode
npm run sync
npx cap open ios
```

Then build and run from Xcode.

### 5. Run on Android

```bash
# Add Android platform (first time only)
npx cap add android

# Sync and open in Android Studio
npm run sync
npx cap open android
```

Then build and run from Android Studio.

## 🐕 Datadog Configuration

The Datadog RUM SDK is initialized in `src/main.ts` **before** the Angular app bootstraps:

```typescript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '2103794e-9722-4fdb-bccc-1ca83e1733d0',
  clientToken: 'pubbe3eb87a030a7690d30aa180031aee62',
  site: 'datadoghq.com',
  service: 'ionic-capacitor-sample',
  env: 'development',
  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
  sessionPersistence: 'local-storage' // Critical for Capacitor!
});

datadogRum.startSessionReplayRecording();
```

### 🔑 Key Configuration Notes

- **`sessionPersistence: 'local-storage'`**: **REQUIRED** for Capacitor apps because iOS uses the `capacitor://` scheme which doesn't support cookies
- **Initialized in `main.ts`**: Ensures RUM is active before any Angular components load
- **Session Replay**: Automatically records user sessions for debugging
- **User Interactions**: Tracks all button clicks and user actions automatically

## 🧪 Testing RUM Features

The app includes five interactive test features:

1. **User Interactions** - Track button clicks and user actions
2. **User Identification** - Associate sessions with user information
3. **Error Tracking** - Log sample errors to Datadog
4. **Performance Timing** - Measure and track custom performance metrics
5. **API Calls** - Make real API calls (automatically tracked by RUM)

All actions update the activity statistics dashboard in real-time.

## 📊 Viewing Data in Datadog

1. Log in to your [Datadog account](https://app.datadoghq.com/)
2. Navigate to **UX Monitoring > Sessions**
3. Filter by service: `ionic-capacitor-sample`
4. View:
   - Session replays
   - User actions and interactions
   - Errors and stack traces
   - Performance metrics
   - API calls and resources

## 📁 Project Structure

```
dd-ionic-capacitor-test/
├── src/
│   ├── app/
│   │   ├── home/
│   │   │   ├── home.page.html         # Main UI template
│   │   │   ├── home.page.ts           # Component logic with RUM tracking
│   │   │   ├── home.page.scss         # Component styles
│   │   │   ├── home.module.ts         # Home page module
│   │   │   └── home-routing.module.ts # Home page routing
│   │   ├── app.component.ts           # Root component
│   │   ├── app.component.html         # Root template
│   │   ├── app.component.scss         # Root styles
│   │   ├── app.module.ts              # App module
│   │   └── app-routing.module.ts      # App routing
│   ├── assets/                        # Static assets
│   ├── theme/
│   │   └── variables.scss             # Ionic theme variables
│   ├── main.ts                        # Datadog RUM initialization ⭐
│   ├── polyfills.ts                   # Polyfills
│   ├── index.html                     # HTML entry point
│   └── global.scss                    # Global styles
├── capacitor.config.json              # Capacitor configuration
├── angular.json                       # Angular CLI configuration
├── ionic.config.json                  # Ionic configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Dependencies
└── README.md                          # This file
```

## 🔧 Key Technologies

- **Ionic Framework**: 6.7.5
- **Angular**: 16.2.14
- **Capacitor**: 6.1.0
- **TypeScript**: 5.1.6
- **Datadog Browser RUM**: 5.11.0

## 🐛 Troubleshooting

### RUM not tracking on iOS

Make sure `sessionPersistence: 'local-storage'` is set in `src/main.ts`. iOS Capacitor apps use the `capacitor://` scheme which doesn't support cookies.

### No data appearing in Datadog

1. Check browser console for errors
2. Verify your `applicationId` and `clientToken` are correct
3. Ensure you're looking at the correct Datadog site (US1, EU, etc.)
4. Check that your network allows connections to `datadoghq-browser-agent.com`

### Build errors

If you encounter build errors, try:
```bash
rm -rf node_modules package-lock.json www
npm install
```

### Port already in use

If port 4200 is already in use:
```bash
ng serve --port 4201
```

## 📚 Learn More

- [Datadog RUM Documentation](https://docs.datadoghq.com/real_user_monitoring/)
- [Monitor Capacitor Applications Guide](https://docs.datadoghq.com/real_user_monitoring/guide/monitor-capacitor-applications-using-browser-sdk/)
- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [Ionic Angular Documentation](https://ionicframework.com/docs/angular/overview)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Angular Documentation](https://angular.io/docs)

## 📄 License

MIT

---

**Built with ❤️ using Ionic Angular, Capacitor, and Datadog RUM**

