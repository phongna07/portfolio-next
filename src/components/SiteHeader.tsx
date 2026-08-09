export default function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#top" aria-label="Back to the top">
            <span className="brand__mark" aria-hidden="true">
              N
            </span>
            <span className="brand__copy">
              NAP // EE
              <small>signal-to-system</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#about">
              <span>01</span> / About
            </a>
            <a href="#projects">
              <span>02</span> / Projects
            </a>
            <a href="#skills">
              <span>03</span> / Skills
            </a>
          </nav>

          <a className="button button--small button--signal" href="#contact">
            <span className="button__status" aria-hidden="true" />
            Contact
          </a>
        </div>
      </header>
    </>
  );
}
