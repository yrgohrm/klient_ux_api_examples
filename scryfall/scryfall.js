async function getElves() {
    const searchQuery = encodeURIComponent('t:elf r:mythic')
    const order = 'eur'
    const dir = 'desc'

    const cardsResp = await fetch(`https://api.scryfall.com/cards/search?q=${searchQuery}&order=${order}&dir=${dir}`)
    const cards = await cardsResp.json()

    const ul = document.querySelector('#results')

    for (const card of cards.data) {
        const li = document.createElement('li')

        if (card.image_uris?.small) {
            const img = document.createElement('img')
            img.src = card.image_uris?.small
            img.alt = card.name
            li.append(img)
            ul.append(li)
        }
    }
}

getElves()