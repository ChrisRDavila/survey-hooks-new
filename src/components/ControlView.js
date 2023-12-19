import React, { useState } from 'react'
import SurveyList from "./SurveyList";
import NewSurveyForm from "./NewSurveyForm";
import SurveyDetail from "./SurveyDetails"
import EditSurveyForm from "./EditSurveyForm";
import ResponseForm from "./ResponseForm";
// import Dashboard from "./Dashboard";
// import db from '../firebase';
// import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function ControlView() {

  const [ formVisibleOnPage, setFormVisibleOnPage ] = useState(false);
  const [ mainSurveyList, setMainSurveyList ] = useState([]); 
  const [ selectedSurvey, setSelectedSurvey ] = useState(null);
  const [ editing, setEditing ] = useState(false);
  const [ respond, setRespond] = useState(false); 
  // const [ dashboardDisplay, setDashboardDisplay ] = useState(false);
  const [ selectedResponse, setSelectedResponse ] = useState(null);
  const [ mainResponseList, setMainResponseList ] = useState([]);
  // const [ error, setError ] = useState(null);

  // useEffect(() => { 
  //   const unSubscribe = onSnapshot(
  //     collection(db, "tickets"), 
  //     (collectionSnapshot) => {
  //      const surveys = [];
  //      collectionSnapshot.forEach((doc) => {
  //       surveys.push({
  //         title: doc.data().title,
  //         question1: doc.data().question1,
  //         question2: doc.data().question2,
  //         question3: doc.data().question3,
  //         id: doc.id
  //       });
  //      });
  //      setMainSurveyList(surveys);
  //     }, 
  //     (error) => {
  //       setError(error.message);
  //     }
  //   );

  //   return () => unSubscribe();
  // }, []);

  const handleClick = () => {
    if (selectedSurvey != null) {
      setFormVisibleOnPage(false);
      setSelectedSurvey(null);
      setEditing(false);
      setRespond(false);
      setSelectedResponse(null);
    } else {
        setFormVisibleOnPage(!formVisibleOnPage);
      }
    }

    // const handleDashBoardClick = () => {  
    //   setDashboardDisplay(true);
    // this will show us all our surveys and responses
    // }
  

  const handleDeletingSurvey = (id) => {
    const newMainSurveyList = mainSurveyList.filter((survey) => survey.id !== id);
    setMainSurveyList(newMainSurveyList);
    setSelectedSurvey(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingSurveyInList = (surveyToEdit) => {
    const editedMainSurveyList = mainSurveyList
    .filter((survey) => survey.id !== selectedSurvey.id)
    .concat(surveyToEdit);
    setMainSurveyList(editedMainSurveyList);
    setEditing(false);
    setSelectedSurvey(null);
  }

  const handleRespondClick = () => {
    setRespond(true);
  }

  const handleSubmittingResponse = (responseToSubmit) => {
    const newMainResponseList = mainResponseList
    .filter((response) => response.id !== selectedResponse.id)
    .concat(responseToSubmit);
    setMainResponseList(newMainResponseList);
    setRespond(false);
    setSelectedResponse(null);
  }

  // const handleRespondingToSurveyInList = (surveyToRespond) => {
  //   const repondedMainSurveyList = mainSurveyList
  //   .filter((survey) => survey.id !== selectedSurvey.id)
  //   .concat(surveyToRespond);
  //   setMainSurveyList(repondedMainSurveyList);
  //   setEditing(false);
  //   setSelectedSurvey(null);
  // }

  const handleAddingNewSurveyToList = (newSurvey) => {
    const newMainSurveyList = mainSurveyList.concat(newSurvey);
    setMainSurveyList(newMainSurveyList);
    setFormVisibleOnPage(false)
  }

  const handleChangingSelectedSurvey = (id) => {
    const selection = mainSurveyList.filter((survey) => survey.id === id)[0];
    setSelectedSurvey(selection);
  }

  // const handleResponseList = (id) => {
  //   const responseList = mainSurveyList.filter((survey) => survey.id === id)[0];
  //   setResponseList(responseList);
  // }

  let currentVisibleState = null;
  let buttonText = null;
  // if (error) {
  //   currentVisibleState = <p>There was an error: {error}</p>
  // } else 
  if (editing) {
    currentVisibleState = <EditSurveyForm survey = {selectedSurvey} onEditSurvey = {handleEditingSurveyInList} />
    buttonText = "Return to Survey List";
  }
  else if (selectedSurvey != null) {
    currentVisibleState = <SurveyDetail survey = {selectedSurvey} onClickingDelete = {handleDeletingSurvey} onClickingEdit = {handleEditClick} onClickingRespond = {handleRespondClick}/>
    buttonText = "Return to Survey List";
  }
  else if (formVisibleOnPage) {
    currentVisibleState = <NewSurveyForm onNewSurveyCreation={handleAddingNewSurveyToList} />
    buttonText = "Return to Survey List";
  } 
  else if (respond) {
    currentVisibleState = <ResponseForm response = {selectedResponse} onSubmitResponse = { handleSubmittingResponse }/>
    buttonText = "Return to Survey List";
  }
  // else if (dashboardDisplay) {
  //   currentVisibleState = //<Dashboard />
  //   // surveyList={mainSurveyList}
  //   //onSurveySelection={handleChangingSelectedSurvey}
  //   buttonText = "Return to Survey List";
  // }
  else {
    currentVisibleState = <SurveyList surveyList={mainSurveyList} onSurveySelection={handleChangingSelectedSurvey} />
    buttonText = "Add Survey";
  }

    return (
        <React.Fragment>
          { currentVisibleState}
          <button onClick={handleClick}>{buttonText}</button>
        </React.Fragment>
    );
    
}

export default ControlView;