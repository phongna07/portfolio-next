"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Portfolio error:", error);
  }, [error]);

  const isNetworkError =
    error.message.includes("fetch") || error.message.includes("network");

  return (
    <div className="state-page">
      <div className="state-card">
        <p className="section-label">SYSTEM / ERROR / SIGNAL LOST</p>
        <h1>Something interrupted the signal.</h1>

        {isNetworkError ? (
          <p>
            The external connection is unavailable. Check your network and try
            the signal again.
          </p>
        ) : (
          <p>
            An unexpected interruption occurred while loading the portfolio.
          </p>
        )}

        <div className="state-card__actions">
          <button
            onClick={() => reset()}
            className="button button--signal"
          >
            Retry signal
          </button>

          <button
            onClick={() => window.location.reload()}
            className="button button--ghost"
          >
            Restart system
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="error-details">
            <summary>
              Error Details (Development)
            </summary>
            <pre>{error.message}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
