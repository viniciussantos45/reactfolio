import {
	faGithub,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

import INFO from "../../data/user";

import "./styles/socials.css";

const Socials = () => {
	const { t } = useTranslation();

	return (
		<div className="socials">
			<div className="social">
				<a href={INFO.socials.twitter} target="_blank" rel="noreferrer">
					<div className="social-icon">
						<FontAwesomeIcon
							icon={faTwitter}
							className="social-icon"
						/>
					</div>
					<div className="social-text">{t("Follow on")} Twitter</div>
				</a>
			</div>

			<div className="social">
				<a href={INFO.socials.github} target="_blank" rel="noreferrer">
					<div className="social-icon">
						<FontAwesomeIcon
							icon={faGithub}
							className="social-icon"
						/>
					</div>
					<div className="social-text">{t("Follow on")} GitHub</div>
				</a>
			</div>

			<div className="social">
				<a
					href={INFO.socials.linkedin}
					target="_blank"
					rel="noreferrer"
				>
					<div className="social-icon">
						<FontAwesomeIcon
							icon={faLinkedin}
							className="social-icon"
						/>
					</div>
					<div className="social-text">{t("Follow on")} LinkedIn</div>
				</a>
			</div>

			<div className="social">
				<a
					href={INFO.socials.instagram}
					target="_blank"
					rel="noreferrer"
				>
					<div className="social-icon">
						<FontAwesomeIcon
							icon={faInstagram}
							className="social-icon"
						/>
					</div>
					<div className="social-text">
						{t("Follow on")} Instagram
					</div>
				</a>
			</div>

			<div className="email">
				<div className="email-wrapper">
					<a
						href={`mailto:${INFO.main.email}`}
						target="_blank"
						rel="noreferrer"
					>
						<div className="social-icon">
							<FontAwesomeIcon icon={faEnvelope} />
						</div>

						<div className="social-text">{INFO.main.email}</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Socials;
