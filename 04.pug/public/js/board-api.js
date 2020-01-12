
$("#btSave").click(function(){
	// 네임은 그냥 .으로 접근가능
	var id = document.form1.id.value;
	var type = "POST";
	var url = "/api/post"
	// AJAX에서는 PUT DELETE 사용가능
	// id가 빈값이 아니면 수정
	if(id != "") {
		url = "/api/put";
		type = "PUT";
	}

	$.ajax({
		url: url,
		type: type,
		dataType: "json",
		data: {
			id: id,
			title: document.form1.title.value,
			content: document.form1.content.value,
			writer: document.form1.writer.value
		},
		success: function (res){
			console.log("성공");
			document.form1.reset();
			getData();
		},
		error: function(xhr){
			
			console.log("실패");
		}
	});

});

function getData(id){
	let url = "";
	if(id) url = "/api/get/" + id;
	else url = "/api/get";

	$.ajax({
		url: url,
		method: "GET",
		dataType: "json"
	}).done(function(res){
		if(id) selectList(res, id);
		else selectList(res);
		

	}).fail((xhr)=>{
		console.log(xhr);
	});

}
getData();
	

function selectList(json, id)
{
	console.log(id);
	if(id)
	{
		var f = document.form1;
		f.id.value = json.data[0].id;
		f.title.value = json.data[0].title;
		f.content.value = json.data[0].content;
		f.writer.value = json.data[0].writer;
		
	}
	document.querySelector("#title").innerText = json.title;
	var tbodyEl = document.querySelector("tbody");
	var html = '';

	for(var i in json.data)
	{
		html += "<tr>";
		html += "<td>" + json.data[i].id + "</td>";
		html += "<td onclick='getData("+ json.data[i].id +")'>" + json.data[i].title + "</td>";
		html += "<td>" + json.data[i].writer + "</td>";
		html += "<td>" + json.data[i].wdate + "</td>";
		html += "<td>" + json.data[i].rnum + "</td>";
		html += "<td><button class='btn btn-sm btn-danger' data-id="+ json.data[i].id + " onclick='delList("+ json.data[i].id +")' >" + "삭제" + "</button></td>";
		html += "</tr>";
	}

	tbodyEl.innerHTML = html;

	console.log(json);
}

function delList(id)
{

	$.ajax({
		url: '/api/delete',
		method: "DELETE",
		dataType: "json",
		data: {id : id}

	}).done(
		function(res)
		{
			console.log("성공");
			console.log(res);
			getData();
		}
	).fail(function(xhr){
		console.log("실패");

	})
}