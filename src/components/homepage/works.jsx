import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import Card from "../common/card";

import INFO from "../../data/user";

import "./styles/works.css";

console.log(INFO);

const Works = () => {
	const { t } = useTranslation();

	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title={t("Work")}
				body={
					<div className="works-body">
						{INFO.works.map((work) => {
							return (
								<div className="work">
									<img
										src={work.logo}
										alt={work.title}
										className="work-image"
									/>
									<div className="work-title">
										{work.title}
									</div>
									<div className="work-subtitle">
										{work.subtitle}
									</div>
									<div className="work-duration">
										{work.duration}
									</div>
								</div>
							);
						})}
					</div>
				}
			/>
		</div>
	);
};

export default Works;
