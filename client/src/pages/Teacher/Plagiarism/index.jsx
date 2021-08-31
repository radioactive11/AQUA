import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DescriptionIcon from "@material-ui/icons/Description";
import ProgressBar from "react-bootstrap/ProgressBar";
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

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	text-transform: capitalize;
	width: 100%;
	height: 100%;
	margin: 2rem 0;
	@media (max-width: 1224px) {
		flex-direction: column;
	}
	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px dashed #65d862;
		padding: 2rem;
		margin: 2rem;
		width: 90%;
		height: 40%;
		border-radius: 20px;
		background: #f3faf3;
		outline: none;
		cursor: pointer;
		box-shadow: 9px 9px 23px #e3e7ec, -9px -9px 23px #e3e7ec;
		@media (max-width: 1224px) {
			height: 20%;
		}
	}
`;

const InputLabel = styled.h1`
	color: #41454a;
	font-size: 1.5rem !important;
	font-weight: 700;
`;

const TextInput = styled.input`
	padding: 0.75rem 1rem;
	margin: 2rem;
	border-radius: 10px;
	border: 3px solid #249bd4;
	background: #def7ff;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
`;

const SubmitBtn = styled.button`
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	border-radius: 10px;
	border: 3px solid #f4aa1f;
	background: #fdfaf2;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	color: #f4aa1f;
	outline: none;
`;

const StyledFileCopyIcon = styled(FileCopyIcon)`
	margin: 0 0.5rem 0 0;
`;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AssignmentsContainer = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 0 2rem;
	color: #41454a;
`;

const Card = styled.div`
	flex: 1 1 0;
	font-size: 1rem;
	font-weight: bold;
	min-width: 30vw;
	width: 90%;
	background: white;
	margin: 2rem;
	padding: 2rem;
	border-radius: 10px;
	user-select: none;
	box-shadow: 9px 9px 23px #e3e7ec, -9px -9px 23px #e3e7ec;
	display: flex;
	flex-direction: column;
	cursor: pointer;
	@media (max-width: 1224px) {
		max-width: 80vw;
	}
`;

const Flexbreak = styled.div`
	flex-basis: 100%;
	height: 0;
`;
const Content = styled.div`
	color: lightgray;
`;

const Description = styled.div`
	display: flex;
	align-items: center;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	${(props) => {
		if (props.theme === "primary") {
			return `
				color: #F4AA1F !important;
				background: #FFF3E8 !important;
			`;
		} else {
			return `
				color: #65D862;
				background: #EEFFED;
			`;
		}
	}}
	padding: 0 1rem;
`;

const DescriptionText = styled.a`
	cursor: pointer;
	text-decoration: underline;
	margin: 1rem 0;
	padding: 0 1rem;
	transition: all 0.2s ease;
	color: inherit !important;
	&:hover {
		${(props) => {
		if (props.theme === "primary") {
			return `
				color: #DF9B1C !important;;
			`;
		} else {
			return `
				color: #51AF4F !important;
			`;
		}
	}}
	}
`;

const AssignedBy = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0 0 10px 10px;
	color: #249bd4;
	background: #def7ff;
	padding: 0 1rem;
`;

const AssignedByText = styled.p`
	margin: 1rem 0;
	font-weight: normal;
	padding: 0 1rem;
	transition: all 0.2s ease;
	&:hover {
	}
`;

const StyledProgressBar = styled(ProgressBar)`
	width: 100%;
	margin: 0 1rem;
	background: white !important;
`;

const ProgressBarContainer = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0;
	background: #eff0f4 !important;
	padding: 1rem 0;
`;

const Select = styled.select`
	padding: 0.75rem 1rem;
	margin: 2rem;
	border-radius: 10px;
	border: 3px solid #249bd4;
	background: #def7ff;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
`;

const Option = styled.option`
	padding: 0.75rem 1rem;
	margin: 2rem;
	background: white;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
	outline: none;
	border: 0px;
`;

const ProgressBarLabel = styled.span`
	margin-left: 10vw;
	display: block;
	color: ${(props) => (props.final > 0 ? `#28a745` : `#dc3545`)};
