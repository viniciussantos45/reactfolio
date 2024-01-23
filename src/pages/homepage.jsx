import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import {
	faGithub,
	faInstagram,
	faStackOverflow,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import NavBar from "../components/common/navBar";
import Article from "../components/homepage/article";
import Works from "../components/homepage/works";
import AllProjects from "../components/projects/allProjects";

import myArticles from "../data/articles";
import SEO from "../data/seo";
import INFO from "../data/user";

import { useTranslation } from "react-i18next";
import "./styles/homepage.css";

const Homepage = () => {
	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);

	const { t } = useTranslation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.pageYOffset, 2);

			let newLogoSize = 80 - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [logoSize, oldLogoSize]);

	const currentSEO = SEO.find((item) => item.page === "home");

	const logoStyle = {
		display: "flex",
		alignItems: "center",
		position: stayLogo ? "fixed" : "relative",
		top: stayLogo ? "3vh" : "auto",
		zIndex: 999,
		border: stayLogo ? "1px solid white" : "none",
		borderRadius: stayLogo ? "50%" : "none",
		boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	};

	const h1Style = {
		fontFamily: "var(--secondary-font)",
		color: "var(--primary-color)",
		marginLeft: "1rem",
		marginBlockStart: "0",
		marginBlockEnd: "0",
		marginInlineStart: "0",
		marginInlineEnd: "0",
		fontWeight: "bold",
		fontSize: stayLogo ? "0rem" : "1.5rem",
	};

	const divLogoStyle = {
		marginLeft: "1rem",
		color: "var(--primary-color)",
		display: stayLogo ? "none" : "flex",
		flexDirection: "column",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
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
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div>
						<div style={divLogoStyle}>
							<h1 style={h1Style}>Vinicius Gomes</h1>
							<span>{t("Developer")}</span>
						</div>
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									{t(INFO.homepage.title)}
								</div>

								<div className="subtitle homepage-subtitle">
									{t(INFO.homepage.description)}
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src="homepage.jpg"
											alt="about"
											className="homepage-image"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="homepage-socials">
							<a
								href={INFO.socials.twitter}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faTwitter}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.github}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									className="homepage-social-icon"
								/>
							</a>
							{INFO.socials.stackoverflow && (
								<a
									href={INFO.socials.stackoverflow}
									target="_blank"
									rel="noreferrer"
								>
									<FontAwesomeIcon
										icon={faStackOverflow}
										className="homepage-social-icon"
									/>
								</a>
							)}
							<a
								href={INFO.socials.instagram}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faInstagram}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={`mailto:${INFO.main.email}`}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faMailBulk}
									className="homepage-social-icon"
								/>
							</a>
						</div>

						<div className="homepage-projects">
							<AllProjects />
						</div>

						<div className="homepage-after-title">
							<div className="homepage-articles">
								{[myArticles[0], myArticles[1]].map(
									(article, index) => (
										<div
											className="homepage-article"
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
									)
								)}
							</div>

							<div className="homepage-works">
								<Works />
							</div>
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
