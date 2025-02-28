import logo from "../assets/proAsh.png";

const getCurrentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer id="newsletter">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="section-heading">
              <h4>
                Join our mailing list to receive the news &amp; latest trends
              </h4>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-3">
            <form id="search" action="#" method="GET">
              <div className="row">
                <div className="col-lg-6 col-sm-6">
                  <fieldset>
                    <input
                      type="email"
                      name="address"
                      className="email"
                      placeholder="Email Address..."
                      autoComplete="on"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <fieldset>
                    <button type="submit" className="main-button">
                      Subscribe Now <i className="fa fa-angle-right"></i>
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="footer-widget">
              <h4>Contact Us</h4>
              <p>Lagos, Nigeria</p>
              <p>
                <a href="#">+234-90-7627-5708</a>
              </p>
              <p>
                <a href="#">proashchronicles@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-widget">
              <h4>About Us</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
              </ul>
              {/* <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
              </ul> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-widget">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#">Free Apps</a>
                </li>
                <li>
                  <a href="#">App Engine</a>
                </li>
                <li>
                  <a href="#">Programming</a>
                </li>
                <li>
                  <a href="#">Development</a>
                </li>
                <li>
                  <a href="#">App News</a>
                </li>
              </ul>
              {/* <ul>
                <li>
                  <a href="#">App Dev Team</a>
                </li>
                <li>
                  <a href="#">Digital Web</a>
                </li>
                <li>
                  <a href="#">Normal Apps</a>
                </li>
              </ul> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-widget">
              <h4>About Our Company</h4>
              <div className="logo">
                <img src={logo} alt="Company Logo" />
              </div>
              <p>
                Welcome to ProAsh Chronicles, the ultimate blogging platform for
                tech enthusiasts.
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="copyright-text">
              <p>
                Copyright &copy; {getCurrentYear} ProAsh Chronicles. All Rights
                Reserved.
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
