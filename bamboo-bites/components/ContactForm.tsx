import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ConfirmedSvg = ({ key }: { key: string }) => {
	return (
		<AnimatePresence mode="wait">
			<motion.svg
				key={key}
				initial={{ opacity: 0, x: -10, y: 5, scale: 0.1 }}
				animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 512 512"
			>
				<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
			</motion.svg>
		</AnimatePresence>
	);
};

const ContactForm = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(false); // Add a state for email validation

	const handleInput = (e: any) => {
		switch (e.target.name) {
			case "namn":
				setName(e.target.value);
				break;
			case "telefon":
				setPhone(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case "meddelande":
				setMessage(e.target.value);
				break;
			default:
				break;
		}
	};

	const validateEmail = (email: string) => {
		// Regular expression pattern for a valid email address
		const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailPattern.test(email);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			setIsEmailValid(false); // Set email validation state to false if email is not valid
			return; // Don't submit the form if email is not valid
		}

		setIsEmailValid(true); // Set email validation state to true if email is valid

		console.log("submit");
		console.log("name", name);
		console.log("phone", phone);
		console.log("email", email);
		console.log("message", message);
		setFormSubmitted(true);
	};

	const completedFieldClass = "completed";

	return (
		<motion.article layout className="contact-form">
			<AnimatePresence mode="wait">
				{formSubmitted ? (
					<motion.div layout className="sent-message">
						<motion.h3 layout>Thank you for reaching out!</motion.h3>
						<motion.p layout>
							Your message has been sent! <br /> <br />
							We'll get back to you asap. <br /> <br /> <br />
						</motion.p>

						<motion.button
							onClick={() => {
								setFormSubmitted(false);
								setName("");
								setPhone("");
								setEmail("");
								setMessage("");
								setIsEmailValid(false);
							}}
							className="primary-button"
						>
							Send a new message
						</motion.button>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						layout
					>
						<motion.h3 layout>Reach Out, We're Friendly!</motion.h3>
						<div className="form-field">
							<label htmlFor="namn">Your name:</label>
							<div className="input-container">
								<input
									onBlur={(e) => handleInput(e)}
									onChange={(e) => {
										if (e.target.value === "") setName("");
									}}
									type="text"
									name="namn"
									id="namn"
									className={name ? `${completedFieldClass} animated-bg` : ""}
								/>
								{name && <ConfirmedSvg key="name" />}
							</div>
						</div>
						<div className="form-field">
							<label htmlFor="telefon">Phone:</label>
							<div className="input-container">
								<input
									onBlur={(e) => handleInput(e)}
									onChange={(e) => {
										if (e.target.value === "") setPhone("");
									}}
									type="tel"
									name="telefon"
									id="telefon"
									className={phone ? `${completedFieldClass} animated-bg` : ""}
								/>
								{phone && <ConfirmedSvg key="phone" />}
							</div>
						</div>
						<div className="form-field">
							<label htmlFor="email">E-mail:</label>
							<div className="input-container">
								<input
									onBlur={(e) => {
										setIsEmailValid(validateEmail(e.target.value));
										handleInput(e);
									}}
									onChange={(e) => {
										if (e.target.value === "") setIsEmailValid(false);
									}}
									type="email"
									name="email"
									id="email"
									required
									className={
										email
											? `${completedFieldClass} animated-bg ${
													isEmailValid ? "" : "invalid"
											  }`
											: ""
									}
								/>
								{isEmailValid && <ConfirmedSvg key="email" />}
							</div>
						</div>
						<div className="form-field">
							<label htmlFor="meddelande">Message:</label>
							<div className="input-container">
								<textarea
									onChange={(e) => {
										if (e.target.value === "") setMessage("");
										handleInput(e);
									}}
									name="meddelande"
									id="meddelande"
									required
									className={
										message ? `${completedFieldClass} animated-bg` : ""
									}
								/>
								{message && <ConfirmedSvg key="message" />}
							</div>
						</div>
						<motion.button onClick={handleSubmit} className="primary-button">
							Send
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.article>
	);
};

export default ContactForm;
