export function MarkdownStyles() {
	// based on "highlight.js" and "github-markdown-css"

	const colors = {
		fg: {
			default: "var(--primary-color)",
			muted: "var(--secondary-color)",
			subtle: "var(--tertiary-color)",
		},
		bg: {
			default: "var(--background-page-content-color)",
			subtle: "var(--background-color)",
		},
		border: {
			default: "var(--border-color)",
			muted: "var(--border-color)",
		},
		btn: {
			default: "#24292e",
			fg: "#ffffff",
			subtle: "#959da5",
		},
		canvas: {
			default: "var(--background-page-content-color)",
			subtle: "var(--canvas-subtle)",
		},
		neutral: {
			default: "#e1e4e8",
			muted: "var(--quaternary-color)",
		},
		accent: {
			default: "#0366d6",
			fg: "#0366d6",
			subtle: "#c8e1ff",
		},
		attention: {
			default: "#d73a49",
			fg: "#ffffff",
			subtle: "#ffdce0",
		},
		success: {
			default: "#28a745",
			fg: "#ffffff",
			subtle: "#dcffe4",
		},
		warning: {
			default: "#ffd33d",
			fg: "#000000",
			subtle: "#fff5b1",
		},
		danger: {
			default: "#d73a49",
			fg: "#ffffff",
			subtle: "#ffdce0",
		},
		prettylights: {
			syntax: {
				comment: "var(--tertiary-color)",
				constant: "var(--code-syntax-constant)",
				entity: "var(--code-syntax-entity)",
				keyword: "var(--code-syntax-keyword)",
				storageModifierImport:
					"var(--code-syntax-storageModifierImport)",
				string: "var(--code-syntax-string)",
				markup: "var(--code-syntax-markup)",
			},
		},
	};

	return (
		<style jsx global>
			{`
				pre code.hljs {
					display: block;
					overflow-x: auto;
					padding: 1em;
				}
				code.hljs {
					padding: 3px 5px;
				}

				.hljs {
					color: ${colors.fg.default};
					background: ${colors.canvas.default};
				}
				.hljs-doctag,
				.hljs-keyword,
				.hljs-meta .hljs-keyword,
				.hljs-template-tag,
				.hljs-template-variable,
				.hljs-type,
				.hljs-variable.language_ {
					color: ${colors.prettylights.syntax.keyword};
				}
				.hljs-title,
				.hljs-title.class_,
				.hljs-title.class_.inherited__,
				.hljs-title.function_ {
					color: ${colors.prettylights.syntax.entity};
				}
				.hljs-attr,
				.hljs-attribute,
				.hljs-literal,
				.hljs-meta,
				.hljs-number,
				.hljs-operator,
				.hljs-selector-attr,
				.hljs-selector-class,
				.hljs-selector-id,
				.hljs-variable {
					color: ${colors.prettylights.syntax.constant};
				}
				.hljs-meta .hljs-string,
				.hljs-regexp,
				.hljs-string {
					color: ${colors.prettylights.syntax.string};
				}
				.hljs-built_in,
				.hljs-symbol {
					color: ${colors.prettylights.syntax.variable};
				}
				.hljs-code,
				.hljs-comment,
				.hljs-formula {
					color: ${colors.prettylights.syntax.comment};
				}
				.hljs-name,
				.hljs-quote,
				.hljs-selector-pseudo,
				.hljs-selector-tag {
					color: ${colors.prettylights.syntax.entityTag};
				}
				.hljs-subst {
					color: ${colors.prettylights.syntax.storageModifierImport};
				}
				.hljs-section {
					color: ${colors.prettylights.syntax.markupHeading};
					font-weight: 700;
				}
				.hljs-bullet {
					color: ${colors.prettylights.syntax.markupList};
				}
				.hljs-emphasis {
					color: ${colors.prettylights.syntax.markupItalic};
					font-style: italic;
				}
				.hljs-strong {
					color: ${colors.prettylights.syntax.markupBold};
					font-weight: 700;
				}
				.hljs-addition {
					color: ${colors.prettylights.syntax.markupInsertedText};
					background-color: ${colors.prettylights.syntax
						.markupInsertedBg};
				}
				.hljs-deletion {
					color: ${colors.prettylights.syntax.markupDeletedText};
					background-color: ${colors.prettylights.syntax
						.markupDeletedBg};
				}

				.markdown-body {
					-ms-text-size-adjust: 100%;
					-webkit-text-size-adjust: 100%;
					margin: 0;
					color: ${colors.fg.default};
					background-color: ${colors.canvas.default};
					font-size: 16px;
					word-wrap: break-word;
				}

				.markdown-body .octicon {
					display: inline-block;
					fill: currentColor;
					vertical-align: text-bottom;
				}

				.markdown-body h1:hover .anchor .octicon-link:before,
				.markdown-body h2:hover .anchor .octicon-link:before,
				.markdown-body h3:hover .anchor .octicon-link:before,
				.markdown-body h4:hover .anchor .octicon-link:before,
				.markdown-body h5:hover .anchor .octicon-link:before,
				.markdown-body h6:hover .anchor .octicon-link:before {
					width: 16px;
					height: 16px;
					content: " ";
					display: inline-block;
					background-color: currentColor;
					-webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
					mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
				}

				.markdown-body details,
				.markdown-body figcaption,
				.markdown-body figure {
					display: block;
				}

				.markdown-body summary {
					display: list-item;
				}

				.markdown-body [hidden] {
					display: none !important;
				}

				.markdown-body a {
					background-color: transparent;
					color: ${colors.accent.fg};
					font-weight: 600;
				}

				.markdown-body a:active,
				.markdown-body a:hover {
					outline-width: 0;
				}

				.markdown-body abbr[title] {
					border-bottom: none;
					text-decoration: underline dotted;
				}

				.markdown-body b,
				.markdown-body strong {
					font-weight: 600;
				}

				.markdown-body dfn {
					font-style: italic;
				}

				.markdown-body h1 {
					margin: 0.67em 0;
					font-weight: 600;
					padding-bottom: 0.3em;
					font-size: 2em;
					border-bottom: 1px solid ${colors.border.muted};
				}

				.markdown-body mark {
					background-color: ${colors.attention.subtle};
					color: ${colors.fg.default};
				}

				.markdown-body small {
					font-size: 90%;
				}

				.markdown-body sub,
				.markdown-body sup {
					font-size: 75%;
					line-height: 0;
					position: relative;
					vertical-align: baseline;
				}

				.markdown-body sub {
					bottom: -0.25em;
				}

				.markdown-body sup {
					top: -0.5em;
				}

				.markdown-body img {
					border-style: none;
					max-width: 100%;
					box-sizing: content-box;
					background-color: ${colors.canvas.default};
				}

				.markdown-body code,
				.markdown-body kbd,
				.markdown-body pre,
				.markdown-body samp {
					font-size: 1em;
				}

				.markdown-body figure {
					margin: 1em 40px;
				}

				.markdown-body hr {
					box-sizing: content-box;
					overflow: hidden;
					background: transparent;
					border-bottom: 1px solid ${colors.border.muted};
					height: 0.25em;
					padding: 0;
					margin: 24px 0;
					background-color: ${colors.border.default};
					border: 0;
				}

				.markdown-body input {
					font: inherit;
					margin: 0;
					overflow: visible;
					font-size: inherit;
					line-height: inherit;
				}

				.markdown-body [type="button"],
				.markdown-body [type="reset"],
				.markdown-body [type="submit"] {
					-webkit-appearance: button;
				}

				.markdown-body [type="button"]::-moz-focus-inner,
				.markdown-body [type="reset"]::-moz-focus-inner,
				.markdown-body [type="submit"]::-moz-focus-inner {
					border-style: none;
					padding: 0;
				}

				.markdown-body [type="button"]:-moz-focusring,
				.markdown-body [type="reset"]:-moz-focusring,
				.markdown-body [type="submit"]:-moz-focusring {
					outline: 1px dotted ButtonText;
				}

				.markdown-body [type="checkbox"],
				.markdown-body [type="radio"] {
					box-sizing: border-box;
					padding: 0;
				}

				.markdown-body [type="number"]::-webkit-inner-spin-button,
				.markdown-body [type="number"]::-webkit-outer-spin-button {
					height: auto;
				}

				.markdown-body [type="search"] {
					-webkit-appearance: textfield;
					outline-offset: -2px;
				}

				.markdown-body [type="search"]::-webkit-search-cancel-button,
				.markdown-body [type="search"]::-webkit-search-decoration {
					-webkit-appearance: none;
				}

				.markdown-body ::-webkit-input-placeholder {
					color: inherit;
					opacity: 0.54;
				}

				.markdown-body ::-webkit-file-upload-button {
					-webkit-appearance: button;
					font: inherit;
				}

				.markdown-body a:hover {
					text-decoration: underline;
				}

				.markdown-body hr::before {
					display: table;
					content: "";
				}

				.markdown-body hr::after {
					display: table;
					clear: both;
					content: "";
				}

				.markdown-body table {
					border-spacing: 0;
					border-collapse: collapse;
					display: block;
					width: max-content;
					max-width: 100%;
					overflow: auto;
				}

				.markdown-body td,
				.markdown-body th {
					padding: 0;
				}

				.markdown-body details summary {
					cursor: pointer;
				}

				.markdown-body details:not([open]) > *:not(summary) {
					display: none !important;
				}

				.markdown-body kbd {
					display: inline-block;
					padding: 3px 5px;
					font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo,
						Consolas, Liberation Mono, monospace;
					line-height: 10px;
					color: ${colors.fg.default};
					vertical-align: middle;
					background-color: ${colors.canvas.subtle};
					border: solid 1px ${colors.neutral.muted};
					border-bottom-color: ${colors.neutral.muted};
					border-radius: 6px;
					box-shadow: inset 0 -1px 0 ${colors.neutral.muted};
				}

				.markdown-body h1,
				.markdown-body h2,
				.markdown-body h3,
				.markdown-body h4,
				.markdown-body h5,
				.markdown-body h6 {
					margin-top: 24px;
					margin-bottom: 16px;
					font-weight: 600;
					line-height: 1.25;
				}

				.markdown-body h2 {
					font-weight: 600;
					padding-bottom: 0.3em;
					font-size: 1.5em;
					border-bottom: 1px solid ${colors.border.muted};
				}

				.markdown-body h3 {
					font-weight: 600;
					font-size: 1.25em;
				}

				.markdown-body h4 {
					font-weight: 600;
					font-size: 1em;
				}

				.markdown-body h5 {
					font-weight: 600;
					font-size: 0.875em;
				}

				.markdown-body h6 {
					font-weight: 600;
					font-size: 0.85em;
					color: ${colors.fg.muted};
				}

				.markdown-body p {
					margin-top: 0;
					margin-bottom: 10px;
				}

				.markdown-body blockquote {
					margin: 0;
					padding: 0 1em;
					color: ${colors.fg.muted};
					border-left: 0.25em solid ${colors.border.default};
				}

				.markdown-body ul,
				.markdown-body ol {
					margin-top: 0;
					margin-bottom: 0;
					padding-left: 2em;
				}

				.markdown-body ol ol,
				.markdown-body ul ol {
					list-style-type: lower-roman;
				}

				.markdown-body ul ul ol,
				.markdown-body ul ol ol,
				.markdown-body ol ul ol,
				.markdown-body ol ol ol {
					list-style-type: lower-alpha;
				}

				.markdown-body dd {
					margin-left: 0;
				}

				.markdown-body tt,
				.markdown-body code {
					font-size: 12px;
				}

				.markdown-body pre {
					margin-top: 0;
					margin-bottom: 0;
					font-size: 12px;
					word-wrap: normal;
				}

				.markdown-body .octicon {
					display: inline-block;
					overflow: visible !important;
					vertical-align: text-bottom;
					fill: currentColor;
				}

				.markdown-body ::placeholder {
					color: ${colors.fg.subtle};
					opacity: 1;
				}

				.markdown-body input::-webkit-outer-spin-button,
				.markdown-body input::-webkit-inner-spin-button {
					margin: 0;
					-webkit-appearance: none;
					appearance: none;
				}

				.markdown-body .pl-c {
					color: ${colors.prettylights.syntax.comment};
				}

				.markdown-body .pl-c1,
				.markdown-body .pl-s .pl-v {
					color: ${colors.prettylights.syntax.constant};
				}

				.markdown-body .pl-e,
				.markdown-body .pl-en {
					color: ${colors.prettylights.syntax.entity};
				}

				.markdown-body .pl-smi,
				.markdown-body .pl-s .pl-s1 {
					color: ${colors.prettylights.syntax.storageModifierImport};
				}

				.markdown-body .pl-ent {
					color: ${colors.prettylights.syntax.entity.tag};
				}

				.markdown-body .pl-k {
					color: ${colors.prettylights.syntax.keyword};
				}

				.markdown-body .pl-s,
				.markdown-body .pl-pds,
				.markdown-body .pl-s .pl-pse .pl-s1,
				.markdown-body .pl-sr,
				.markdown-body .pl-sr .pl-cce,
				.markdown-body .pl-sr .pl-sre,
				.markdown-body .pl-sr .pl-sra {
					color: ${colors.prettylights.syntax.string};
				}

				.markdown-body .pl-v,
				.markdown-body .pl-smw {
					color: ${colors.prettylights.syntax.variable};
				}

				.markdown-body .pl-bu {
					color: ${colors.prettylights.syntax
						.brackethighlighterUnmatched};
				}

				.markdown-body .pl-ii {
					color: ${colors.prettylights.syntax.invalidIllegalText};
					background-color: ${colors.prettylights.syntax
						.invalidIllegalBg};
				}

				.markdown-body .pl-c2 {
					color: ${colors.prettylights.syntax.carriageReturnText};
					background-color: ${colors.prettylights.syntax
						.carriageReturnBg};
				}

				.markdown-body .pl-sr .pl-cce {
					font-weight: bold;
					color: ${colors.prettylights.syntax.stringRegexp};
				}

				.markdown-body .pl-ml {
					color: ${colors.prettylights.syntax.markupList};
				}

				.markdown-body .pl-mh,
				.markdown-body .pl-mh .pl-en,
				.markdown-body .pl-ms {
					font-weight: bold;
					color: ${colors.prettylights.syntax.markupHeading};
				}

				.markdown-body .pl-mi {
					font-style: italic;
					color: ${colors.prettylights.syntax.markupItalic};
				}

				.markdown-body .pl-mb {
					font-weight: bold;
					color: ${colors.prettylights.syntax.markupBold};
				}

				.markdown-body .pl-md {
					color: ${colors.prettylights.syntax.markupDeletedText};
					background-color: ${colors.prettylights.syntax
						.MarkupDeletedBg};
				}

				.markdown-body .pl-mi1 {
					color: ${colors.prettylights.syntax.markupInsertedText};
					background-color: ${colors.prettylights.syntax
						.markupInsertedBg};
				}

				.markdown-body .pl-mc {
					color: ${colors.prettylights.syntax.markupChangedText};
					background-color: ${colors.prettylights.syntax
						.MarkupChangedBg};
				}

				.markdown-body .pl-mi2 {
					color: ${colors.prettylights.syntax.markupIgnoredText};
					background-color: ${colors.prettylights.syntax
						.markupIgnoredBg};
				}

				.markdown-body .pl-mdr {
					font-weight: bold;
					color: ${colors.prettylights.syntax.metaDiffRange};
				}

				.markdown-body .pl-ba {
					color: ${colors.prettylights.syntax
						.brackethighlighterAngle};
				}

				.markdown-body .pl-sg {
					color: ${colors.prettylights.syntax
						.sublimelinterGutterMark};
				}

				.markdown-body .pl-corl {
					text-decoration: underline;
					color: ${colors.prettylights.syntax.constant
						.otherReferenceLink};
				}

				.markdown-body [data-catalyst] {
					display: block;
				}

				.markdown-body g-emoji {
					font-size: 1em;
					font-style: normal !important;
					font-weight: 400;
					line-height: 1;
					vertical-align: -0.075em;
				}

				.markdown-body g-emoji img {
					width: 1em;
					height: 1em;
				}

				.markdown-body::before {
					display: table;
					content: "";
				}

				.markdown-body::after {
					display: table;
					clear: both;
					content: "";
				}

				.markdown-body > *:first-child {
					margin-top: 0 !important;
				}

				.markdown-body > *:last-child {
					margin-bottom: 0 !important;
				}

				.markdown-body a:not([href]) {
					color: inherit;
					text-decoration: none;
				}

				.markdown-body .absent {
					color: ${colors.danger.fg};
				}

				.markdown-body .anchor {
					float: left;
					padding-right: 4px;
					margin-left: -20px;
					line-height: 1;
				}

				.markdown-body .anchor:focus {
					outline: none;
				}

				.markdown-body p,
				.markdown-body blockquote,
				.markdown-body ul,
				.markdown-body ol,
				.markdown-body dl,
				.markdown-body table,
				.markdown-body pre,
				.markdown-body details {
					margin-top: 0;
					margin-bottom: 16px;
				}

				.markdown-body blockquote > :first-child {
					margin-top: 0;
				}

				.markdown-body blockquote > :last-child {
					margin-bottom: 0;
				}

				.markdown-body sup > a::before {
					content: "[";
				}

				.markdown-body sup > a::after {
					content: "]";
				}

				.markdown-body h1 .octicon-link,
				.markdown-body h2 .octicon-link,
				.markdown-body h3 .octicon-link,
				.markdown-body h4 .octicon-link,
				.markdown-body h5 .octicon-link,
				.markdown-body h6 .octicon-link {
					color: ${colors.fg.default};
					vertical-align: middle;
					visibility: hidden;
				}

				.markdown-body h1:hover .anchor,
				.markdown-body h2:hover .anchor,
				.markdown-body h3:hover .anchor,
				.markdown-body h4:hover .anchor,
				.markdown-body h5:hover .anchor,
				.markdown-body h6:hover .anchor {
					text-decoration: none;
				}

				.markdown-body h1:hover .anchor .octicon-link,
				.markdown-body h2:hover .anchor .octicon-link,
				.markdown-body h3:hover .anchor .octicon-link,
				.markdown-body h4:hover .anchor .octicon-link,
				.markdown-body h5:hover .anchor .octicon-link,
				.markdown-body h6:hover .anchor .octicon-link {
					visibility: visible;
				}

				.markdown-body h1 tt,
				.markdown-body h1 code,
				.markdown-body h2 tt,
				.markdown-body h2 code,
				.markdown-body h3 tt,
				.markdown-body h3 code,
				.markdown-body h4 tt,
				.markdown-body h4 code,
				.markdown-body h5 tt,
				.markdown-body h5 code,
				.markdown-body h6 tt,
				.markdown-body h6 code {
					padding: 0 0.2em;
					font-size: inherit;
				}

				.markdown-body ul.no-list,
				.markdown-body ol.no-list {
					padding: 0;
					list-style-type: none;
				}

				.markdown-body ol[type="1"] {
					list-style-type: decimal;
				}

				.markdown-body ol[type="a"] {
					list-style-type: lower-alpha;
				}

				.markdown-body ol[type="i"] {
					list-style-type: lower-roman;
				}

				.markdown-body div > ol:not([type]) {
					list-style-type: decimal;
				}

				.markdown-body ul ul,
				.markdown-body ul ol,
				.markdown-body ol ol,
				.markdown-body ol ul {
					margin-top: 0;
					margin-bottom: 0;
				}

				.markdown-body li > p {
					margin-top: 16px;
				}

				.markdown-body li + li {
					margin-top: 0.25em;
				}

				.markdown-body dl {
					padding: 0;
				}

				.markdown-body dl dt {
					padding: 0;
					margin-top: 16px;
					font-size: 1em;
					font-style: italic;
					font-weight: 600;
				}

				.markdown-body dl dd {
					padding: 0 16px;
					margin-bottom: 16px;
				}

				.markdown-body table th {
					font-weight: 600;
				}

				.markdown-body table th,
				.markdown-body table td {
					padding: 6px 13px;
					border: 1px solid ${colors.border.default};
				}

				.markdown-body table tr {
					background-color: ${colors.canvas.default};
					border-top: 1px solid ${colors.border.muted};
				}

				.markdown-body table tr:nth-child(2n) {
					background-color: ${colors.canvas.subtle};
				}

				.markdown-body table img {
					background-color: transparent;
				}

				.markdown-body img[align="right"] {
					padding-left: 20px;
				}

				.markdown-body img[align="left"] {
					padding-right: 20px;
				}

				.markdown-body .emoji {
					max-width: none;
					vertical-align: text-top;
					background-color: transparent;
				}

				.markdown-body span.frame {
					display: block;
					overflow: hidden;
				}

				.markdown-body span.frame > span {
					display: block;
					float: left;
					width: auto;
					padding: 7px;
					margin: 13px 0 0;
					overflow: hidden;
					border: 1px solid ${colors.border.default};
				}

				.markdown-body span.frame span img {
					display: block;
					float: left;
				}

				.markdown-body span.frame span span {
					display: block;
					padding: 5px 0 0;
					clear: both;
					color: ${colors.fg.default};
				}

				.markdown-body span.align-center {
					display: block;
					overflow: hidden;
					clear: both;
				}

				.markdown-body span.align-center > span {
					display: block;
					margin: 13px auto 0;
					overflow: hidden;
					text-align: center;
				}

				.markdown-body span.align-center span img {
					margin: 0 auto;
					text-align: center;
				}

				.markdown-body span.align-right {
					display: block;
					overflow: hidden;
					clear: both;
				}

				.markdown-body span.align-right > span {
					display: block;
					margin: 13px 0 0;
					overflow: hidden;
					text-align: right;
				}

				.markdown-body span.align-right span img {
					margin: 0;
					text-align: right;
				}

				.markdown-body span.float-left {
					display: block;
					float: left;
					margin-right: 13px;
					overflow: hidden;
				}

				.markdown-body span.float-left span {
					margin: 13px 0 0;
				}

				.markdown-body span.float-right {
					display: block;
					float: right;
					margin-left: 13px;
					overflow: hidden;
				}

				.markdown-body span.float-right > span {
					display: block;
					margin: 13px auto 0;
					overflow: hidden;
					text-align: right;
				}

				.markdown-body code,
				.markdown-body tt {
					padding: 0.2em 0.4em;
					margin: 0;
					font-size: 85%;
					background-color: ${colors.neutral.muted};
					border-radius: 6px;
				}

				.markdown-body code br,
				.markdown-body tt br {
					display: none;
				}

				.markdown-body del code {
					text-decoration: inherit;
				}

				.markdown-body pre code {
					font-size: 100%;
				}

				.markdown-body pre > code {
					padding: 0;
					margin: 0;
					word-break: normal;
					white-space: pre;
					background: transparent;
					border: 0;
				}

				.markdown-body .highlight {
					margin-bottom: 16px;
				}

				.markdown-body .highlight pre {
					margin-bottom: 0;
					word-break: normal;
				}

				.markdown-body .highlight pre,
				.markdown-body pre {
					padding: 16px;
					overflow: auto;
					font-size: 85%;
					line-height: 1.45;
					background-color: ${colors.canvas.subtle};
					border-radius: 6px;
				}
				.markdown-body .math {
					overflow: auto;
				}
				.markdown-body pre code,
				.markdown-body pre tt {
					display: inline;
					max-width: auto;
					padding: 0;
					margin: 0;
					overflow: visible;
					line-height: inherit;
					word-wrap: normal;
					background-color: transparent;
					border: 0;
				}

				.markdown-body .csv-data td,
				.markdown-body .csv-data th {
					padding: 5px;
					overflow: hidden;
					font-size: 12px;
					line-height: 1;
					text-align: left;
					white-space: nowrap;
				}

				.markdown-body .csv-data .blob-num {
					padding: 10px 8px 9px;
					text-align: right;
					background: ${colors.canvas.default};
					border: 0;
				}

				.markdown-body .csv-data tr {
					border-top: 0;
				}

				.markdown-body .csv-data th {
					font-weight: 600;
					background: ${colors.canvas.subtle};
					border-top: 0;
				}

				.markdown-body .footnotes {
					font-size: 12px;
					color: ${colors.fg.muted};
					border-top: 1px solid ${colors.border.default};
				}

				.markdown-body .footnotes ol {
					padding-left: 16px;
				}

				.markdown-body .footnotes li {
					position: relative;
				}

				.markdown-body .footnotes li:target::before {
					position: absolute;
					top: -8px;
					right: -8px;
					bottom: -8px;
					left: -24px;
					pointer-events: none;
					content: "";
					border: 2px solid ${colors.accent.emphasis};
					border-radius: 6px;
				}

				.markdown-body .footnotes li:target {
					color: ${colors.fg.default};
				}

				.markdown-body .footnotes .data-footnote-backref g-emoji {
				}

				.markdown-body .task-list-item {
					list-style-type: none;
				}

				.markdown-body .task-list-item label {
					font-weight: 400;
				}

				.markdown-body .task-list-item.enabled label {
					cursor: pointer;
				}

				.markdown-body .task-list-item + .task-list-item {
					margin-top: 3px;
				}

				.markdown-body .task-list-item .handle {
					display: none;
				}

				.markdown-body .task-list-item-checkbox {
					margin: 0 0.2em 0.25em -1.6em;
					vertical-align: middle;
				}

				.markdown-body
					.contains-task-list:dir(rtl)
					.task-list-item-checkbox {
					margin: 0 -1.6em 0.25em 0.2em;
				}

				.markdown-body ::-webkit-calendar-picker-indicator {
					filter: invert(50%);
				}

				.copy-button {
					border-color: ${colors.btn.border};
					color: ${colors.fg.muted};
					background-color: ${colors.btn.bg};
				}

				.copy-button:hover {
					border-color: ${colors.btn.hoverBorder};
					background-color: ${colors.btn.hoverBg};
				}

				.copy-button.copied {
					border-color: ${colors.success.fg};
					background-color: ${colors.btn.hoverBg};
					color: ${colors.success.fg};
				}
			`}
		</style>
	);
}
