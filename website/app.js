/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+1 +'/'+ d.getDate() +'/'+ d.getFullYear();
const baseURL="https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey="&appid=1056d048479e5e2e0a20b5cfc3d4872b&units=metric";
document.getElementById('generate').addEventListener('click',performAction);
function performAction(act){
	const cityName=document.getElementById('city').value;
	const feelings=document.getElementById('feelings').value;
	//check if user enters a value in the zip text input or not
	if (!cityName) {
		alert('Please,enter a cityName');
		} 
		//check if user enters a text in the feelings area input or not
	if (!feelings) {
		alert('Please,tell us how do you feel?!');
		} 

	  getWeather(baseURL,cityName,apiKey).then(function(data){
		console.log(data);
		postData('/add',{
		date:newDate,
		temp:data.main.temp,
		content:feelings});
		updateUI();
	})
};

const getWeather=async (baseURL,city,Key)=>{
	const res=await fetch(baseURL+city+Key)
	try{
		const data = await res.json();
		return data;
		
	}
	catch(error){
		console.log('error',error);
	}
}	
 const postData = async ( url = "" , data={})=>{
	 console.log(data);
	 const response = await fetch(url,{
		 method:'POST',
		 credentials:'same-origin',
	 headers:{'Content-Type':'application/json'},
	 body:	JSON.stringify(data)
		 
	 });
	 
 
 try{
	 const newData= await response.json();
	 console.log(newData);
 }
 catch(error){
	 console.log('error',error);
 }
}
const updateUI = async()=>{
	const request=await fetch('/all');
	try{
		const allData=await request.json();
		document.getElementById('date').innerHTML=`Today is : ${allData[0].date}`;
		document.getElementById('temp').innerHTML=`Temperature is: ${allData[0].temp} Celsius`;
		document.getElementById('content').innerHTML=` AND I FEEL : ${allData[0].content}`;
	}
	catch(error){
		console.log('error',error);


	}

}