import React, { useContext, useState } from "react";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";

const Heading = styled.h1`
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 1rem 0;
	color: #d6d6d6;
`;

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

	@media (max-width: 1224px) {
		padding: 0 1.5rem;
	}

`;


const UploadButton = styled.button`
	display: flex;
	align-items: center;
	margin: 0 0 4rem 0;
	padding: 1rem 1.75rem;
	border-radius: 20px;s
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	border: 3px solid #69ff80;
    background: #1b2c30;
	color: #69ff80;
`;

const StyledPublishIcon = styled(PublishIcon)`
	margin: 0 0.5rem 0 0;
`;

const TextInput = styled.input`
	padding: 0.75rem 1rem;
	border-radius: 10px;
	border: 3px solid #249bd4;
	background: #def7ff;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
	width: 60%;
	margin-top:10vh;
`;

const TextInputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 40%;
	@media (max-width: 1224px) {
		width: 100%;
	}
`;

const TextLabel = styled.label`
	padding: 0 1rem 0 0;
	font-size: 1.25rem;
	font-weight: 700;
	color: #d6d6d6;
	margin-bottom: 0;
	margin-top:10vh;
`;

const TextWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const Upload = () => {
	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token } = useContext(UserContext);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [loading,setLoading] = useState(false);

	const getResults = (e) => {
		e.preventDefault();
		setLoading(true);
		Axios.post(
			`${nodeApiUrl}teacher/notices`,
			{
				title,
				description: desc,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				setLoading(false);
				window.alert(res.data.message);
			})
			.catch((err) => {
				window.alert("Network error");
				setLoading(false);
				console.log(err);
			});
	};
	
	return (
		<Container>
			<Heading>Upload notices</Heading>
			
			<TextWrapper>
				
				<TextInputContainer>
					<TextLabel>Title</TextLabel>
					<TextInput
						type="text"
						value={title}
						onChange={(e) => {
							e.preventDefault();
							setTitle(e.target.value);
						}}
					/>
				</TextInputContainer>
				
				<TextInputContainer>
					<TextLabel>Description</TextLabel>
					<TextInput
						type="text"
						value={desc}
						onChange={(e) => {
							e.preventDefault();
							setDesc(e.target.value);
						}}
					/>
				</TextInputContainer>
				
			</TextWrapper>

			<UploadButton onClick={(e) => getResults(e)}>
				<StyledPublishIcon />
				{loading ? "Uploading notice.." : "Upload"}
			</UploadButton>

		</Container>
	);
};

export default Upload;
