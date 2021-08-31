import React, { useState } from 'react'
import styled from "styled-components";
import Axios from "axios";

const Container = styled.div`
	display:flex;
	flex-direction:column;
	align-items: center;
	height:100%;
	overflow:auto;
	&::-webkit-scrollbar-track{
		border-radius: 10px;
		background-color: inherit;
	}

	&::-webkit-scrollbar{
		width: 6px;
		background-color: inherit;
	}

	&::-webkit-scrollbar-thumb{
		border-radius: 10px;
		// background-color: #9295a0;
		background-color: #c3c3c3;
	}
`

const InputContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content:center;
	text-transform: capitalize;
	width:100%;
	height: 100%;
	margin: 1rem 0 0 0;
	@media (max-width: 1224px){
		flex-direction:column;
	}

`

const InputLabel = styled.h1`
	color: #d6d6d6;
	font-size: 1.5rem !important;
	font-weight: 700;
`

const TextInput = styled.input`
	padding: 0.75rem 1rem;
	margin: 2rem;
	border-radius:10px;
	border: 3px solid #249BD4;
	background: #DEF7FF;
	outline:none;
	font-size:1rem;
	font-weight: 700;
	color: #41454a;
`

const SubmitBtn = styled.button`
	display:flex;
	align-items:center;
	padding: 0.75rem 1rem;
	border-radius:10px;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	border: 3px solid #69ff80;
    background: #1b2c30;
	color: #69ff80;
	outline:none;
`

const QuestionsWrapper = styled.div`
	display: flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	color: #58616d;
	font-size: 1rem;
	font-weight: 700;
	width: 100%;
	margin: 2rem 0;
`

const QuestionsContainer = styled.div`
	border: 2px solid #30c226;
	border-radius: 10px;
	padding: 0.75rem 1rem;
	margin: 0 0 1rem 0;
	background: #f3fff2;
	width: 50%;
`

const Question = styled.div`
	&:before{
		content:"Question: ";
		color: #0090ff;
	}
`

const Answer = styled.div`
	&:before{
		content:"Answer: ";
		color: #FF6F00;
	}
`

const Heading = styled.h1`
	color: #41454a;
	font-size: 2rem !important;
	font-weight: 700;
	margin: 0 0 1rem 0 !important;
`

const Quiz = () => {
	const [question, setQuestion] = useState("");
	const [questionsIsVisible, setQuestionsIsVisible] = useState(false);
	const [qna, setQna] = useState([]);
	const [loading, setIsLoading] = useState(false);

	const apiUrl = process.env.REACT_APP_FLASK_API_URL;

	const submit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		Axios.post(`${apiUrl}/quiz`, {
			keyword: question
		}).then((res) => {
			setQuestionsIsVisible(!questionsIsVisible);
			setQna(res.data);
			setIsLoading(false);
			// console.log(res.data,"data");
		}).catch((err) => {
			window.alert("Network error");
			setIsLoading(false);
			console.log(err);
		})
	}

	return (
		<Container>
			{questionsIsVisible
				? (
					<QuestionsWrapper>
						<Heading>Quiz</Heading>
						{qna.map((item, i) => (
							<QuestionsContainer key={i}>
								<Question>
									{item.question}
								</Question>
								<Answer>
									{item.answer}
								</Answer>
							</QuestionsContainer>
						))}

						<SubmitBtn onClick={e => setQuestionsIsVisible(!questionsIsVisible)}>change</SubmitBtn>
					</QuestionsWrapper>
				)
				: (
					<InputContainer>
						<InputLabel>
							Enter Topic
				</InputLabel>
						<TextInput type="text" value={question} onChange={e => {
							e.preventDefault();
							setQuestion(e.target.value);
						}} />
						<SubmitBtn onClick={(e) => submit(e)}>{loading ? "Generating Quiz" : "Submit"}</SubmitBtn>
					</InputContainer>
				)}
		</Container>
	)
}

export default Quiz
