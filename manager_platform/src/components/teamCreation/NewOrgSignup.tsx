import React, { useState } from 'react';

const NewOrgSignup = () => {
  const handleOrgSubmit = (vals : any) => (e : Event) => {
    e.preventDefault();

    console.log(vals);
  }

  return (
    <div>
      <h3>First, let's get some basics about your Org</h3>
      <br />
      <NewOrgDetails onSubmit={handleOrgSubmit} />
    </div>
  );
};

type FormValues = {
  name: string;
  ownerName: string;
  tag: string;
}

const NewOrgDetails = (props : any) => {
  const { onSubmit } = props;
  const initialState : FormValues = { name: '', ownerName: '', tag: '' };

  const [formState, setFormState] = useState<FormValues>(initialState);

  const setValue = (e : any) => {
    setFormState({ ...formState, [e.target?.name]: e.target.value });
  }

  return (
    <form onSubmit={onSubmit(formState)}>
      <div>
        <label className='inputs' htmlFor='name'>Organization Name</label> 
        <br />
        <input id='name' type='text' name='name' value={formState.name || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <label className='inputs' htmlFor='ownerName'>Owner's Name (this will appear to users)</label>
        <br />
        <input id='ownerName' name='ownerName' type='text' value={formState.ownerName || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <label className='inputs' htmlFor='tag'>Org Tag</label>
        <br />
        <input id='tag' name='tag' type='text' value={formState.tag || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <button type='submit'>Save and Continue</button>
      </div>
    </form>
  );
}

export { NewOrgSignup };