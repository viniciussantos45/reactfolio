import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./styles/footer.css";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<React.Fragment>
			<div className="footer">
				<div className="footer-links">
					<ul className="footer-nav-link-list">
						<li className="footer-nav-link-item">
							<Link to="/">{t("Home")}</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/about">{t("About")}</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/projects">{t("Projects")}</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/articles">{t("Articles")}</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/contact">{t("Contact")}</Link>
						</li>
					</ul>
				</div>

				<div className="footer-credits">
					<div className="footer-credits-text">
						© {new Date().getFullYear()} Vinicius Gomes.{" "}
						{t("All Rights Reserved.")}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Footer;
