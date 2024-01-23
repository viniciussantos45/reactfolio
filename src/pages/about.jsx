import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Socials from "../components/about/socials";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import NavBar from "../components/common/navBar";

import SEO from "../data/seo";
import INFO from "../data/user";

import Hobbies from "../components/about/hobbies";
import "./styles/about.css";

const About = () => {
	const { t } = useTranslation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${t("About")} | ${INFO.main.title}`}</title>
				<meta
					name={"description"}
					content={t(currentSEO.description)}
				/>
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
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						<div className="about-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="about-container">
						<div className="about-main">
							<div className="about-right-side">
								<div className="title about-title">
									{t(INFO.about.title)}
								</div>

								<div className="subtitle about-subtitle">
									{t(INFO.about.description)}
								</div>

								<div className="about-hobbies">
									<Hobbies />
								</div>
							</div>

							<div className="about-left-side">
								<div className="about-image-container">
									<div className="about-image-wrapper">
										<img
											src="about.jpg"
											alt="about"
											className="about-image"
										/>
									</div>
								</div>

								<div className="about-socials">
									<Socials />
								</div>
							</div>
						</div>
						<div className="about-socials-mobile">
							<Socials />
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

export default About;
