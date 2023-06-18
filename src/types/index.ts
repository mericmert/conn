export interface IUser {
    _id : string;
    email : string;
    full_name : string;
}

export const toasterProperties : any =  {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }