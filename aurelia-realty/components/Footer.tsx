import { createElement } from "react";

export default function Footer() {
	return createElement(
		"footer",
		{ className: "footer" },
		createElement(
			"div",
			{ className: "container split" },
			createElement(
				"div",
				null,
				createElement("div", { className: "brand" }, "AURELIA REALTY"),
				createElement(
					"p",
					{ className: "muted" },
					"Elevate your lifestyle. Discover the difference."
				)
			),
			createElement(
				"div",
				null,
				createElement("b", null, "Contact"),
				createElement(
					"p",
					null,
					"+91 91675 95263",
					createElement("br"),
					"hello@aurelia.local",
					createElement("br"),
					"Mumbai, Maharashtra"
				)
			)
		)
	);
}
