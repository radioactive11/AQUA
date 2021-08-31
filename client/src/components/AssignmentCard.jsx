import React,{useState} from 'react'
import styled from "styled-components";
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ModalTeacher from './ModalTeacher.jsx';

const Card = styled.div`
	flex:1 1 0;
	font-size: 1rem;
	font-weight:bold;
	max-width: 40vw;
	width:90%;
    cursor:pointer;
	background: #2B2C3E;
	margin:  2rem;
	${(props) => {
        if(props.modal) {
            return `
                padding:1rem !important;
            `
        }
        else {
            return `
                padding:2rem !important;
            `;
        }
    }}
    padding: 2rem;
	border-radius: 10px;
	user-select:none;
	box-shadow:  2px 2px 23px rgb(27 27 42),
				-2px -2px 23px rgb(27 27 42);
	display: flex;
	flex-direction: column;
	@media (max-width: 1224px){
		max-width: 80vw;
	}
`

const Content = styled.div`
	color: lightgray;
`

const Description = styled.div`
	display:flex;
	align-items:center;
	border-radius: ${props => !props.noBorderRadius?`10px 10px 0 0`:`none`};
	overflow: hidden;
	${(props) => {
		if (props.theme === "primary") {
			return `
				color: #F4AA1F !important;
				background: #FFF3E8 !important;
			`;
		}
		else {
			return `
				color: #65D862;
				background: #EEFFED;
			`;
		}
	}}
	padding: 0 1rem;
`

const AssignedBy = styled.div`
	display:flex;
	align-items:center;
	border-radius: 0 0 10px 10px;
	color: #249BD4;
	background: #DEF7FF;
	padding: 0 1rem;
`

const AssignedByText = styled.p`
	margin: 1rem 0;
	font-weight: normal;
	padding:0 1rem;
	transition: all 0.2s ease;
`

const DescriptionText = styled.a`
	cursor: pointer;
	text-decoration: ${props=>!props.notUnderlined?`underline`:`none`};
	margin: 1rem 0;
	padding:0 1rem;
	transition: all 0.2s ease;
	color:inherit !important;
	&:hover{
		${(props) => {
		if (props.theme === "primary") {
			return `
				color: #DF9B1C !important;;
			`;
		}
		else {
			return `
				color: #51AF4F !important;
			`;
		}
	}}
	}
`

const AssignmentCard = ({assignments,students,modal,submissions}) => {
	const [showModal, setShowModal] = useState(false);
	const [showItem, setShowItem] = useState(false);
	const [assignmentsSubmitted,setAssignmentsSubmitted] = useState([]);

    const toggleModal = () => {
        setShowModal(false);
    }

    const onClickHandler = (item) => {
        //Ensuring that card in modal isnt clickable
		setAssignmentsSubmitted(item.assignmentsSubmitted);
        if(!modal){
            setShowModal(true);
			setShowItem(item);
        }
    }

	return (
		<>
			{assignments.map((item, index) => {
				let date  = new Date(item.deadline);
				// submissions ? date = new Date(item.dateSubmitted) : date = new Date(item.deadline);
				return (
					submissions ? (
						<Card modal={modal} key={index} onClick ={()=>onClickHandler(item)}>
					<Content>
						<Description theme={(index % 2 === 0) && `primary`}>
							<DescriptionIcon />
							<DescriptionText theme={(index % 2 === 0) && `primary`}>
								{`${item.assignment}`}
							</DescriptionText>
						</Description>
						
							<Description theme={(index % 2 !== 0) && `primary`} noBorderRadius>
								<DescriptionIcon/>
								<DescriptionText theme={(index % 2 !== 0) && `primary`} notUnderlined>
									Submitted on: {item.dateSubmitted.substring(0, 10)}
								</DescriptionText>
							</Description>

						
                            <AssignedBy>
                                <AssignmentIndIcon />
                                <AssignedByText>
                                    {item.givenBy.name}
                                </AssignedByText>
                            </AssignedBy>

					</Content>
				</Card>				
					) : (

				<Card modal={modal} key={index} onClick ={()=>onClickHandler(item)}>
					<Content>
						<Description theme={(index % 2 === 0) && `primary`}>
							<DescriptionIcon />
							<DescriptionText theme={(index % 2 === 0) && `primary`}>
								{`${item.title} ${item.description}`}
							</DescriptionText>
						</Description>
						
						
						{(date>Date.now())?(
							<Description theme={(index % 2 !== 0) && `primary`} noBorderRadius>
								<DescriptionIcon/>
								<DescriptionText theme={(index % 2 !== 0) && `primary`} notUnderlined>
									Deadline: {item.deadline.substring(0, 10)}
								</DescriptionText>
							</Description>
						):(<>
							
							</>
						)}

						{students ? (
                            <AssignedBy>
                                <AssignmentIndIcon />
                                <AssignedByText>
                                    {item.givenBy.name}
                                </AssignedByText>
                            </AssignedBy>

                        ) : ""}

					</Content>
				</Card>
					)
			)})}

            {showModal ? <ModalTeacher assignmentsSubmitted={assignmentsSubmitted} students={students} toggleModal={toggleModal} openModal={showModal} info={showItem} /> : null}
		</>
	)
}


export default AssignmentCard;