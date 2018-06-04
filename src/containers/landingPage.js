import React, { Component } from "react";
import SectionTwo from "../components/homepage/sectionTwo";
import MobileHome from "../components/homepage/mobileHome";
import SectionThree from "../components/homepage/sectionThree";
import SectionFour from "../components/homepage/sectionFour";
import SectionFive from "../components/homepage/sectionFive";
import Footer from "../components/footer";
import Slider from "../components/homepage/slider";


class LandingPage extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Slider />
        {/* <div className="banner">
          <div className="row">
            <div className="sa-text">
              <span className="sa-text__title">
                <h1>
                  SoundIT{" "}
                  <img
                    className="sa-brand__name-logo"
                    src="/images/continent-icon-africa.png"
                    alt=""
                  />frica.
                </h1>
                <h4>Be the next Rising Gospel Star</h4>
                <LoginPage />
              </span>
            </div>
          </div>
    </div>*/}
        <MobileHome />
        {/* <SectionThree /> */}
        <SectionFour />
        <SectionFive />
        <SectionTwo />

        <Footer />
      </div>
    );
  }
}

export default LandingPage;
