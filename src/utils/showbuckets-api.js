const BASE_URL = 'http://localhost:8080';

export {getBucketsData};

function getBucketsData(params) {
  const url = `${BASE_URL}/${params}`;
	return	fetch(url).then(response => response.json()).then(json => json.items);
}
