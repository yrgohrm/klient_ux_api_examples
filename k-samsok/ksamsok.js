// NB! This code is not very good by design
// it should not be too copy-paste friendly =)

async function searchForThing(evt) {
  const thingInput = document.getElementById("thing");
  let thing = encodeURIComponent(thingInput.value);

    // query for author objects
  let response = await fetch(
    `https://kulturarvsdata.se/ksamsok/api?method=search&version=1.1&hitsPerPage=10&query=text=${thing}%20AND%20thumbnailExists=j`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  let obj = await response.json();
  addAllObjects(obj.result.records)
}

function addAllObjects(records) {
  const results = document.getElementById("results")
  results.innerHTML = ''
  for (const record of records) {
    const res = {}
    for (const val of record.record['@graph']) {
      if (val.thumbnailSource) {
        res.thumbnailSource = val.thumbnailSource
      }
      else if (val.desc) {
        res.desc = val.desc
      }
    }

    addObject(results, res)
  }
}

function addObject(parent, { desc, thumbnailSource }) {
  const img = document.createElement('img')
  img.src = thumbnailSource
  img.alt = desc
  parent.append(img)
}

const searchAuthorButton = document.getElementById("searchThing");
searchAuthorButton.addEventListener("click", searchForThing);
