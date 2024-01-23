import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Iframe from "../common/iframe";
import "./styles/project.css";

const Project = (props) => {
	const { logo, title, description, linkText, link, videoLink } = props;

	const { t } = useTranslation();

	return (
		<React.Fragment>
			<div className="project">
				<Link to={link} target="_blank">
					<div className="project-container">
						<div className="project-logo">
							<img src={logo} alt="logo" />
						</div>
						<div className="project-title">{t(title)}</div>
						<div className="project-description">
							{t(description)}
						</div>
						{link && (
							<div className="project-link">
								<div className="project-link-icon">
									<FontAwesomeIcon icon={faLink} />
								</div>

								<div className="project-link-text">
									{t(linkText)}
								</div>
							</div>
						)}
						{videoLink && <Iframe src={videoLink} />}
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Project;
