/*
    Switch between production and sandbox api credentials

    sandbox = true  ==> uses sandbox api creds
    sandbox = false ==> uses production api creds
*/

const sandbox = true;


const apiCred = {
    url: "",
    apiKey: ""
};

if(sandbox){
    apiCred.url = "https://sandbox.iexapis.com/stable";
    apiCred.apiKey = "Tpk_d93c81541b234b3ea6078cf3db45dfc7";
} else {
    apiCred.url = "https://cloud.iexapis.com/stable";
    apiCred.apiKey = "pk_cd56e3f5acb247ea8f5b446212057641";
}

export default apiCred;