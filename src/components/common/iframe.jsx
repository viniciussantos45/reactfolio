import React, { useState } from "react";

import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { X } from "@phosphor-icons/react";

import { useTranslation } from "react-i18next";

import "./styles/iframe.css";

export default function Iframe({ src }) {
	const [show, setShow] = useState(false);

	const { t } = useTranslation();

	return (
		<React.Fragment>
			<div
				className="project-link"
				onClick={(e) => {
					e.preventDefault();
					setShow(true);
				}}
			>
				<div className="project-link-icon">
					<FontAwesomeIcon icon={faVideo} />
				</div>

				<div className="project-link-text">{t("View Video")}</div>
			</div>
			{show && (
				<div
					className="iframe-container"
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					<button
						className="iframe-close"
						onClick={() => {
							setShow(false);
						}}
					>
						<X size={32} weight="fill" />
					</button>
					<iframe
						src={src}
						width="600"
						height="400"
						frameborder="0"
						allowfullscreen=""
						title="1"
					></iframe>
				</div>
			)}
		</React.Fragment>
	);
}
