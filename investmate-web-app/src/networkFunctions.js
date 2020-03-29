// Fetch Balance Sheet for User Provided Symbol
import apiCred from "./apiDetails";



const networkFunctions = {

    // fetchBalanceSheet : function (selectedSymbl, showDetailsObj, setShowDetailsFunc) {
    //     console.log("NF.selectedSybml: ", selectedSymbl, "  NF.showDetailsObj: ", showDetailsObj)
    //     const tempBalanceSheetUpdate = {...showDetailsObj}
    //     const searchAPI = `${apiCred.url}/stock/${selectedSymbl}/company?token=${apiCred.apiKey}`;
    //     const makeApiCall = async () => {
    //         const res = await fetch(searchAPI);
    //         const json = await res.json();
    //         tempBalanceSheetUpdate.symbl = "TEST TEST";
    //         tempBalanceSheetUpdate.balancesheet = json.balancesheet;
    //
    //         setShowDetailsFunc(tempBalanceSheetUpdate)
    //         console.log("Network FUnctions - useEffect: Search results: ",tempBalanceSheetUpdate)
    //         // console.log("APP - useEffect: Search results: ",json)
    //     };
    //     // console.log("FUNCTION - fetch single stock: ", selectedSymbl)
    //     makeApiCall()
    // },
    //
    // fetchOverviewInfo : function (selectedSymbl, showDetailsObj, setShowDetailsFunc) {
    //     const tempOverviewUpdate = {...showDetailsObj}
    //     const searchAPI = `${apiCred.url}/stock/${selectedSymbl}/company?token=${apiCred.apiKey}`;
    //     const makeApiCall = async () => {
    //         const res = await fetch(searchAPI);
    //         const json = await res.json();
    //         tempOverviewUpdate.overview = await res.json()
    //
    //         setShowDetailsFunc(tempOverviewUpdate)
    //         console.log("Network FUnctions - useEffect: Search results: ",json)
    //     };
    //     // console.log("FUNCTION - fetch single stock: ", selectedSymbl)
    //     makeApiCall()
    // }
};

export default networkFunctions;