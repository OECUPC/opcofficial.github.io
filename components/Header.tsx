export function Header() {
  const Nav = [
    {
      "text": "Home",
      "href": "/",
    },
    {
      "text": "Activity",
      "href": "/activity",
    },
    {
      "text": "Blog",
      "href": "/blog",
    },
    {
      "text": "Contact",
      "href": "/contact",
    },
  ];

  return (
    <header className="header">
      <div className="header-wrapper">
        {/* logo */}
        <a className="logo" href="/">
          <img
            className="official-icon__small"
            src="/images/icons/official_white.png"
          />
          <p>OECUPC</p>
        </a>
        
        {/* レスポンシブ時のボタン */}
        <input type="checkbox" id="toggle-global-nav" />
        <label for="toggle-global-nav" class="global-nav__toggle-label">
          <span class="global-nav__toggle-label__animation-bar"></span>
          <span class="global-nav__toggle-label__animation-bar"></span>
        </label>

        {/* Global nav */}
        <nav className="global-nav">
          <ul className="global-nav__list">
            {Nav.map((elem) => (
              <li className="global-nav__item">
                <a href={elem.href}>{elem.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
