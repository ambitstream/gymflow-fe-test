# Gymflow Frontend Test

Small cross-platform user management app built as a monorepo with a React web app, a React Native mobile app, and a shared package for domain types, constants, mocks, and validation.

## Requirements

- Node.js 22+
- pnpm 11+

## Getting Started

```bash
git clone https://github.com/ambitstream/gymflow-fe-test.git
cd gymflow-fe-test
pnpm install
```

Run the web app:

```bash
pnpm web
```

Run the mobile app with Expo:

```bash
pnpm mobile
```

Run directly on a simulator or emulator:

```bash
pnpm mobile:ios
pnpm mobile:android
```

Run unit tests:

```bash
pnpm test
```

Build the web app:

```bash
pnpm --filter web build
```

### Optional Environment Setup

If you use `nvm`, the repository includes an `.nvmrc` file:

```bash
nvm use
```

If Node 22 is not installed yet:

```bash
nvm install
```

If `pnpm` is not available locally, enable Corepack and let it use the package manager version declared in `package.json`:

```bash
corepack enable
```

## Monorepo Structure

```text
apps/
  web/       React + Vite web application
  mobile/    Expo React Native application

packages/
  shared/    Shared user domain model, validation, constants, and mocks
```

The shared package keeps the business-level user model consistent between platforms:

- `user.types.ts` defines the `User` and `UserRole` types.
- `user.constants.ts` defines role values, labels, and select options.
- `user.schema.ts` defines the Zod form schema and exports `UserFormValues`.
- `user.mocks.ts` provides initial mock users.
- `user.schema.test.ts` covers the shared validation rules with Vitest.

The platform stores are intentionally platform-specific because persistence differs:

- Web stores users in `localStorage`.
- Mobile stores users in `AsyncStorage`.

Both apps still share the same domain shape and validation rules through `@gymflow/shared`.

## Product Overview

The app allows managing gym users across web and mobile:

- View a list of users.
- Create a new user.
- Edit an existing user.
- Remove an existing user.
- Validate user form data with shared Zod rules.
- Show a 404 page for unknown web routes.

The user form validates:

- Full name: required, minimum 3 characters, maximum 50 characters.
- Role: required, either `STAFF` or `MEMBER`.
- Date of birth: optional ISO-like `YYYY-MM-DD` string and not in the future.

## Web App

The web app is built with:

- React
- React Router
- React Hook Form
- Zod
- Tailwind CSS
- Zustand
- Motion

Web-specific implementation notes:

- The UI is responsive for mobile and desktop layouts.
- The splash screen is animated with Motion.
- User list item hover interactions are animated with Motion.
- Form fields on the create/edit page appear with a small staggered Motion animation.
- User data is persisted locally with `localStorage`.

## Mobile App

The mobile app is built with:

- React Native
- Expo
- React Navigation
- React Hook Form
- Zod
- Zustand
- React Native Reanimated

Mobile-specific implementation notes:

- The splash screen uses React Native's built-in `Animated` API.
- Form fields on the create/edit screen appear sequentially with Reanimated.
- User data is persisted locally with `AsyncStorage`.
- The same form validation rules are reused from `@gymflow/shared`.

## Testing

The project includes unit tests for the shared validation schema. This is the most valuable test target for this project because the schema is used by both web and mobile.

Run tests with:

```bash
pnpm test
```

or directly:

```bash
pnpm --filter @gymflow/shared test
```

## Data and Backend Decision

This project intentionally does not include a backend. The goal of the assignment is to demonstrate frontend architecture, reusable validation, form handling, state management, responsive UI, and platform-specific persistence.

For that reason, users are stored locally:

- `localStorage` on web
- `AsyncStorage` on mobile

In a production version, the user data would be moved behind an API. I would then add server-side pagination or infinite scroll, API-level search/filter/sort, and TanStack Query for caching, loading and error states, and invalidation after create/update/delete actions.

## Pagination Decision

Pagination is deliberately omitted in this test version because the app uses local mock data and the list is small. Adding pagination without a backend would add complexity without improving the current user experience.

For a production data set, I would introduce pagination at the API level instead of slicing local data in the UI.

## Notes

The implementation focuses on keeping the app small, understandable, and close to the task requirements while still showing how the codebase could grow:

- Shared domain model and validation live in one package.
- Persistence stays platform-specific.
- UI components are split by platform.
- Tests cover shared logic rather than fragile UI details.
