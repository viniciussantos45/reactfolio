import React, { useState } from "react";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import "./styles/lang.css";

const countryFlags = {
	en: "us",
	"pt-BR": "br",
};

const countryNames = {
	en: "English",
	"pt-BR": "Português",
};

export default function Lang() {
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);

	const [isOpen, setIsOpen] = useState(false);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("vgt-language", lng);
		setLang(lng);
	};

	return (
		<nav className="lang-nav">
			<div className="lang-menu" onClick={() => setIsOpen(!isOpen)}>
				<div className="selected-lang">
					<img
						src={`https://hatscripts.github.io/circle-flags/flags/${countryFlags[lang]}.svg`}
						width="24"
						alt=""
					/>
					<span>{countryNames[lang]}</span>
					{!isOpen ? (
						<FontAwesomeIcon
							width={20}
							icon={faCaretDown}
							style={{
								transform: "rotate(360deg)",
								transition: "0.3s",
							}}
						/>
					) : (
						<FontAwesomeIcon
							width={20}
							icon={faCaretDown}
							style={{
								transform: "rotate(180deg)",
								transition: "0.3s",
							}}
						/>
					)}
				</div>
				{isOpen && (
					<ul>
						<li>
							<button
								className={lang === "en" ? "active" : ""}
								onClick={() => changeLanguage("en")}
							>
								<img
									src="https://hatscripts.github.io/circle-flags/flags/us.svg"
									width="24"
									alt=""
								/>
								{t("English")}
							</button>
						</li>
						<li>
							<button
								className={lang === "pt-BR" ? "active" : ""}
								onClick={() => changeLanguage("pt-BR")}
							>
								<img
									src="https://hatscripts.github.io/circle-flags/flags/br.svg"
									width="24"
									alt=""
								/>
								{t("Portuguese")}
							</button>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
}
