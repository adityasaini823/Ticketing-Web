import { buildClient } from '../api/build-client';

function LandingPage({ currentUser }) {
    return (
        <div className="p-8">
            {currentUser ? (
                <h1 className="text-2xl font-bold">Welcome, {currentUser.email}</h1>
            ) : (
                <h1 className="text-2xl font-bold text-gray-500">You are not logged in</h1>
            )}
        </div>
    );
}

LandingPage.getInitialProps = async (context) => {
    // 1. Build the network client safely
    const client = buildClient(context);

    try {
        // 2. Fetch the current user data
        const { data } = await client.get('/api/users/currentuser');
        return data; 
    } catch (err) {
        // 3. Catch Axios errors (like 401 Unauthorized) and return null
        console.log('User is unauthenticated or service is unreachable.');
        return { currentUser: null };
    }
};

export default LandingPage;