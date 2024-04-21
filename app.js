export const build=()=>
{
    fetch("data.json")
    .then((response)=>response.json())
    .then((data)=>
    {
        let index = 0;
        data.forEach((child)=>
        {
            if(child.active ==1)
            {
                document.querySelector(`[data-childlist]`).insertAdjacentHTML('beforeend', childBtn(index, child));
            }
            index++;
        })
    })
}

export const previewChild=(i)=>
{
    fetch("data.json")
    .then((response)=>response.json())
    .then((data)=>
    {
        let e = data[i];
        document.querySelector(`[data-preview]`).innerHTML = childPreview(e);
        document.querySelector(`[data-movetocart]`).innerHTML = `Sponsor ${e.name}`;
        document.querySelector(`[data-movetocart]`).setAttribute('href', e.sponsorLink);
        let instance = new bootstrap.Modal(document.getElementById('sponsorModal'));
        instance.show();
    })
}

export const childlistHeight=()=>
{
    let list = document.querySelector(`[data-childlist]`);
    list.style.maxHeight = `${list.parentNode.offsetHeight - 1}px`;
}

const childPreview=(e)=>`
<img
src="${e.imgUrl}"
class="float-start me-2 mb-2 border border-secondary"
style="min-height: 1in; min-width: 1in;"
alt="Sponsor ${e.name}"
>
<h1 class="h2">${e.name}</h1>
<p class="lead"><span class="fi fi-${e.flagtag}"></span> ${e.country}</p>
<p>My birthday is <b>${e.birthday}</b>.<br>I have gone <b>${e.daysNoSponsor}</b> days without a sponsor.</p>
<hr><p>${e.desc.length ==0? nodesc: e.desc}</p>
`;

const nodesc = `Thank you for considering a sponsorship today! A written introduction for this child will be made available shortly - but don't let this stop you from considering a sponsorthip! We encourage you to get in contact with <b>Pat Jones</b> or <b>John Phillip Ruiz</b> for additional information.`;

const childBtn=(i, e)=>`
<div class="col p-2">
    <button
    onclick="document.dispatchEvent(new CustomEvent('preview',{detail: {index: ${i}}}));"
    class="btn w-100 btn-light border border-secondary d-flex gap-2 border p-1 text-start"
    target="_blank"
    data-sponsor
    >
        <img style="height: 14vh" src="${e.imgUrl}">
        <div>
            <div class="h4">${e.name} <i class="small bi bi-gender-${e.gender} text-${e.gender =='male'? 'primary': 'danger'}"></i></div>
            <div class="lead"><span class="fi fi-${e.flagtag}"></span> ${e.country}</div>
            <div class="pt-1">${e.birthday}</div>
        </div>
    </button>
</div>`;