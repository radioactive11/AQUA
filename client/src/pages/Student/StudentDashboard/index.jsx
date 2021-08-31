import React, { useContext, useState } from "react";
import styled from "styled-components";
import StudentDashboardContent from "../StudentDashboardContent";
import Quiz from "../Quiz";
import Upload from "../Upload";
// import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from "@material-ui/icons/Notifications";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch, Route, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import UserContext from "../../../contexts/User/UserContext";

const Wrapper = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	height: 95vh;
	width: 90vw;
	background: white;
	font-family: "Open Sans",sans-serif !important;
	font-size: 0.75rem !important;
	color: #A4B4CB;
	border-radius: 0.5rem;
	overflow:hidden;
	@media (max-width: 1224px){
		height: 100vh;
		width: 100vw;
		border-radius: 0;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background: #1E1D2B;

	.title {
		flex:1;
		display: flex;
		align-items:center;
		justify-content:center;
		border-bottom: 1px solid #2E3446;
		border-right: 1px solid #2E3446;
		@media (max-width: 1224px){
			border-right: none;
		}
	}

	.navbar {
		flex: 4;
		display: flex;
		align-items:center;
		justify-content:space-between;
		border-bottom: 1px solid #2E3446;
	}

	.sidepanel {
		flex: 1;
		display: flex;
		align-items:center;
		justify-content:flex-start;
		flex-direction: column;
		flex-wrap: wrap;
		position:relative;
		background:#252736;
		border-right: 1px solid #2E3446;
		transition: all 0.2s ease-in-out;
		.active{
			color: #4d8fd9;
			background: #37384a;
		}
		@media (max-width: 1224px){
			position: absolute;
			flex-wrap:nowrap;
			left:0;
			background: #252736;
			height:100%;
			min-width:50%;
			box-shadow:  0px 20px 10px #b4b8c794;
		}
	}

	.content {
		flex:4;
		height: 100%;
	}

	.closed{
		// display:none;
		left:-500px;
		box-shadow:  none;
	}
`;

// const StyledInput = styled.input`
// 	position: relative;
// 	font-size:1rem;
// 	box-sizing: border-box;
// 	display: block;
// 	width: 100%;
// 	border: none;
// 	padding: 1rem;
// 	background: transparent;
// 	border-radius: 10px;
// 	&::placeholder{
// 		color: #c3c3c3;
// 	}
// 	&:hover{
// 		border: none;
// 		outline: none;
// 	}
// 	&:focus{
// 		border: none;
// 		outline: none;
// 	}
// `

// const SearchGroup = styled.div`
// 	display:flex;
// 	align-items:center;
// 	justify-content:center;
// 	width: 60%;
// 	margin-left: 1.5rem;
// 	@media only screen and (max-width: 1000px) {
// 		width: 40%;
// 	}
// `

// const StyledSearchIcon = styled(SearchIcon)`
// 	color:#c3c3c3;
// 	font-size: 1.5rem !important;
// `

const IconGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledNotifIcon = styled(NotificationsIcon)`
	color: #c3c3c3;
	font-size: 1.5rem !important;
	cursor: pointer;
	transition: color 0.2s ease;
	&:hover {
		color: gray;
	}
	&:focus {
		color: gray;
	}
`;

const StyledCalenderIcon = styled(CalendarTodayIcon)`
	color: #c3c3c3;
	font-size: 1.5rem !important;
	cursor: pointer;
	transition: color 0.2s ease;
	&:hover {
		color: gray;
	}
	&:focus {
		color: gray;
	}
`;

const StyledBadge = styled(Badge)`
	margin: 0 0.5rem;
`;

const DropDown = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	color: #c3c3c3;
`;

const DropDownText = styled.h2`
	color: #c3c3c3;
`;

const StyledExpandIcon = styled(ExpandMoreIcon)`
	font-size: 2rem !important;
	cursor: pointer;
`;

const RightSide = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: auto;
	padding: 1rem 0;
`;

const TopContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const BottomContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	overflow: hidden;
	height: 100%;
`;

const DropDownGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1.5rem;
`;

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<>
		{/* <a
		href=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		>
		{children}
    &#x25bc;
	</a> */}
		<DropDown
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}>
			{children}
		</DropDown>
	</>
));

const SidePanelMember = styled(NavLink)`
	display: flex;
	align-items: center;
	width: 90%;
	background: transparent;
	border-radius: 5px;
	margin: 1rem;
	padding: 0.5rem;
	text-transform: capitalize;
	font-weight:bold;
	font-size: 1rem;
	color:#A4B4CB;
	transition: all 0.2s ease;
	&:hover{
		cursor:pointer;
		color: #0A68D3;
		background: #2F3042;
		text-decoration:none;
	}
	@media (max-width: 1224px){
		margin:1rem 2rem;
	}
`

const StyledQuestionAnswerIcon = styled(QuestionAnswerIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledDashboardIcon = styled(DashboardIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledUploadIcon = styled(CloudUploadIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StudentDashboard = () => {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
	// eslint-disable-next-line
	const { logout, user } = useContext(UserContext);
	const { name } = user;
	return (
		<Wrapper>
			<Container>
				<TopContainer>
					<div className="title">
						{isTabletOrMobile ? (
							<MenuIcon
								onClick={() =>
									setIsSidepanelOpen(!isSidepanelOpen)
								}
							/>
						) : (
							<h2>Student</h2>
						)}
					</div>
					<div className="navbar">
						<RightSide>
							<IconGroup>
								<StyledBadge variant="dot" color="secondary">
									<StyledNotifIcon />
								</StyledBadge>
								<StyledBadge variant="dot" color="secondary">
									<StyledCalenderIcon />
								</StyledBadge>
							</IconGroup>
							<Dropdown>
								<DropDownGroup>
									<DropDownText>{name}</DropDownText>
									<Dropdown.Toggle
										as={CustomToggle}
										id="dropdown-custom-components">
										<StyledExpandIcon />
									</Dropdown.Toggle>
								</DropDownGroup>
								<Dropdown.Menu>
									<Dropdown.Item eventKey="1">
										Email
									</Dropdown.Item>
									<Dropdown.Item eventKey="2">
										Phone
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										eventKey="4"
										onClick={logout}>
										Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</RightSide>
					</div>
				</TopContainer>
				<BottomContainer>
					<div
						className={
							isTabletOrMobile
								? `sidepanel ${
										!isSidepanelOpen ? `closed` : ``
								  }`
								: `sidepanel`
						}>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/student">
							<StyledDashboardIcon />
							dashboard
						</SidePanelMember>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/student/quiz">
							<StyledQuestionAnswerIcon />
							quiz
						</SidePanelMember>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/student/upload">
							<StyledUploadIcon />
							Upload
						</SidePanelMember>
					</div>
					<div className="content">
						<Switch>
							<Route path="/student/quiz">
								<Quiz />
							</Route>
							<Route path="/student/upload">
								<Upload />
							</Route>
							<Route path="/student/">
								<StudentDashboardContent />
							</Route>
						</Switch>
					</div>
				</BottomContainer>
			</Container>
		</Wrapper>
	);
};

export default StudentDashboard;
