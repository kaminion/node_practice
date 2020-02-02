
function onChg(id)
{
	axios.get("/board/"+id).then(function(res){
		document.querySelector("#title").value = res.data.title;
		document.querySelector("#writer").value = res.data.writer;
		document.querySelector("#comment").value = res.data.comment;
	}).catch(function(err){
		console.err(err);
	});
}

/** 
 * async function onChg(id)
{
	var res = await axios.get("/board/"+id)
}
**/