export default function({ store, redirect }) {
  let loggedUser = JSON.parse(sessionStorage.getItem("logged_user"));
  if (!loggedUser) return redirect("/login");

  if (!store.state.auth.loggedUser)
    store.commit("auth/setLoggedUser", loggedUser);
}
