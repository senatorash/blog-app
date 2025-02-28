import { useEffect } from "react";
import AOS from "aos";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import heroSlider from "../../assets/slider-dec.png";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: false,
      easing: "ease-in-out",
      mirror: true,
    });
    AOS.refresh();
  }, []);
  return (
    <div className="main-banner" id="top" data-aos="fade-down">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {/* Left Content */}
              <div className="col-lg-6 align-self-center">
                <div
                  className="left-content show-up header-text"
                  data-aos="fade-left"
                  data-aos-delay="600"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <h2>Get The Latest App From App Stores</h2>
                      <p>
                        Chain App Dev is an app landing page HTML5 template
                        based on Bootstrap v5.1.3 CSS layout provided by
                        TemplateMo, a great website to download free CSS
                        templates.
                      </p>
                    </div>
                    <div className="col-lg-12 d-flex gap-3">
                      <div className="white-button first-button scroll-to-section">
                        <a href="#contact">
                          Free Quote <FaApple size={25} color="white" />
                        </a>
                      </div>
                      <div className="white-button scroll-to-section">
                        <a href="#contact">
                          Free Quote <FaGooglePlay size={25} color="white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Image */}
              <div className="col-lg-6">
                <div
                  className="right-image"
                  data-aos="fade-right"
                  data-aos-delay="350"
                >
                  <img
                    src={heroSlider}
                    alt="App Banner"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
