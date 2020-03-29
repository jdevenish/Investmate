import apiCred from "./apiDetails";



export const fetchBalanceSheet = async (selectedSymbl) => {
    // Fetch Company Balance Sheet
    const balanceSheetAPI = `${apiCred.url}/stock/${selectedSymbl}/balance-sheet?token=${apiCred.apiKey}`;
    const resBalanceSheet = await fetch(balanceSheetAPI);
    const jsonBalanceSheet = await resBalanceSheet.json();

    return jsonBalanceSheet.balancesheet;
};

export const fetchOverview = async (selectedSymbl) => {
    // Fetch Company Overview
    const overviewAPI = `${apiCred.url}/stock/${selectedSymbl}/company?token=${apiCred.apiKey}`;
    const resOverview = await fetch(overviewAPI);

    return await resOverview.json();
};

export const fetchPeerGroups = async (selectedSymbl) => {
    // Fetch Peer Companies
    const peerGroupAPI = `${apiCred.url}/stock/${selectedSymbl}/peers?token=${apiCred.apiKey}`;
    const resPeerGroups = await fetch(peerGroupAPI);

    return await resPeerGroups.json();
};