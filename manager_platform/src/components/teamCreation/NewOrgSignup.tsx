import React, { ChangeEvent, useState } from 'react';

const NewOrgSignup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOrgSubmit = (vals : any) => (e : Event) => {
    e.preventDefault();

    console.log(vals, e);
  }

  return (
    <div>
      <h3>First, let's get some basics about your Org</h3>
      <br />
      {!isSubmitted ? <NewOrgDetails onSubmit={handleOrgSubmit} /> : null }
    </div>
  );
};

type FormValues = {
  orgName: string;
  ownerName: string;
}

const NewOrgDetails = (props : any) => {
  const { onSubmit } = props;
  const initialState : FormValues = { orgName: '', ownerName: '' };

  const [formState, setFormState] = useState<FormValues>(initialState);

  const setValue = (e : any) => {
    setFormState({ ...formState, [e.target?.name]: e.target.value });
  }

  return (
    <form onSubmit={onSubmit(formState)}>
      <div>
        <label className='inputs' htmlFor='orgName'>Organization Name</label> 
        <br />
        <input id='orgName' type='text' name='orgName' value={formState.orgName || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <label className='inputs' htmlFor='ownerName'>Owner's Name (this will appear to users)</label>
        <br />
        <input id='ownerName' name='ownerName' type='text' value={formState.ownerName || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <button type='submit'>Save and Continue</button>
      </div>
    </form>
  );
}

export { NewOrgSignup };