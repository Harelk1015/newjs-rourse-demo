import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head'

const NewMeetupPage = () => {
  const router = useRouter()

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup' , {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type' : 'Application/json'
      }
    })

    const data = await response.json()

    console.log(data)

    router.push('/')
  };

  return <>
      <Head>
        <title>add a new meetup</title>
        <meta
          name="description"
          content="add your own meetups and create amazing opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  
};
export default NewMeetupPage;
