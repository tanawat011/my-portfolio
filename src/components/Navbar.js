export const Navbar = ({
  goToHome,
  goToAbout,
  goToPortfolio,
  goToBlog,
  goToContact,
}) => (
  <nav className='navbar'>
    <ul>
      <li><div href='#' onClick={goToHome}>HOME</div></li>
      <li><div href='#' onClick={goToAbout}>ABOUT</div></li>
      <li><div href='#' onClick={goToPortfolio}>PORTFOLIO</div></li>
      <li><div href='#' onClick={goToBlog}>BLOG</div></li>
      <li><div href='#' onClick={goToContact}>CONTACT</div></li>
    </ul>
  </nav>
)
