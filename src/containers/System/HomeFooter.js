import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./HomePage/HomePage.scss";
import "./HomeFooter.scss";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date().getFullYear(),
    };
  }

  componentDidMount() {}

  render() {
    const { currentYear } = this.state;

    return (
      <footer className="home-footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-grid">
              <div className="footer-section">
                <div className="footer-logo">
                  <h3>MedicalBook</h3>
                  <p className="footer-tagline">
                    Nền tảng y tế chăm sóc sức khỏe toàn diện
                  </p>
                </div>
                <div className="footer-description">
                  <p>
                    MedicalBook là nền tảng y tế hàng đầu Việt Nam, cung cấp
                    dịch vụ đặt lịch khám bệnh trực tuyến với đội ngũ bác sĩ
                    chuyên nghiệp.
                  </p>
                </div>
                <div className="footer-social">
                  <h4>Kết nối với chúng tôi</h4>
                  <div className="social-links">
                    <a href="#" aria-label="Facebook">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" aria-label="Twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" aria-label="Instagram">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" aria-label="LinkedIn">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#" aria-label="YouTube">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer-section">
                <h4>Liên kết nhanh</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#specialty">Chuyên khoa</a>
                  </li>
                  <li>
                    <a href="#doctors">Bác sĩ nổi bật</a>
                  </li>
                  <li>
                    <a href="#facilities">Cơ sở y tế</a>
                  </li>
                  <li>
                    <a href="#handbook">Cẩm nang</a>
                  </li>
                  <li>
                    <a href="#about">Về chúng tôi</a>
                  </li>
                  <li>
                    <a href="#contact">Liên hệ</a>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Dịch vụ</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#booking">Đặt lịch khám</a>
                  </li>
                  <li>
                    <a href="#consultation">Tư vấn trực tuyến</a>
                  </li>
                  <li>
                    <a href="#health-check">Khám sức khỏe tổng quát</a>
                  </li>
                  <li>
                    <a href="#vaccination">Tiêm chủng</a>
                  </li>
                  <li>
                    <a href="#home-care">Chăm sóc tại nhà</a>
                  </li>
                  <li>
                    <a href="#emergency">Cấp cứu 24/7</a>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Thông tin liên hệ</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>Bản Dửn, Chiềng Ngần, Sơn La.</span>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>1900-1234 (24/7)</span>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>support@MedicalBook.vn</span>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faClock} />
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>

                <div className="newsletter">
                  <h4>Đăng ký nhận tin</h4>
                  <p>Nhận thông tin y tế hữu ích mỗi tuần</p>
                  <div className="newsletter-form">
                    <input
                      type="email"
                      placeholder="Email của bạn..."
                      className="newsletter-input"
                    />
                    <button className="newsletter-btn">Đăng ký</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>
                  &copy; {currentYear} MedicalBook by{" "}
                  <span className="developer-name">Đức Vình</span>. All rights
                  reserved.
                </p>
              </div>
              <div className="footer-bottom-links">
                <a href="#privacy">Chính sách bảo mật</a>
                <span className="separator">|</span>
                <a href="#terms">Điều khoản sử dụng</a>
                <span className="separator">|</span>
                <a href="#sitemap">Sơ đồ trang web</a>
              </div>
              <div className="made-with-love">
                <span>Được phát triển với</span>
                <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                <span>tại Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Về đầu trang"
        >
          ↑
        </button>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
