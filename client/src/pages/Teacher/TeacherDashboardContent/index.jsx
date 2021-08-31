import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AssignmentCard from "../../../components/AssignmentCard";
import Notices from "../../../components/Notices";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: inherit;
	}

	&::-webkit-scrollbar {
		width: 6px;
		background-color: inherit;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		// background-color: #9295a0;
		background-color: #c3c3c3;
	}
`;

const AssignmentsContainer = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const NoticesContainer = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 0 2rem;
	color: ${(props) => props.message ? "green" : "#d6d6d6"};
	text-align: ${(props) => props.message ? "center" : ""};
`;

const Flexbreak = styled.div`
	flex-basis: 100%;
	height: 0;
`;

const LoaderStyles = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	& div {
		position: absolute;
		border: 4px solid #fff;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	& div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
`;

const LoadingContainer = styled.div`
	display:grid;
	place-items:center;
	height:100%;
`;

const Loader = () => {
	return (
		<LoadingContainer>
			<LoaderStyles>
				<div></div>
				<div></div>
			</LoaderStyles>
		</LoadingContainer>
	)
};

const AssignmentsNotices = () => {
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [teacher, setTeacher] = useState({});
	const [assignments, setAssignments] = useState([]);
	const [notices, setNotices] = useState([]);

	let ongoingAssignments = [];
	let completedAssignments = [];

	if (assignments) {
		assignments.forEach((assignment) => {
			let date = new Date(assignment.deadline);
			if (date > Date.now()) {
				ongoingAssignments.push(assignment);
			} else {
				completedAssignments.push(assignment);
			}
		});
	}

	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token } = useContext(UserContext);

	useEffect(() => {
		Axios.get(`${nodeApiUrl}teacher/getTeacher`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((res) => {
			setLoading(false);
			setTeacher(res.data.response);
			// console.log(res.data);
			setAssignments(res.data.response.assignments);
			setNotices(res.data.response.notices);
		}).catch((err) => {
			window.alert("Network error");
		});
	}, [nodeApiUrl, token]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<AssignmentsContainer>
						<Heading>Ongoing Assignments</Heading>
						<Flexbreak />
						{
							ongoingAssignments.length > 0 ? (
								<AssignmentCard click={true} assignments={ongoingAssignments} />
							) : (
								<Heading message={true}>No ongoing assignments! </Heading>						
							)
						}
					</AssignmentsContainer>
					<AssignmentsContainer>
						<Heading>Completed Assignments</Heading>
						<Flexbreak />
						{
							completedAssignments.length > 0 ? (
								<AssignmentCard assignments={completedAssignments} />
							) : (
								<Heading message={true}>No deadlines reached ! </Heading>
							)
						}
					</AssignmentsContainer>
					<NoticesContainer>
						<Heading>Notices</Heading>
						<Flexbreak />
						{
							notices.length > 0 ? (
								<Notices notices={notices} />
							) : (
								<Heading message={true}>No notices have been uploaded yet! </Heading>
							)
						}
					</NoticesContainer>
				</>
			)}
		</>
	);
};

const TeacherDashboardContent = () => {
	return (
		<Container>
			<AssignmentsNotices />
		</Container>
	);
};

export default TeacherDashboardContent;
