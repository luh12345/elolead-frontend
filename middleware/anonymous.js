export default function({ store, redirect }) {
  let loggedUser = JSON.parse(sessionStorage.getItem("logged_user"));
  if (loggedUser || store.state.auth.loggedUser) return redirect("/leads");
}
