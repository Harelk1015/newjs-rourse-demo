import MeetUpList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React MeetUps</title>
        <meta
          name="description"
          content="brose a huge list of highly active react meetups!"
        />
      </Head>
      <MeetUpList meetups={props.meetups} />;
    </>
  );
};

export async function getStaticProps() {
  // fetch data here and const it
  const client = await MongoClient.connect(
    'mongodb+srv://harelk1015:H16734901015k@cluster0.1szjm.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
