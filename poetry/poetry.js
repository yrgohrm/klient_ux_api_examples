
async function randomShake() {
    const titlesResp = await fetch('https://poetrydb.org/author/Shakespeare/title.json')
    if (!titlesResp.ok) {
        return
    }

    const titles = await titlesResp.json()
    const randomTitle = titles[Math.floor(Math.random() * titles.length)]
    const title = randomTitle.title

    const worksResp = await fetch(`https://poetrydb.org/author,title/Shakespeare;${encodeURIComponent(title)}/title,lines.json`)
    if (!worksResp.ok) {
        return
    }

    const works = await worksResp.json()

    // it will always perform a search so make sure we find the exact match
    for (const work of works) {
        if (work.title === title) {
            const h1 = document.querySelector("h1")
            h1.innerText = title

            makeList(countWords(work.lines))
            return
        }
    }
}

function countWords(arr) {
    const wordCountMap = new Map()

    arr.forEach(string => {
        const words = string.split(/\s+/)
        words.forEach(word => {
            const lcWord = word.toLowerCase()
            const noSeparatorsWord = lcWord.replaceAll(/[,.;:?!]/g, '')
            const trimmedWord = noSeparatorsWord.trim()
            if (trimmedWord !== '') {
                if (wordCountMap.has(trimmedWord)) {
                    wordCountMap.set(trimmedWord, wordCountMap.get(trimmedWord) + 1)
                } else {
                    wordCountMap.set(trimmedWord, 1)
                }
            }
        })
    })

    return wordCountMap
}

function makeList(wordMap) {
    const ul = document.querySelector('#results')

    const sorted = Array.from(wordMap.entries()).sort(([k1, v1], [k2, v2]) => v2 - v1)
    for (const [key, value] of sorted) {
        const li = document.createElement('li')
        li.innerText = `${key}: ${value}`
        ul.append(li)
    }
}

randomShake()