export default function GetGameModes() {
return(
      [
        {
          estimated_time_min: 60,
          game: {
            description: "A Cube Game",
            editor: {id: 1, name: 'Mojang'},
            id: 1,
            image_url: "https://m.media-amazon.com/images/I/61KrzqrDd8L._AC_SY741_.jpg",
            name: "Minecraft",
            publisher: {id: 1, name: 'Microsoft'},
            release_date: "2010-12-31T23:00:00.000Z"
          },
          id: 1,
          maximum_players: 20,
          minimum_players: 1,
          name: "Classic Survival"
        }
      ]
    );
}