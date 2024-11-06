export const useIsPermitted = (role) => {
  if (role == "admin" || role == "instructor") {
    return true;
  } else {
    return false;
  }
};
