
let btList = document.querySelector("#btList");

if(btList != null && btList != undefined)
{
	document.querySelector("#btList").addEventListener("click", ()=>{
		location.href = "/pug";
	});
}

$("#btUpdate").click(()=>{

	location.href = "/pug/update/" + $(event.target).data("id");

});

$("#btDelete").click(()=>{
	if(confirm("정말로 삭제하시겠습니까?"))
	{
		location.href ="/pug/delete/" + $(event.target).data("id");
	}
})

function upData()
{
	// return으로 콜백하는 함수이므로 폼을 id로 선택
	let f = document.updateForm;
	// 선택한 후 .name으로 접근가능하다.
	if(f.title.value == "")
	{
		alert("제목을 작성해주세요.");
		f.title.focus();
		return false;
	}

	if(f.content.value == "")
	{
		alert("내용을 작성해주세요.")
		f.content.focus();
		return false;
	}

	return true;
}