
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