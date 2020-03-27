# Project Overview

## Project Links

- [add your github repo link]()
- [add your deployment link]()

## Project Description

Use this section to describe your final project and perhaps any links to relevant sites that help convey the concept and\or functionality.

I am going to build a stock research and tracking websites that allows users to:
- search for stocks (MVP)
- Browse Stocks by Category (MVP)
- View Stock Details
	- Description of company
	- Detailed stock information
	- List of similar companies
- Select and Manage Favorites (Post MVP)

## API

Use this section to include info about the API you have chosen and a code snippet of the data that it returns and is required for your project. 

```
{
	"symbol": "IBM",
	"financials": [
		{
		    "reportDate": "2020-01-10",
		    "fiscalDate": "2020-01-05",
		    "currency": "USD",
		    "grossProfit": 37078177179,
		    "costOfRevenue": 43769038311,
		    "operatingRevenue": 79575300532,
		    "totalRevenue": 79018454874,
		    "operatingIncome": 10848960355,
		    "netIncome": 9878684204,
		    "researchAndDevelopment": 5716580583,
		    "operatingExpense": 66858487188,
		    "currentAssets": 37981564691,
		    "totalAssets": 155882125830,
		    "totalLiabilities": 134934724287,
		    "currentCash": 8548899979,
		    "currentDebt": 10665233179,
		    "shortTermDebt": 10400558577,
		    "longTermDebt": 58574902843,
		    "totalCash": 9054594532,
		    "totalDebt": 70743473780,
		    "shareholderEquity": 21008596090,
		    "cashChange": -3407001632,
		    "cashFlow": 15392226410
		}
	]
}
```

## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe. Also, define the the React components and the architectural design of your app.

- [Link to wireframe - Home](https://res.cloudinary.com/doaftkgbv/image/upload/v1585313173/Mock-HomePage_wqoggq.png)
- [Link to wireframe - Dashboard](https://res.cloudinary.com/doaftkgbv/image/upload/v1585313175/Mock-Dashboard_njfxko.png)
- [Link to wireframe - Details](https://res.cloudinary.com/doaftkgbv/image/upload/v1585313172/Mock-Details_a5lurq.png)

- [Link to your react architecture](https://res.cloudinary.com/doaftkgbv/image/upload/v1585313170/ReactArchDiagram_znf5nb.png)


### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP EXAMPLE
- Find and use external api 
- Render data on page 
- Allow user to interact with the pages
	- Home
	- Dashboard
	- Details

#### PostMVP EXAMPLE

- Add localStorage or firebase for storage
- Add ability to create and manage favorites list

## Components
##### Writing out your components and its descriptions isn't a required part of the proposal but can be helpful.

Based on the initial logic defined in the previous sections try and breakdown the logic further into stateless/stateful components. 

| Component | Description | 
| --- | :---: |  
| App | This will make the initial data pull and include React Router| 
| Header | This will render the header include the nav | 
| Footer | This will render the footer with contact info | 
| Main	 | This will handle routing clicks to appropriate components |
| Home	 | This will render the home page and search capabilities |
| Research | This will render all stocks for each category. Sorted by ...? |
| Details | This will render details about the selected company |


Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Also, put a gif at the top of your Readme before you pitch, and you'll get a panda prize.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project such as Axios, ReactStrap, D3, etc. 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description.  Code snippet should not be greater than 10 lines of code. 

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```
