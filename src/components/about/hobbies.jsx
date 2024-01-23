import { faHandPeace } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import Card from "../common/card";

import INFO from "../../data/user";

import "./styles/hobbies.css";

const Hobbies = () => {
	const { t } = useTranslation();

	return (
		<div className="hobbies">
			<Card
				icon={faHandPeace}
				title={t("Hobbies")}
				body={
					<div className="hobbies-body">
						{INFO.hobbies &&
							INFO.hobbies.map((hobby) => {
								return (
									<div className="hobby">
										<div
											className="hobby-icon"
											style={{
												outlineColor: `color-mix(in srgb, ${hobby.color} 10%, var(--quaternary-color) 10%)`,
											}}
										>
											{hobby.icon}
										</div>
										<div className="hobby-title">
											{t(hobby.title)}
										</div>
										<div className="hobby-description">
											{t(hobby.description)}
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

export default Hobbies;
