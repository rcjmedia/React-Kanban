exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { first_name: "Liz", 
          last_name: "Leos", 
          email: "liz@leos.com" 
        },
        { first_name: "Romeo", 
          last_name: "Corpuz", 
          email: "romeo@corpuz.com" 
        },
        { first_name: "Dharalyn", 
          last_name: "Lim", 
          email: "dharalyn@lim.com" 
        },
        { first_name: "James", 
          last_name: "Fortaleza", 
          email: "james@fortaleza.com" 
        },
        { first_name: "Sheryl", 
          last_name: "Park", 
          email: "sheryl@park.com" 
        },
        { first_name: "Ryan", 
          last_name: "Pilot", 
          email: "ryan@pilot.com" 
        },
        { first_name: "Tricia", 
          last_name: "Pow", 
          email: "tricia@pow.com"
        },
        { first_name: "Bobby", 
          last_name: "Leos", 
          email: "bobby@leos.com" 
        }
      ]);
    });
};