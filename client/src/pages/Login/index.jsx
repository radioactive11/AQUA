import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LoginIcon from "../../svg/LoginIcon";
import EmailIcon from "../../svg/EmailIcon";
import PasswordIcon from "../../svg/PasswordIcon";
import Axios from "axios";
import UserContext from "../../contexts/User/UserContext";
import LoginButton from "../../elements/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../elements/LogoutButton";

const Wrapper = styled.section`
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #ff9d00;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fd8b19' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23f97927' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23f26832' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23ea583a' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23df4842' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23d33948' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23c42c4d' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23b52051' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a41654' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23920f55' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%237f0c55' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%236c0b54' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23590b51' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23450b4c' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23310b46' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%231d0a3e' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230a0236' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
	background-attachment: fixed;
	background-size: cover;
`;

const Container = styled.div`
	font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
		"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
		"Noto Color Emoji";
	background: white;
	min-height: 100vh;
	width: 75%;
	font-weight: 500;
	letter-spacing: -0.5px;
	@media (max-width: 1200px) {
		width: 100%;
	}
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 2.75em !important;
	color: black;
	font-weight: 400;
	@media (max-width: 1200px) {
		text-align: center;
	}
`;

const BrandHeading = styled(Heading)`
	font-size: 1.5em !important;
	font-weight: 700;
	margin-right: auto;
	margin: 0 2rem;
	@media (max-width: 1200px) {
		flex: none;
		margin: 0 auto 0 2rem;
	}
`;

const StyledLink = styled.a`
	cursor: pointer;
	cursor: pointer;
	color: #505256;
	transition: all 0.3s ease-in-out;
	&:hover {
		text-decoration: none;
		color: black;
	}
`;

const StyledBrandLink = styled(StyledLink)`
	color: black;
`;

const LinkContainer = styled.div`
	padding: 0.5rem 1rem;
	border-radius: 8px;
	line-height: 24px;
	margin: 1rem 0.5rem;
	transition: all 0.3s ease-in-out;
	cursor: pointer;
	&:hover {
		background: #f1f2f4;
	}
	&:active,
	&:focus {
		background: #e1e4e8;
		color: black;
	}
`;

const Navbar = styled.nav`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	position: fixed;
	top: 0;
	width: inherit;
	background: white;
	@media (max-width: 1200px) {
		width: 100%;
	}
`;

const Button = styled.button`
	border-radius: 8px;
	padding: 0.75rem 2rem;
	font-weight: 500;
	transition: all 0.3s ease-in-out;
	margin: 4rem 0 0;
	user-select: none;
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 100%;
	@media (max-width: 1224px) {
		justify-content: center;
		width: inherit;
	}
`;

const SectionOne = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 60%;
	height: 90%;
	@media (max-width: 1224px) {
		width: 100%;
	}
`;

const PrimaryButton = styled(Button)`
	background: #eef7ff;
	border: none;
	color: #0284fe;
	border-radius: 1000rem;
	height: 3rem;
	width: 100%;
	margin: 0 0 2rem 0;
	&:hover {
		background: #dceeff;
	}
	@media (max-width: 1224px) {
		margin: 2rem 1rem 1rem;
		width: 50vw;
		padding: 0.75rem 1.25rem;
	}
`;

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	padding: 2rem 2rem;
	border: 1px solid #f7f8f9;
	border-radius: 12px;
	box-shadow: 0 0 1px 0 rgb(8 11 14 / 6%), 0 16px 16px -1px rgb(8 11 14 / 10%);
	margin: 1rem 1rem 0;
	height: 100%;
`;

const CardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 75%;
	height: 90%;
	margin: 2rem auto;
	@media (max-width: 1224px) {
		width: inherit;
		margin: 2rem;
	}
`;

const CardHeader = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 1.4rem;
	width: 100%;
	white-space: pre;
`;

