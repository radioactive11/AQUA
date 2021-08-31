import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import PlagiarismIcon from "../../svg/PlagiarismIcon";
import QuizIcon from "../../svg/QuizIcon";
import AssignmentIcon from "../../svg/AssignmentIcon";
import UserContext from "../../contexts/User/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

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
	@media (max-width: 1224px) {
		width: 100%;
	}
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 2.75em !important;
	color: black;
	font-weight: 400;
	@media (max-width: 1224px) {
		text-align: center;
	}
`;

const BrandHeading = styled(Heading)`
	font-size: 1.5em !important;
	font-weight: 700;
	margin-right: auto;
	margin: 0 2rem;
	@media (max-width: 1224px) {
		flex: none;
		margin: 0 auto 0 2rem;
	}
`;

const StyledLink = styled.a`
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
`;

const Button = styled.button`
	border-radius: 8px;
	padding: 0.75rem 2rem;
	font-weight: 500;
	transition: all 0.3s ease-in-out;
	margin: 4rem 1rem;
	user-select: none;
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	margin: 6rem 0 0;
`;

const SectionOne = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
`;

const ButtonGroup = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	@media (max-width: 1224px) {
		flex-direction: column;
		margin: 3rem 0 0;
	}
`;

const PrimaryButton = styled(Button)`
	background: #0284fe;
	border: none;
	color: white;
	&:hover {
		background: #4ba7fe;
	}
	@media (max-width: 1224px) {
		margin: 2rem 1rem 1rem;
		width: 50vw;
		padding: 0.75rem 1.25rem;
	}
`;

const SecondaryButton = styled(Button)`
	border: 1px solid #e1e4e8;
	background: rgb(0, 0, 0, 0);
	color: #555256;
	&:hover {
		background: #f7f8f9;
	}
	@media (max-width: 1224px) {
		margin: 1rem;
		width: 50vw;
		padding: 0.75rem 1.25rem;
	}
`;

const SectionTwo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	width: 100%;
`;

const SectionTwoHeading = styled.div`
	padding: 0 0.5rem 1rem;
	font-size: 2.75em !important;
	font-weight: 400;
	color: #212121;
	// align-self:flex-start;
`;

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	padding: 2rem 2rem;
	border: 1px solid #f7f8f9;
	border-radius: 8px;
	box-shadow: 0 0 1px 0 rgb(8 11 14 / 6%), 0 6px 6px -1px rgb(8 11 14 / 10%);
	margin: 1rem 1rem 0;
`;

const CardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: 1fr;
	grid-column-gap: 5px;
	max-width: 95%;
	margin: 4rem auto;
	@media (max-width: 1224px) {
		display: flex;
		flex-direction: column;
	}
`;

const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	font-weight: 500;
	font-size: 1.4rem;
	width: 100%;
`;

const Text = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0 0;
`;

const CardBody = styled.p`
	flex: 1;
	display: flex;
	align-items: flex-start;
	font-size: 1rem;
	-webkit-font-smoothing: antialiased;
	font-weight: 400;
	letter-spacing: -0.25px;
	color: #505256;
	text-align: left;
	padding: 2rem 0 0.5rem;
`;

const HeadingText = styled.p`
	width: 50%;
	font-weight: 400;
	font-size: 1.1rem;
	letter-spacing: -0.25px;
	color: #505256;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	margin: 3rem 0 0;
	@media (max-width: 1224px) {
		width: 80%;
	}
`;

const MainHeading = styled(Heading)`
	font-size: 5rem !important;
	font-weight: 700;
	padding: 0 0 3rem;
	-webkit-font-smoothing: antialiased;
`;

const Homepage = () => {

	const { token } = useContext(UserContext);

	const { user, isAuthenticated } = useAuth0();

	let name;

	if (user) {
		name = user.name;
	}

	console.log(name);

	let history = useHistory();
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
							<LinkContainer>
								<StyledLink
									onClick={() => history.push("/login")}>
									Login
								</StyledLink>
							</LinkContainer>
							<LinkContainer>
								<StyledLink
									onClick={() => history.push("/signup")}>
									Signup
								</StyledLink>
							</LinkContainer>
						</>
					)}
				</Navbar>
				<MainContent>
					<SectionOne>
						<MainHeading>Aqua</MainHeading>
						<Heading>Digital Education Made Simple</Heading>
						<HeadingText>
							AQUA is a service to connect students and teachers.
							Developed to improve and manage continuos evaluation
							of students by academic institutions, it integrates
							easily with schools and colleges
						</HeadingText>
						<ButtonGroup>
							<PrimaryButton
								onClick={(e) => {
									e.preventDefault();
									history.push("/signup");
								}}>
								Get Started Now
							</PrimaryButton>
							<SecondaryButton
								onClick={(e) => {
									e.preventDefault();
									history.push("/login");
								}}>
								Already Registered?
							</SecondaryButton>
						</ButtonGroup>
					</SectionOne>
					<SectionTwo>
						<SectionTwoHeading>Features</SectionTwoHeading>
						<CardsContainer>
							<Card>
								<CardHeader>
									<QuizIcon />
									<Text>Quiz Generation</Text>
								</CardHeader>
								<CardBody>
									This feature will allow the Teacher to
									generate a list of questions from a single
									word (i.e Wikipedia Articles) or from a
									specific article which they can upload.This
									helps in saving precious time for a
									important or frivoulous quiz.
								</CardBody>
							</Card>
							<Card>
								<CardHeader>
									<PlagiarismIcon />
									<Text>Plagiarism Detection</Text>
								</CardHeader>
								<CardBody>
									This feature will allow the Teacher to check
									for plagiarism between students for a
									subjective assignment. Furthermore, this
									will reduce confusion and the time can be
									saved here and teacher can recheck highly
									plagiarised assignments.
								</CardBody>
							</Card>
							<Card>
								<CardHeader>
									<AssignmentIcon />
									<Text>Assignments Portal</Text>
								</CardHeader>
								<CardBody>
									This will allow the students to upload their
									assignments and teachers to see them. This
									will help them to asses students on how they
									have performed and can reviewed in the
									future.
								</CardBody>
							</Card>
						</CardsContainer>
					</SectionTwo>
				</MainContent>
			</Container>
		</Wrapper>
	);
};

export default Homepage;
