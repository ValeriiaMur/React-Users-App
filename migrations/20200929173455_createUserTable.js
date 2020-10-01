
exports.up = async function(knex) {
  await knex.schema.createTable("User", (tbl)=>{
        tbl.increments();
        tbl.string("Username")
            .notNullable
        tbl.string("Password", 128)
            .notNullable
        tbl.string("Department")
            .notNullable
  })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists("User")
};
