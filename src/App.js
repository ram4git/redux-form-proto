import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, reduxForm } from 'redux-form';
import './App.css';




class App extends Component {
  render() {
    return (
      <div className="App">
      <ColorSelectorForm />
      </div>
    );
  }
}


let ColorSelectorForm = (props) => {
  const {
    skillValue, newSkillValue, newSkillColor, handleSubmit, pristine, reset, submitting
  } = props;

  return (
    <form onSubmit={handleSubmit}>
    <div className="App">
      <div className="row">
        <label>Skill</label>
        <div>
          {skillValue != -1 ? 
            <div>
              <Field name="skill" component="select">
                <option></option>
                <option value="#ff0000">Jump</option>
                <option value="#00ff00">Kick</option>
                <option value="#0000ff">Fall</option>
                <option value="-1">Pick a New Skill?</option>
              </Field>
            </div>
          : 
          <div className="row">
            <Field name="skill" component="select">
              <option></option>
              <option value="#ff0000">Jump</option>
              <option value="#00ff00">Kick</option>
              <option value="#0000ff">Fall</option>
              <option value="-1">Pick a New Skill?</option>
            </Field>
            <div className="row">
              <Field
                className="TextField__NewSkill new-skill-field"
                label=""
                name="newSkill"
                component="input"
                required={true}
              />
              {newSkillColor && <div style={{
                height: 40,
                width: 40,
                marginHorizontal: 10,
                backgroundColor: newSkillColor
              }}/>}

              <GithubPicker
                color={'#FFFFFF'}
                width={250}
                triangle='hide'
                onChangeComplete={ param => props.changeFieldValue('newSkillColor', param.hex)}
              />
            </div>
          </div>
        }
        </div>
        {skillValue && !newSkillColor && <div style={{
        height: 40,
        width: 40,
        marginHorizontal: 10,
        backgroundColor: skillValue
      }}/>}
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
      { (newSkillColor || newSkillValue) &&  (<div>
        <h1>New Skill Properties</h1>
        <h3>{`NEW SKILL = ${newSkillValue || ''}`}</h3>
        <h3>{`NEW COLOR = ${newSkillColor|| ''}`}</h3>
      </div>)}
    </div>

    </form>
  )

}

// The order of the decoration does not matter.

// Decorate with redux-form
ColorSelectorForm = reduxForm({
  form: 'selectingFormValues'  // a unique identifier for this form
})(ColorSelectorForm)

// Decorate with connect to read form values
const selector = formValueSelector('selectingFormValues') // <-- same as form name
ColorSelectorForm = connect(
  state => {
    const skillValue = selector(state, 'skill')
    const newSkillValue = selector(state, 'newSkill')
    const newSkillColor = selector(state, 'newSkillColor')

    return {
      skillValue,
      newSkillValue,
      newSkillColor
    }
  },
  dispatch => {
    return {
      changeFieldValue: (field, value) => dispatch(change('selectingFormValues', field, value))
    }
  }

)(ColorSelectorForm)


export default App;
