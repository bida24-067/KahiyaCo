// Example using Firebase SDK for Web
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from './firebaseConfig'; // Your Firebase app initialization

const auth = getAuth(app);
const provider = new GithubAuthProvider();

// You can add scopes if you need specific GitHub user data (e.g., user email)
// provider.addScope('user:email');

function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;

      console.log('Successfully signed in with GitHub!', user.displayName, user.email, token);
      // You can now redirect the user or update your UI.
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);

      console.error('GitHub sign-in error:', errorCode, errorMessage, email, credential);
    });
}

// Call this function when a user clicks a "Sign in with GitHub" button
// signInWithGitHub();
