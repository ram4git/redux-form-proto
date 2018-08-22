import React from 'react';
import { GithubPicker } from 'react-color';
import { Field } from 'redux-form';


let SkillCreatorForm = (props) => {
  const {
    skillValue
  } = props;


    return (
      <div className="ColorInput">
        <Field
          className="TextField__NewSkill new-skill-field"
          label=""
          name="NewSkill"
          required={true}
        />
        <div
          style={{ background: props.color || '#000', width: 40, height: 40 }}
        />
        <GithubPicker
          color={'#FFFFFF'}
          width={250}
          triangle='hide'
          onChangeComplete={param => this.props.NewSkill.onChange(param.hex)}
        />
      </div>
    )

}

export default SkillCreatorForm;
