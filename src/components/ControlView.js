import React, { useState, useEffect } from 'react'
import SurveyList from "./SurveyList";
import NewSurveyForm from "./NewSurveyForm";
import SurveyDetail from "./SurveyDetails"
import EditSurveyForm from "./EditSurveyForm";
import ResponseForm from "./ResponseForm";
import Dashboard from "./Dashboard";
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function ControlView() {

  const [ formVisibleOnPage, setFormVisibleOnPage ] = useState(false);
  const [ mainSurveyList, setMainSurveyList ] = useState([]); 
  const [ selectedSurvey, setSelectedSurvey ] = useState(null);
  const [ editing, setEditing ] = useState(false);
  const [ respond, setRespond] = useState(false); 
  const [ dashboardDisplay, setDashboardDisplay ] = useState(false);
  const [ selectedResponse, setSelectedResponse ] = useState(null);
  const [ mainResponseList, setMainResponseList ] = useState([]);
  const [ error, setError ] = useState(null);

  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "surveys"), 
      (collectionSnapshot) => {
        const surveys = [];
        collectionSnapshot.forEach((doc) => {
        surveys.push({
          title: doc.data().title,
          question1: doc.data().question1,
          question2: doc.data().question2,
          question3: doc.data().question3,
          id: doc.id
        });
      });
      setMainSurveyList(surveys);
      }, 
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedSurvey != null) {
      setFormVisibleOnPage(false);
      setSelectedSurvey(null);
      setEditing(false);
      setRespond(false);
      setSelectedResponse(null);
      setDashboardDisplay(false);
    } else {
        setFormVisibleOnPage(!formVisibleOnPage);
      }
    }

  const handleDeletingSurvey = async (id) => {
    await deleteDoc(doc(db, "surveys", id));
    setSelectedSurvey(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingSurveyInList = async (surveyToEdit) => {
    const surveyRef = doc(db, "surveys", surveyToEdit.id);
    await updateDoc(surveyRef, surveyToEdit);
    setEditing(false);
    setSelectedSurvey(null);
  }

  const handleRespondClick = () => {
    setRespond(true);
  }

  const handleSubmittingResponse = (newResponse) => {
    const newMainResponseList = mainResponseList
    .concat(newResponse);
    setMainResponseList(newMainResponseList);
    setRespond(false);
    setDashboardDisplay(true);
  }

  const handleAddingNewSurveyToList = async (newSurveyData) => {
    await addDoc(collection(db, "surveys"), newSurveyData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedSurvey = (id) => {
    const selection = mainSurveyList.filter((survey) => survey.id === id)[0];
    setSelectedSurvey(selection);
  }

  const handleReturnClick = () => {
    setDashboardDisplay(false);
    currentVisibleState(true);
  }

  let currentVisibleState = null;

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the surveys.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {

  let currentVisibleState = null;
  let buttonText = null;
  if (error) {
    currentVisibleState = <p>There was an error: {error}</p>
  } 
  else if (editing) {
    currentVisibleState = <EditSurveyForm survey = {selectedSurvey} onEditSurvey = {handleEditingSurveyInList} />
    buttonText = "Return to Survey List";
  }
  else if (respond) {
    currentVisibleState = <ResponseForm 
    survey = { selectedSurvey } response = {selectedResponse} 
    onSubmitResponse = { handleSubmittingResponse }/>
    buttonText = "Go to Dashboard";
  }
  else if (dashboardDisplay) {
    currentVisibleState = <Dashboard surveyList={mainSurveyList} responseList={mainResponseList} onClickReturn={handleReturnClick} />
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
}

export default ControlView;