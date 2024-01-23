import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowCircleLeft } from "@phosphor-icons/react";

import breaks from "@bytemd/plugin-breaks";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math";
import mermaid from "@bytemd/plugin-mermaid";
import { Viewer } from "@bytemd/react";

import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import NavBar from "../components/common/navBar";
import myArticles from "../data/articles";
import INFO from "../data/user";

import styled from "styled-components";
import "./styles/readArticle.css";

import "bytemd/dist/index.css";

let ArticleStyle = styled.div``;

const ReadArticle = () => {
	const [mdContent, setMdContent] = React.useState("");
	const navigate = useNavigate();
	let { slug } = useParams();

	const article = myArticles[slug - 1];

	const { body, md } = article();

	const { t, i18n } = useTranslation();

	const loadMd = (lang = localStorage.getItem("vgt-language")) => {
		fetch(`/articles/${lang}/${md}.md`)
			.then((res) => res.text())
			.then((res) => {
				setMdContent(res);
			});
	};

	useEffect(() => {
		loadMd();

		window.scrollTo(0, 0);
	}, [article]);

	useEffect(() => {
		const handleLanguageChange = (newLang) => {
			loadMd(newLang);
		};

		i18n.on("languageChanged", handleLanguageChange);

		return () => {
			i18n.off("languageChanged", handleLanguageChange);
		};
	}, [i18n]);

	ArticleStyle = styled.div`
		${article().style}
	`;

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${t(article().title)} | ${INFO.main.title}`}</title>
				<meta name="description" content={t(article().description)} />
				<meta
					name="keywords"
					content={article()
						.keywords.map((keyword) => t(keyword))
						.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">
					<div className="read-article-logo-container">
						<div className="read-article-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="read-article-container">
						<div className="read-article-back">
							<ArrowCircleLeft
								size={48}
								weight="fill"
								className="read-article-back-button"
								alt="back"
								onClick={() => navigate(-1)}
							/>
						</div>

						<div className="read-article-wrapper">
							<div className="read-article-date-container">
								<div className="read-article-date">
									{t(article().date)}
								</div>
							</div>

							<div className="title read-article-title">
								{t(article().title)}
							</div>

							<div className="read-article-body">
								{body && (
									<ArticleStyle>
										{article().body}
									</ArticleStyle>
								)}

								{md && (
									<Viewer
										value={mdContent.trim()}
										sanitize={(defaultSchema) => {
											const schema = { ...defaultSchema };
											schema.attributes["*"] =
												schema.attributes["*"].filter(
													(attr) =>
														![
															"className",
															"target",
														].includes(attr)
												);

											schema.attributes["*"].push([
												"className",
												/^hljs|^language-|^bytemd-mermaid$|^math/,
											]);

											return schema;
										}}
										plugins={[
											gfm(),
											breaks(),
											gemoji(),
											highlightSsr(),
											math(),
											mermaid(),
										]}
									></Viewer>
								)}
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

export default ReadArticle;
