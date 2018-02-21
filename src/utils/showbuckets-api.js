const BASE_URL = 'http://localhost:8080';

export {getBucketsData};

function getBucketsData() {
  const url = `${BASE_URL}/todos`;
	return	fetch(url).then(response => response.json()).then(json => json.items);
}
