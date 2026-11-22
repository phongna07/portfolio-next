import HanoiClock from "./HanoiClock";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <span>© {new Date().getFullYear()} Nguyen Anh Phong</span>
        <span className="site-footer__mid">
          Designed &amp; built in Hanoi · <HanoiClock seconds={false} /> GMT+7
        </span>
        <a href="#top" className="site-footer__top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