`;

const Plagiarism = () => {
	const [threshold, setThreshold] = useState("");
	const [result, setResult] = useState([]);
	const [options, setOptions] = useState(null);
	const [selectedValue, setSelectedValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(false);

	const apiUrl = process.env.REACT_APP_FLASK_API_URL;

	const getResults = (e) => {
		console.log("lol");
		e.preventDefault();
		setLoading(true);
		console.log(selectedValue, "Select")
		const splittedSelectedValue = selectedValue.split(" ");

		console.log(splittedSelectedValue[0], splittedSelectedValue[1]);

		Axios.post(`${apiUrl}/plag`, {
			subject: splittedSelectedValue[0],
			topic: splittedSelectedValue[1],
		})
			.then((res) => {
				setLoading(false);
				console.log(res.data, "plag data");
				setResult(res.data);
			})
			.catch((err) => {
				window.alert("Network error");
				setLoading(false);
				console.log(err);
			});
	};

	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token } = useContext(UserContext);

	useEffect(() => {
		//Getting assignments for particular teacher
		setFetching(true);
		Axios.get(`${nodeApiUrl}teacher/getTeacher`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				setFetching(false);
				setOptions(res.data.response.assignments);
			})
			.catch((err) => {
				window.alert("Network error");
				setFetching(false);
				console.log(err, "Err");
			});
	}, [nodeApiUrl, token]);

	return (
		<Container>
			{result.length > 0 ? (
				<AssignmentsContainer>
					<Heading>Plagiarism Checker</Heading>
					<Flexbreak />
					{result.map((item, index) => {
						return item.results.map(({ name, sim_score }) => {
							console.log(name, "name");
							let final = (
								parseInt(threshold) - parseInt(sim_score)
							).toString();
							return (
								<Card key={index + name}>
									<Content>
										<Description theme="primary">
											<DescriptionIcon />
											<DescriptionText theme="primary">
												{item.original}
											</DescriptionText>
										</Description>
										<ProgressBarLabel final={final}>
											{final > 0
												? `Test passed by ${final} %`
												: `Test failed by ${-final} %`}
										</ProgressBarLabel>
										<ProgressBarContainer>
											{parseFloat(threshold) <
												parseFloat(sim_score) ? (
												<>
													<StyledProgressBar
														animated
														now={parseFloat(
															sim_score
														).toString()}
														variant="danger"
														key={1}
													/>
												</>
											) : (
												<StyledProgressBar
													animated
													now={parseFloat(
														sim_score
													).toString()}
													variant="success"
												/>
											)}
										</ProgressBarContainer>
										<AssignedBy>
											<DescriptionIcon />
											<AssignedByText>
												{name}
											</AssignedByText>
										</AssignedBy>
									</Content>
								</Card>
							);
						});
					})}
				</AssignmentsContainer>
			) : (
				<InputContainer>
					<InputWrapper>
						<InputLabel>Enter Threshold percentage</InputLabel>
						<TextInput
							type="text"
							value={threshold}
							onChange={(e) => {
								e.preventDefault();
								setThreshold(e.target.value);
							}}
						/>
					</InputWrapper>

					<InputWrapper>
						<InputLabel>
							{fetching
								? "Fetching Assignments"
								: "Select Assignment"}
						</InputLabel>
						<Select
							onChange={(e) => {
								setSelectedValue(e.target.value);
							}}
							value={selectedValue}>
							{options
								? options.map((item) => (
									<Option
										key={JSON.stringify(item)}
										value={`${item.title} ${item.assignmentGiven
											.split("/")
											.pop()
											.split(".")[0]
											}`}>
										{`${item.title} ${item.assignmentGiven
											.split("/")
											.pop()
											.split(".")[0]
											}`}
									</Option>
								))
								: ""}
						</Select>
					</InputWrapper>
					<SubmitBtn
						onClick={(e) => {
							getResults(e);
						}}>
						<StyledFileCopyIcon />
						{loading ? "Processing" : "check"}
					</SubmitBtn>
				</InputContainer>
			)}
		</Container>
	);
};

export default Plagiarism;
