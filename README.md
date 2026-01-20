# Desa Digital v3

This project is the third iteration of the **Desa Digital** application, migrated from Vite/React to **Next.js**.
It serves as a continuation and major upgrade of the previous version. You can find the legacy version here: [Desa Digital v2](https://github.com/Adsattt/desa-digital.v2).

## Installation

To get started with the Desa Digital App v3, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ahqsa24/desa-digital.v3.git
    cd desa-digital.v3
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory of your project and add the following configuration:

    ```bash
    NEXT_PUBLIC_FIREBASE_APIKEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    NEXT_PUBLIC_API_URL=http://localhost:3001/
    ```

    > **Note:** Fill in the values with your Firebase project configuration. `NEXT_PUBLIC_API_URL` is set to `http://localhost:3001/` by default for the local JSON server.

## Running the Application

To run the application locally, use the following command:

```bash
npm run dev
```

This command concurrently starts:
- **Next.js Development Server** (Turbopack) at [http://localhost:3000](http://localhost:3000)
- **JSON Server** (Mock API) at [http://localhost:3001](http://localhost:3001)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Chakra UI & Emotion
- **Backend (BaaS)**: Firebase (Auth, Firestore, Storage)
- **Local API Mock**: JSON Server
- **State Management**: React Query & Context API

## Migration Notes

This project was migrated from a Vite-based single-page application (SPA) to Next.js to leverage server-side rendering (SSR), improved SEO, and better performance. Code structure has been adapted to the Next.js App Router paradigm.
