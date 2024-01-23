import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Article from "../components/articles/article";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import NavBar from "../components/common/navBar";

import myArticles from "../data/articles";
import SEO from "../data/seo";
import INFO from "../data/user";

import "./styles/articles.css";

const Articles = () => {
	const { t } = useTranslation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "articles");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${t("Articles")} | ${INFO.main.title}`}</title>
				<meta name="description" content={t(currentSEO.description)} />
				<meta
					name="keywords"
					content={currentSEO.keywords
						.map((keyword) => {
							return t(keyword);
						})
						.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="articles" />
				<div className="content-wrapper">
					<div className="articles-logo-container">
						<div className="articles-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="articles-main-container">
						<div className="title articles-title">
							{t(INFO.articles.title)}
						</div>

						<div className="subtitle articles-subtitle">
							{t(INFO.articles.description)}
						</div>

						<div className="articles-container">
							<div className="articles-wrapper">
								{myArticles.map((article, index) => (
									<div
										className="articles-article"
										key={(index + 1).toString()}
									>
										<Article
											key={(index + 1).toString()}
											date={t(article().date)}
											title={t(article().title)}
											description={t(
												article().description
											)}
											link={"/article/" + (index + 1)}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Articles;
