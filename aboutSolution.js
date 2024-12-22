```javascript
// pages/about.js
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session
    },
  };
}

export default function About({ session }) {
  // Use getSession from next-auth/react for client-side session access
  const [clientSession, clientSessionLoading] = useSession();

  if (clientSessionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>About Page</h1>
      {clientSession ? (
        <p>You are logged in as {clientSession.user.email}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
```