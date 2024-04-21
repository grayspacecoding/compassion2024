export const build=()=>
{
    fetch("data.json")
    .then((response)=>response.json())
    .then((data)=>
    {
        console.log(data);
        let defaultColor = '#00A';
        data.forEach((child)=>
        {
            document.querySelector(`[data-childlist]`).insertAdjacentHTML('beforeend', childBtn(child));
            let path = document.getElementById(child.flagtag.toUpperCase());
            if( path ){ path.style.fill = defaultColor; }
            else{ document.querySelectorAll(`.${child.country}`).forEach((segment)=>{ segment.style.fill = defaultColor; }); }
        })
    })
}

export const childlistHeight=()=>
{
    let list = document.querySelector(`[data-childlist]`);
    list.style.maxHeight = `${list.parentNode.offsetHeight - 1}px`;
}

const childBtn=(e)=>`
<a target="_blank" href="${e.sponsorLink}" class="btn btn-light d-flex gap-2 border p-1 text-start" data-sponsor>
    <img style="height: 14vh" src="${e.imgUrl}">
    <div>
        <div class="h4">${e.name} <i class="small bi bi-gender-${e.gender} text-${e.gender =='male'? 'primary': 'danger'}"></i></div>
        <div class="lead"><span class="fi fi-${e.flagtag}"></span> ${e.country}</div>
        <div class="pt-1">${e.birthday}</div>
    </div>
</a>`;