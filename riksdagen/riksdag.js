

async function getData() {
    const ul = document.querySelector('#results')

    // justitieutskottet
    const juuResp = await fetch('https://data.riksdagen.se/personlista/?&org=JuU&utformat=json&sort=f%C3%B6dd_%C3%A5r&sortorder=asc')
    const juu = await juuResp.json()
    console.log(juu)
    for (const p of juu.personlista.person) {
        const li = document.createElement('li')
        li.innerText = `${p.tilltalsnamn} ${p.efternamn} (${p.parti})`
        ul.append(li)
    }
}

getData()
