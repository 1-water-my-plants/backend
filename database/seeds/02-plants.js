
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {nickname: 'Aloe Vera', species: 'Aloe', h2oFrequency: 4, image: 'https://www.houseplantsexpert.com/image-files/aloevera.jpg', user_id: 1 },
        {nickname: 'Peace Lily', species: 'Spathiphyllum Wallisii', h2oFrequency: 2, image: 'https://www.houseplantsexpert.com/image-files/peace-lily.jpg', user_id: 1 },
        {nickname: 'Jade Plant', species: 'Crassula Ovata', h2oFrequency: 1, image: 'https://www.houseplantsexpert.com/image-files/jade.jpg', user_id: 1 },
        {nickname: 'African Violet', species: 'Saintpaulia', h2oFrequency: 4, image: 'https://www.houseplantsexpert.com/image-files/african-violet.jpg', user_id: 2 },
        {nickname: 'Weeping Fig', species: 'Ficus Benjamina', h2oFrequency: 3, image: 'https://www.houseplantsexpert.com/image-files/weeping-fig.jpg', user_id: 2 },
        {nickname: 'Baby Rubber Plant', species: 'Peperomia', h2oFrequency: 2, image: 'https://www.houseplantsexpert.com/assets/images/baby_rubber_plant.jpg', user_id: 2 },
        {nickname: 'Corsage Orchid', species: 'Cattleya', h2oFrequency: 5, image: 'https://www.houseplantsexpert.com/assets/images/yellow_cattleya_orchid.jpg', user_id: 3 },
        {nickname: 'Moth Orchid', species: 'Phalaenopsis', h2oFrequency: 1, image: 'https://www.houseplantsexpert.com/image-files/moth_orchid_white.jpg', user_id: 3 },
        {nickname: 'Slipper Orchid', species: 'Paphiopedilum', h2oFrequency: 4, image: 'https://www.houseplantsexpert.com/assets/images/slipper_orchid.jpg', user_id: 3 },
      ]);
    });
};
