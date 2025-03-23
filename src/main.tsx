
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Use the provided Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_cG93ZXJmdWwtc2VydmFsLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ";

// Create a root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// If we don't have a publishable key, render a helpful message instead of crashing
if (!PUBLISHABLE_KEY) {
  root.render(
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg border border-border">
        <h1 className="text-2xl font-bold text-foreground mb-4">Configuration Required</h1>
        <p className="text-muted-foreground mb-4">
          This application requires a Clerk Publishable Key to function properly. The key is missing from your environment variables.
        </p>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
          <p className="text-amber-700">
            You need to set the <code className="bg-amber-100 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> environment variable.
          </p>
        </div>
        <h2 className="text-lg font-semibold mb-2">How to fix this:</h2>
        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
          <li>Go to <a href="https://dashboard.clerk.com" className="text-accent hover:underline" target="_blank" rel="noreferrer">Clerk Dashboard</a> and create or select your application</li>
          <li>Navigate to API Keys and copy your "Publishable Key"</li>
          <li>Set it as an environment variable named <code className="bg-muted px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code></li>
        </ol>
      </div>
    </div>
  );
} else {
  // Render the app with Clerk provider when we have a key
  root.render(
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  );
}
