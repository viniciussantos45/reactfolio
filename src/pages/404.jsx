import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

import Logo from "../components/common/logo";
import NavBar from "../components/common/navBar";

import INFO from "../data/user";

import "./styles/404.css";

const Notfound = () => {
	const { t } = useTranslation();

	useEffect(() => {
		document.title = `404 | ${INFO.main.title}`;
	}, []);

	return (
		<React.Fragment>
			<div className="not-found page-content">
				<NavBar />
				<div className="content-wrapper">
					<div className="notfound-logo-container">
						<div className="projects-logo">
							<Logo width={46} />
						</div>
					</div>
					<div className="notfound-container">
						<div className="notfound-message">
							<div className="notfound-title">
								Oops! <FontAwesomeIcon icon={faFaceSadTear} />
							</div>
							<div className="not-found-message">
								{t(
									"We can't seem to find the page you're looking for."
								)}
								<br />
								{t("The requested URL")} "{window.location.href}
								" {t("was not found on this server.")}
							</div>
							<a href="/" className="not-found-link">
								{t("Go back to the home page")}
							</a>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Notfound;
