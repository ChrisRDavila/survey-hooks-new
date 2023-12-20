import React, { useState, useEffect } from 'react'
import SurveyList from "./SurveyList";
import NewSurveyForm from "./NewSurveyForm";
import SurveyDetail from "./SurveyDetails"
import ResponseDetail from "./ResponseDetails";
import EditSurveyForm from "./EditSurveyForm";
import EditResponseForm from './EditResponseForm';
import ResponseForm from "./ResponseForm";
import Dashboard from "./Dashboard";
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function ControlView() {

  const [ formVisibleOnPage, setFormVisibleOnPage ] = useState(false);
  const [ mainSurveyList, setMainSurveyList ] = useState([]); 
  const [ selectedSurvey, setSelectedSurvey ] = useState(null);
  const [ editing, setEditing ] = useState(false);
  const [ editResponse, setEditResponse ] = useState(false);
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

  //returning response collection in seperate useEffect

  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "responses"), 
      (collectionSnapshot) => {
        const responses = [];
        collectionSnapshot.forEach((doc) => {
        responses.push({
          respondingTo: doc.data().respondingTo,
          response1: doc.data().response1,
          response2: doc.data().response2,
          response3: doc.data().response3,
          id: doc.id
        });
      });
      setMainResponseList(responses);
      }, 
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  //also returning response in collection is same useEffect

  // useEffect(() => { 
  //   const unSubscribe = onSnapshot(
  //     collection(db, "surveys"),
  //     collection(db, "responses"), 
  //     (collectionSnapshot) => {
  //       const surveys = [];
  //       const responses = [];
  //       collectionSnapshot.forEach((doc) => {
  //       surveys.push({
  //         title: doc.data().title,
  //         question1: doc.data().question1,
  //         question2: doc.data().question2,
  //         question3: doc.data().question3,
  //         id: doc.id
  //       }) &&
  //       responses.push({
  //         respondingTo: doc.data().respondingTo,
  //         response1: doc.data().response1,
  //         response2: doc.data().response2,
  //         response3: doc.data().response3,
  //         id: doc.id
  //       });
  //     });
  //     setMainSurveyList(surveys);
  //     setMainResponseList(responses);
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
      setDashboardDisplay(false);
    } else {
        setFormVisibleOnPage(!formVisibleOnPage);
      }
    }

  const dashboardDisplayClick = () => {
    // if (selectedSurvey != null) {
      setFormVisibleOnPage(false);
    //   setSelectedSurvey(null);
    //   setEditing(false);
    //   setRespond(false);f
    //   setSelectedResponse(null);
      setDashboardDisplay(true);
    // } else {
    //     setFormVisibleOnPage(!formVisibleOnPage);
    //   }
  }

  const handleDeletingSurvey = async (id) => {
    await deleteDoc(doc(db, "surveys", id));
    setSelectedSurvey(null);
  }

  const handleDeletingResponse = async (id) => {
    await deleteDoc(doc(db, "responses", id));
    setSelectedResponse(null);
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

  const handleEditResponse = () => {
    setEditResponse(true);
  }

  // const handleSubmittingResponse = (newResponse) => {
  //   const newMainResponseList = mainResponseList
  //   .concat(newResponse);
  //   setMainResponseList(newMainResponseList);
  //   setRespond(false);
  //   setDashboardDisplay(true);
  // }

  const handleSubmittingResponse = async (newResponse) => {
    await addDoc(collection(db, "responses"), newResponse);
    setRespond(false);
    setDashboardDisplay(true);
  }

  const handleAddingNewSurveyToList = async (newSurveyData) => {
    await addDoc(collection(db, "surveys"), newSurveyData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedSurvey = (id) => {
    const surveySelection = mainSurveyList.filter((survey) => survey.id === id)[0];
    setSelectedSurvey(surveySelection);
  }

  const handleSelectingResponse = (id) => {
    const responseSelection = mainResponseList.filter((response) => response.id === id)[0];
    setSelectedResponse(responseSelection);
  }

  const handleBackToSurveyDetailClick = () => {
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
  } else if (editResponse) {
    currentVisibleState = <EditResponseForm 
    response = { selectedResponse } 
    onSubmitResponse = { handleSubmittingResponse }/>
    buttonText = "return to Survey List";
  }
  else if (respond) {
    currentVisibleState = <ResponseForm 
    survey = { selectedSurvey } response = {selectedResponse} 
    onSubmitResponse = { handleSubmittingResponse }/>
    buttonText = "Go to Dashboard";
  }
  else if (dashboardDisplay) {
    currentVisibleState = <Dashboard surveyList={mainSurveyList} responseList={mainResponseList}  onBackToSurveyDetail={handleBackToSurveyDetailClick} onSelectingResponse={handleSelectingResponse}/>
    buttonText = "Return to Survey List";
  }
  else if (selectedSurvey != null) {
    currentVisibleState = <SurveyDetail survey = {selectedSurvey} onClickingDelete = {handleDeletingSurvey} onClickingEdit = {handleEditClick} onClickingRespond = {handleRespondClick}/>
    buttonText = "Return to Survey List";
  }
  else if (selectedResponse != null) {
    currentVisibleState = <ResponseDetail response = {selectedResponse} onDeleteResponse= {handleDeletingResponse} onEditResponseClick = {handleEditResponse}/>
    buttonText = "Return to Dashboard";
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
          <button onClick={dashboardDisplayClick}>To DashBoard</button>
        </React.Fragment>
    );
  } 
}

export default ControlView;