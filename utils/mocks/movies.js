const moviesMock = [{
  "id": "53a970db-339c-4274-9821-6333953be390",
  "name": "Pop - Club Soda Can",
  "price": 3898608,
  "description": "Coluber constrictor",
  "category": "Avalon",
  "source": "3547864614399874",
  "tags": "Comedy"
}, {
  "id": "7305ab5d-275f-4f7b-b38a-aa2b70e885a3",
  "name": "Soup - Base Broth Beef",
  "price": 7293633,
  "description": "Tockus erythrorhyncus",
  "category": "Exige",
  "source": "3547623245075356",
  "tags": "Documentary"
}, {
  "id": "fb595b82-0147-485b-9a3f-c67f527c2a71",
  "name": "Puff Pastry - Sheets",
  "price": 5813228,
  "description": "Nannopterum harrisi",
  "category": "Alcyone SVX",
  "source": "3546477548529028",
  "tags": "Horror|Mystery|Thriller"
}, {
  "id": "937ab48c-0091-483b-95e1-d4512cac0669",
  "name": "Beets",
  "price": 4093015,
  "description": "Vanellus sp.",
  "category": "Mazda3",
  "source": "3550997454010526",
  "tags": "Action|Comedy|Crime|Thriller"
}, {
  "id": "3198a005-6e4a-4701-823e-59a470bdbfc8",
  "name": "Temperature Recording Station",
  "price": 8277148,
  "description": "Hyaena hyaena",
  "category": "Insight",
  "source": "30100014025821",
  "tags": "Horror"
}, {
  "id": "b1d16804-30d3-48d8-8fa7-7fa5f250d497",
  "name": "Magnotta Bel Paese Red",
  "price": 4584389,
  "description": "Gymnorhina tibicen",
  "category": "F-250 Super Duty",
  "source": "5108080016025506",
  "tags": "Film-Noir|Thriller"
}, {
  "id": "a8901ccb-4ee5-42a0-ad69-d08c75c94159",
  "name": "Olives - Green, Pitted",
  "price": 7866867,
  "description": "Porphyrio porphyrio",
  "category": "LHS",
  "source": "3547633685019202",
  "tags": "Documentary"
}, {
  "id": "8f12d909-f10e-4115-bb19-53e6b54a7e80",
  "name": "Huck White Towels",
  "price": 4055488,
  "description": "Plegadis ridgwayi",
  "category": "XC90",
  "source": "3564603780578764",
  "tags": "Children|Comedy|Musical"
}, {
  "id": "1c8ff77a-6d52-4e14-9118-6420a35a5d34",
  "name": "Chocolate - Sugar Free Semi Choc",
  "price": 6449422,
  "description": "Passer domesticus",
  "category": "Diamante",
  "source": "3549523084575110",
  "tags": "Documentary"
}, {
  "id": "7daa7267-8956-4241-b7dd-dbcb19ec03f1",
  "name": "Wine - Magnotta - Pinot Gris Sr",
  "price": 3155127,
  "description": "Ninox superciliaris",
  "category": "9-3",
  "source": "337941793689216",
  "tags": "Drama"
}];

function filteredMoviesMock(tag) {
  return moviesMock.filter(movie => movie.tags.includes(tag));
}

class MoviesServicesMock {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

module.exports = {
  moviesMock,
  filteredMoviesMock,
  MoviesServicesMock
};