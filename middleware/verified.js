export default function ({ store, redirect }) {
  if (store.state.auth.user.verified === 1) {
    return redirect('/profile');
  } else {
    return redirect('/not-verified');
  }
}
