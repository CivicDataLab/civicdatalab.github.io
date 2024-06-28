import React from 'react';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
  width: 30%;
  padding: 1rem; 
  margin: 0 auto;
  border-radius: 0.5rem; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 720px) {
    width: 80%;
  }
`;

const Input = styled.input`
  padding: 0.5rem; 
  border: 1px solid #ccc; 
  border-radius: 0.25rem;
  font-size: 1rem; 
`;

const Label = styled.label`
  font-size: 1rem; 
  color: #333;
  margin-top: 12px;
`;

const Button = styled.button`
  padding: 0.7rem 1rem; 
  background-color: #000; 
  color: white; 
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  display: inline-block;
  white-space: nowrap; 
`;

const SubscribeForm = () => {
  const [loading, setLoading] = React.useState(false);

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const orgRef = React.useRef(null);
  const interestRef = React.useRef(null);

  const subscribeUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (emailRef.current?.value && nameRef.current?.value) {

      const result = await addToMailchimp(emailRef.current?.value, {
        FNAME: nameRef.current?.value,
        MMERGE6 : orgRef.current?.value,
        MMERGE7 : interestRef.current?.value
      })

      setLoading(false);
      emailRef.current.value = ''
      nameRef.current.value = ''
      orgRef.current.value = ''
      interestRef.current.value = ''
    }
  };

  return (
    <FormContainer onSubmit={subscribeUser}>
      <h2>Subscribe</h2>
      <Label htmlFor="name">Name:</Label>
      <Input ref={nameRef} id="name" type="text" required autoCapitalize="off" autoCorrect="off" disabled={loading} />

      <Label htmlFor="email">Email:</Label>
      <Input
        ref={emailRef}
        id="email"
        type="email"
        required
        autoCapitalize="off"
        autoCorrect="off"
        disabled={loading}
      />

      <Label htmlFor="organisation">Organisation:</Label>
      <Input ref={orgRef} id="organisation" type="text" />

      <Label htmlFor="interest">Areas of Interest:</Label>
      <Input ref={interestRef} id="interest" type="text" />

      <Button disabled={loading} type="submit">
        {loading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </FormContainer>
  );
};

export default SubscribeForm;