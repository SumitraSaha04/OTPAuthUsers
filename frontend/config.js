const ENV = import.meta.env.VITE_ENV;
const DEV_URL = import.meta.env.VITE_DEV_URL;
const PROD_URL = import.meta.env.VITE_PROD_URL;

let BASE_URL;

switch(ENV){

    case "development":
        BASE_URL=DEV_URL;

        break;

    case  "production":
        BASE_URL=PROD_URL;

        break;

    default :
    BASE_URL=DEV_URL;
    break;

}

export default BASE_URL;