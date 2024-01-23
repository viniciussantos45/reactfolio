import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import "./style/article.css";

const Article = (props) => {
	const { date, title, description, link } = props;

	const { t } = useTranslation();

	return (
		<React.Fragment>
			<div className="article">
				<div className="article-left-side">
					<div className="article-date">{t(date)}</div>
				</div>

				<Link to={link}>
					<div className="article-right-side">
						<div className="article-title">{t(title)}</div>
						<div className="article-description">
							{t(description)}
						</div>
						<div className="article-link">
							{t("Read article")}{" "}
							<FontAwesomeIcon
								style={{ fontSize: "10px" }}
								icon={faChevronRight}
							/>
						</div>
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Article;
