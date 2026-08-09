import Link from "next/link";

export default function NotFound() {
  return (
    <div className="state-page">
      <div className="state-card">
        <p className="section-label">SYSTEM / 404 / OPEN CIRCUIT</p>
        <h1>That route is not connected.</h1>
        <p>The requested signal path does not resolve to a resource.</p>
        <Link href="/" className="button button--signal">
          Return to system
        </Link>
      </div>
    </div>
  );
}