const Text = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0 0;
	font-size: 1.5rem;
	white-space: break-spaces;
	.switch {
		position: relative;
		display: inline-block;
		width: 36px;
		height: 24px;
		margin: 0 1rem;
		margin-right: auto;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 16px;
		width: 16px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #2196f3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(12px);
		-ms-transform: translateX(12px);
		transform: translateX(12px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
`;

const CardBody = styled.div`
	flex: 1;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	font-size: 1rem;
	-webkit-font-smoothing: antialiased;
	font-weight: 400;
	letter-spacing: -0.25px;
	color: #505256;
	text-align: left;
	padding: 0 0 2rem;
	width: 100%;
`;
const CardLink = styled.a`
	transition: all 0.2s ease-in-out;
	font-weight: 500;
	&:hover {
		text-decoration: none;
	}
`;

const Subtext = styled(Text)`
	display: flex;
	font-size: 0.8rem;
	-webkit-font-smoothing: antialiased;
	font-weight: 400;
	letter-spacing: -0.25px;
	color: #505256;
	text-align: left;
	padding: 0 0 0.5rem;
	color: #a7aab0;
`;

const Input = styled.input`
	border-radius: 1000rem;
	padding: 1px 2rem 1px 1rem;
	margin: 0.5rem 0;
	line-height: 1.5rem;
	width: 100%;
	height: 2.5rem;
	border: 1px solid #e1e4e8;
	transition: all 0.3s ease-in-out;
	color: #a7aab0;
	&::placeholder {
		font-weight: 600;
		color: #a7aab0;
	}
	&:focus,
	&:active,
	&:hover {
		outline: none;
	}
	&:focus {
		border: 1px solid #3799f6;
	}
`;

const InputContainer = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const Homepage = () => {
	const history = useHistory();
	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	// eslint-disable-next-line
	const { token, login, user } = useContext(UserContext);

	const { isAuthenticated } = useAuth0();

	const [isTeacher, setIsTeacher] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [, setErrors] = useState([]);

	const loginTeacher = () => {
		Axios.post(`${nodeApiUrl}teacher/signin`, {
			email,
			password,
		})
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("user", JSON.stringify(res.data.teacher));
				localStorage.setItem("token", res.data.token);

				const { token, teacher } = res.data;

				login({
					token,
					user: teacher,
				});

				history.push("/teacher");
			})
			.catch((err) => {
				//Todo instead add Toast
				if (Array.isArray(err.response.data.error)) {
					setErrors(err.response.data.error);
				} else {
					setErrors([{ msg: err.response.data.error }]);
				}
			});
	};

	const loginStudent = () => {
		Axios.post(`${nodeApiUrl}student/signin`, {
			email,
			password,
		})
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("user", JSON.stringify(res.data.student));
				localStorage.setItem("token", res.data.token);
				const { token, student } = res.data;
				login({
					token,
					user: student,
				});

				history.push("/student");
			})
			.catch((err) => {
				//Todo instead add Toast
				if (Array.isArray(err.response.data.error)) {
					setErrors(err.response.data.error);
				} else {
					setErrors([{ msg: err.response.data.erro }]);
				}
			});
	};

	return (
		<Wrapper>
			<Container>
				<Navbar>
					<BrandHeading>
						<StyledBrandLink onClick={() => history.push("/")}>
							Aqua
						</StyledBrandLink>
					</BrandHeading>
					{isAuthenticated ? (
						<>
							<LinkContainer
								onClick={() =>
									history.push(
										`/${user.type === "teacher"
											? `teacher`
											: `student`
										}`
									)
								}>
								<StyledLink>Dashboard</StyledLink>
							</LinkContainer>
							<LinkContainer>
								<StyledLink
									onClick={() => history.push("/profile")}>
									Profile
								</StyledLink>
							</LinkContainer>
						</>
					) : (
						<>
							<LinkContainer
								onClick={() => history.push("/login")}>
								<StyledLink>Login</StyledLink>
							</LinkContainer>
							<LinkContainer
								onClick={() => history.push("/signup")}>
								<StyledLink>Signup</StyledLink>
							</LinkContainer>
						</>
					)}
				</Navbar>
				<MainContent>
					<SectionOne>
						<CardsContainer>
							<Card>
								<CardHeader>
									<LoginIcon />
									<Text>
										Login into your account (
										{isTeacher ? `Teacher` : `Student`})
										<label className="switch">
											<input
												type="checkbox"
												onClick={(e) => {
													setIsTeacher(!isTeacher);
												}}
											/>
											<span className="slider round"></span>
										</label>
									</Text>
									<Subtext>
										Don't have an account yet?{" "}
										<CardLink
											onClick={() =>
												history.push("/signup")
											}>
											Register here
										</CardLink>
									</Subtext>
								</CardHeader>
								<CardBody>
									<InputContainer>
										<EmailIcon />
										<Input
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											value={email}
											type="email"
											placeholder="johndoe@gmail.com"
										/>
									</InputContainer>
									<InputContainer>
										<PasswordIcon />
										<Input
											onChange={(e) =>
												setPassword(e.target.value)
											}
											value={password}
											type="password"
											placeholder="Password"
										/>
									</InputContainer>
								</CardBody>
								{/* <PrimaryButton
									onClick={() => {
										isTeacher
											? loginTeacher()
											: loginStudent();
									}}>
									Login
								</PrimaryButton> */}
								{!isAuthenticated ? <LoginButton /> : <LogoutButton />}
							</Card>
						</CardsContainer>
					</SectionOne>
				</MainContent>
			</Container>
		</Wrapper>
	);
};

export default Homepage;
