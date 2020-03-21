
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
    await knex('users').insert([
      {username:"nothing", password:"nada"},
      {username:"jim2", password:"bob"}
    ]);
  };
