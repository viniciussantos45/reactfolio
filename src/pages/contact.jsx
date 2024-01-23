import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Socials from "../components/about/socials";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import NavBar from "../components/common/navBar";

import SEO from "../data/seo";
import INFO from "../data/user";

import "./styles/contact.css";

const Contact = () => {
	const { t } = useTranslation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${t("Contact")} | ${INFO.main.title}`}</title>
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
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="contact-container">
						<div className="title contact-title">
							{t("Let's Get in Touch: Ways to Connect with Me")}
						</div>

						<div className="subtitle contact-subtitle">
							{t(
								"Thank you for your interest in getting in touch with me. I welcome your feedback, questions, and suggestions. If you have a specific question or comment, please feel free to email me directly at"
							)}
							&nbsp;{" "}
							<a href={`mailto:${INFO.main.email}`}>
								{INFO.main.email}
							</a>
							.{" "}
							{t(
								"I make an effort to respond to all messages within 24 hours, although it may take me longer during busy periods. Alternatively, you can use the contact form on my website to get in touch. Simply fill out the required fields and I'll get back to you as soon as possible. Finally, if you prefer to connect on social media, you can find me on"
							)}{" "}
							<a
								href={INFO.socials.instagram}
								target="_blank"
								rel="noreferrer"
							>
								{INFO.socials.instagram}
							</a>
							.{" "}
							{t(
								"I post regular updates and engage with my followers there, so don't hesitate to reach out. Thanks again for your interest, and I look forward to hearing from you!"
							)}
						</div>
					</div>

					<div className="socials-container">
						<div className="contact-socials">
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

export default Contact;
