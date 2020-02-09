const axios = require('axios');


(async function(){ while(true) {
	await axios.get("http://192.168.0.116:3001").then((response)=>{
	
}// END OF THEN
).catch((err)=>{
	console.log(err);
}// END OF CATCH
);
}// END OF FUNCTION 
})();
