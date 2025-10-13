import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import "./footer.css";
function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-icons">
          <FaTwitter style={{ color: "#E63946" }} />
          <FaInstagram style={{ color: "#E63946" }} />
          <FaFacebook style={{ color: "#E63946" }} />
        </div>

        <div className="footer-text">
          <h4>&copy;Wanderlust Private Limited</h4>
          <h4>Privacy Terms</h4>
        </div>
      </div>
    </>
  );
}

export default Footer;
