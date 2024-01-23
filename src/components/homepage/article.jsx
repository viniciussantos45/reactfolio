import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles/article.css";

const Article = (props) => {
	const { title, description, date, link } = props;

	const { t } = useTranslation();

	return (
		<React.Fragment>
			<div className="homepage-article">
				<div className="homepage-article-content">
					<div className="homepage-article-date">
						|&nbsp;&nbsp;&nbsp;{date}
					</div>
					<div className="homepage-article-title">{t(title)}</div>
					<div className="homepage-article-description">
						{t(description)}
					</div>
					<div className="homepage-article-link">
						<Link to={link} target="_blank">
							{t("Read article")}{" "}
							<FontAwesomeIcon
								style={{ fontSize: "10px" }}
								icon={faChevronRight}
							/>
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Article;
