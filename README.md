# Gymflow Frontend Test

Small cross-platform user management app built as a monorepo with a React web app, an Expo React Native mobile app, a shared package, and a simple Node.js backend API.

## Requirements

- Node.js 22+
- pnpm 11+

## Getting Started

```bash
git clone https://github.com/ambitstream/gymflow-fe-test.git
cd gymflow-fe-test
pnpm install
```

Start the backend API first:

```bash
pnpm backend
```

In a second terminal, run the web app:

```bash
pnpm web
```

Or run the mobile app with Expo:

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

Build the backend:

```bash
pnpm --filter backend build
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
  backend/   Node.js + Express API
  web/       React + Vite web application
  mobile/    Expo React Native application

packages/
  shared/    Shared user domain model, validation, API routes, and API types
```

The shared package keeps common contracts consistent between platforms:

- `user.types.ts` defines the `User` and `UserRole` types.
- `user.constants.ts` defines role values, labels, and select options.
- `user.schema.ts` defines the Zod form schema and exports `UserFormValues`.
- `user.mocks.ts` provides seed users for the demo backend.
- `api.routes.ts` defines shared API route paths.
- `api.types.ts` defines shared API response types such as pagination.
- `user.schema.test.ts` covers the shared validation rules with Vitest.

## Backend

The backend is a small Express API written in TypeScript. It is intentionally simple and exists to support the web and mobile clients during this demo branch.

It provides:

- `GET /users?page=1&limit=10`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`
- `GET /health`

User data is stored in a local JSON file:

```text
apps/backend/data/users.json
```

This file is runtime data and is ignored by Git. On first read, the backend seeds the file from `mockUsers` in `@gymflow/shared`. You can also reset the local file manually:

```bash
pnpm backend:seed
```

The storage layer writes through a temporary file and then renames it into place, so updates do not rewrite the main JSON file directly.

This is not intended to be a production backend. A production version would use a real database, authentication, stronger API-level validation and error handling, and a deployment-specific configuration system.

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
- User data is loaded from the backend API.
- The users list supports paginated loading from the API.

By default, the web API client uses:

```text
http://localhost:4000
```

You can override it with:

```env
VITE_API_URL=http://localhost:4000
```

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
- User data is loaded from the backend API.
- The users list uses `FlatList` pagination with infinite scroll.
- Pull-to-refresh reloads the currently loaded range of users.
- The same form validation rules are reused from `@gymflow/shared`.

### Mobile API URL Note

The mobile API client currently uses the local demo API URL. This is enough for local testing, but mobile networking depends on where the app runs:

- iOS Simulator usually works with `http://localhost:4000`.
- Android Emulator often needs `http://10.0.2.2:4000`.
- A physical device usually needs your computer's LAN IP address.

This project keeps the setup simple because the backend is a local demo server, not a deployed production API.

## Product Overview

The app allows managing gym users across web and mobile:

- View a paginated list of users.
- Create a new user.
- Edit an existing user.
- Remove an existing user.
- Validate user form data with shared Zod rules.
- Show a 404 page for unknown web routes.

The user form validates:

- Full name: required, minimum 3 characters, maximum 50 characters.
- Role: required, either `STAFF` or `MEMBER`.
- Date of birth: optional ISO-like `YYYY-MM-DD` string and not in the future.

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

## Notes

The implementation focuses on keeping the app small, understandable, and close to the task requirements while showing how the codebase can grow:

- Shared domain model and validation live in one package.
- Shared API route/type contracts live in one package.
- Web and mobile keep platform-specific API clients.
- Backend storage is intentionally simple file-based storage for local demo usage.
- Tests cover shared logic rather than fragile UI details.
