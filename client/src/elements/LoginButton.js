import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Button = styled.button`
	border-radius: 8px;
	padding: 0.75rem 2rem;
	font-weight: 500;
	transition: all 0.3s ease-in-out;
	margin: 4rem 0 0;
	user-select: none;
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

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const login = () => {
	loginWithRedirect();
  }

  return <PrimaryButton onClick={login}>Log In</PrimaryButton>;
};

export default LoginButton;